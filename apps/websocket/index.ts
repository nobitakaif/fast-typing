
const content = "i am from Delhi"
let ctr = 0
Bun.serve({
    port : 8080,
    fetch(req,serve){
        
        if(serve.upgrade(req)){
            console.log("server is running on port 8080")
            return;
        }
        return new Response("Upgrade failed", {status: 500});
    },
    
    websocket:{
        
        message(ws, msg){
            console.log("this msg came from the client -> ", msg)
            ws.send(content)
            if(msg === content[ctr]){
                ws.send(`pls type ${content[ctr+1]}`)
                ctr++
            }else{
                if(ctr >= content.length){
                    ws.send("you've passed the testj")
                }
                else{
                    ws.send("you've sent wrong key")
                }
            }
        }
    }

},)