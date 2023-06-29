import { NextResponse } from "next/server"
import { useAuth } from "../../../hooks/auth"

export async function POST(request){
    const Auth=await useAuth.fromServer()
    if(Auth){
        if(Auth.role=="admin"){
            const FormData=await request.json()
            const res=await fetch('https://siir-sitesi-backend.onrender.com/Admin/AllPost', {
                    headers: {'Content-Type': "application/json"},
                    method:"POST",
                    body: JSON.stringify(FormData),
                    cache:"no-store"
                }
            )
            const answer=await res.json()
            if(answer.postlar){
                //veritabanından postlar bulundu ve çekildi
                const response = NextResponse.json({
                    success:true,
                    postlar:answer.postlar
                })
                
                return response
            }
            else{
                //veritabanından postlar boştu
                const response = NextResponse.json({
                    success:false,
                    postlar:[]
                })
                return response
            }
        }
    }
    
}

