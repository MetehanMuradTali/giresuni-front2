import { useAuth } from "../../../hooks/auth"
import { NextResponse } from "next/server"
export async function POST(request){
    const Auth=await useAuth.fromServer()
    if(Auth){
        const FormData=await request.json()
        const FormData2={...FormData,kullaniciIsim:Auth.isim}
        const res=await fetch('https://siir-sitesi-backend.onrender.com/User/Add_Comment', {
                headers: {'Content-Type': "application/json"},
                method:"POST",
                body: JSON.stringify(FormData2),
            }
        )
        const {success}=await res.json()
        if(success){
            const response = NextResponse.json({
                success:true,
            })
            return response
        }
        else{
            const response = NextResponse.json({
                success:false
            })
            return response
        }
    }
    else{
    }

}

