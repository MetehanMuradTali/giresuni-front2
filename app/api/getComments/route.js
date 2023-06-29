import { NextResponse } from "next/server"
export async function POST(request){
    
    const FormData=await request.json()
    const res=await fetch('https://siir-sitesi-backend.onrender.com/User/Get_Comments', {
            headers: {'Content-Type': "application/json"},
            method:"POST",
            body: JSON.stringify(FormData),
        }
    )
    const answer=await res.json()
    if(answer.yorumlar){
        //veritabanından yorumlar bulundu ve çekildi
        const response = NextResponse.json({
            success:true,
            yorumlar:answer.yorumlar
        })
        return response
    }
    else{
        //veritabanından yorumlar boştu
        const response = NextResponse.json({
            success:false,
            yorumlar:[]
        })
        return response

    }
}

