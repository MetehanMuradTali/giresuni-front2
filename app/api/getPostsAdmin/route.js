import { NextResponse } from "next/server"
import { verifyJwtToken } from "../../../libs/auth"

export async function POST(request){
async function fromServer(){
    const cookieList = cookies();

    const {value:token} = cookieList.get("token") ?? {value:null};
    const verifiedToken = await verifyJwtToken(token);
    return verifiedToken;
}
const Auth=await fromServer()  
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

