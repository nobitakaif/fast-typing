import express from "express"
// import { client } from "@repo/db/client"
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express()



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
    model: "gemini-3-pro",
});


// app.post("/signup",async(req,res)=>{
//     const { email, username, password } = req.body

//     try{
//         const response = await client.user.create({
//             data:{
//                 username : username,
//                 email : email,
//                 password : password
//             }
//         })
//         res.status(200).json({
//             id : response.id,
//             msg : "user is successfully logged-in "
//         })
//     }catch(e){
        
//     }

// })


app.get("/repo",(req,res)=>{
    
})

app.get('/type', async(req,res)=>{
    // const data =await model.generateContent(`
    //         Your are model that generate a everytime new topic you user can type it for increase their typing speed 
    //     `)

    // const response = data.response.text
    res.json({
        typeData : "I am from Delhi"
    })
})

app.listen(8000,()=>{
    console.log("server is running on port 8000")
})