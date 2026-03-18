import axios from "axios";

const content = "i am from Delhi"
const player = new Map() // store and current user<ws> 

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
        
        async message(ws, msg){
            
            console.log("this msg came from the client -> ", msg)
            ws.send(content)

            player.set(ws, {
                ctr : 0,
                startTime : Date.now()
            })
        // console.log("player map -> ", player.get(ws).ctr)

        const repsone = await axios.get('http://localhost:8000/type')
        
        if(msg == "kaif"){
            player.set(ws,{
                ctr : 5
            })
            ws.send(`you've sent kaif ${player.get(ws).ctr.toString()}`)
            ws.send(`you have to type this ${JSON.stringify(repsone.data.typeData)}`)
        }
        // if(msg === content[ctr]){
        //         ws.send(JSON.stringify({
        //             currentState : true,
        //             msg : "you're going very well" 
        //         }))
        //         ctr++
        //     }else{
        //         if(ctr >= content.length){
        //             ws.send(JSON.stringify({
        //                 success : true,
        //                 msg : "you've passed the test"
        //             }))
        //         }
        //         else{
        //             ws.send(JSON.stringify({
        //                 currentState : false,
        //                 msg : "you've sent wrong key"
        //             }))
        //         }
        //     }
        // }
        }

    }
})
