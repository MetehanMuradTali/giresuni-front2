import { NextResponse } from "next/server"
import {getJwtSecretKey} from "../../../libs/auth"
import { SignJWT } from "jose"
export async function POST(request){
    const FormData=await request.json()
    const res=await fetch('https://siir-sitesi-backend.onrender.com/User/Login', {
                headers: {'Content-Type': "application/json"},
                method:"POST",
                body: JSON.stringify(FormData),
            }
        )
    const user=await res.json()
    if(user.error){
        //kullanici girişi hatalı
        const response = NextResponse.json({
            success:false
        })
        return response    
    }
    else{
        //kullanici girişi başarılı
        //token üret
        const token =await new SignJWT({
            isim: user.isim,
            sifre: user.sifre,
            role: user.role
        }).setProtectedHeader({alg:"HS256"})
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(getJwtSecretKey())
        //cookie setle
        const response = NextResponse.json({
            success:true
        })
        response.cookies.set({
            name:'token',
            value:token,
            path:'/'
        })
        //return the response
        return response
    }
}