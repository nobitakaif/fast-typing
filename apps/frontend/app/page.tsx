"use client"
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const socket = useRef<WebSocket | null>(null);
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [content, setContent] = useState<string[]>([]);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [ isComplete, setIsComplete ] = useState(false)
  const [ currentComplete, setCurrentComplete ] = useState<boolean>(false)

  useEffect(() => {
    const connection = new WebSocket("ws://localhost:8080");
    socket.current = connection;

    connection.addEventListener("open", () => {
      toast.success("WebSocket connected");
    });

    connection.addEventListener("message", (event) => {
      console.log("Received:", event.data);
      const parsedData = JSON.parse(event.data)
      
      setServerMsg(parsedData.msg);
      if(parsedData.success){
        setIsComplete(true)
      }
    });

    connection.addEventListener("close", () => {
      toast.error("WebSocket disconnected");
    });

    return () => {
      socket.current?.close();
    };
  }, []);

  
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {

    const key = event.key;
    // allow only a-z, A-Z, 0-9
    const isAlphaNumeric = /^[a-zA-Z0-9]$/.test(key);
    const isSpace = key === " ";
    const isEnter = key === "Enter";

    if (!isAlphaNumeric && !isSpace && !isEnter ) return; // ignore all other keys

    setCurrentKey(key);
    setContent((prev) => [...prev, key]);

    
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.onmessage=((e)=>{
        const parsedData = JSON.parse(e.data)

        if(parsedData.currentState){
          setCurrentComplete(true)
        }
        else{
          setCurrentComplete(false)
        }
      })
      socket.current.send(key);
      console.log("Sent:", key);
    } else {
      toast.error("Socket is not connected");
    }
    if(isComplete){
      alert("you've all done")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full gap-4 flex-col">

      <p>The content from server: {serverMsg}</p>
      <p>You typed: {content.join("")}</p>
      <div className="flex">
        {content.map((c)=>(
          <span className={currentComplete ? "text-green-400" : "text-red-400"}>
              {c}
          </span>
        ))}
      </div>
      <p>Current key: {currentKey}</p>

      <Textarea className="w-72 h-44" onKeyDown={handleKeyDown} placeholder="Type something..." />
    </div>
  );
}
