import { NextResponse } from "next/server"
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
            const res=await fetch('https://siir-sitesi-backend.onrender.com/Admin/Delete_Post', {
                    headers: {'Content-Type': "application/json"},
                    method:"POST",
                    body: JSON.stringify(FormData),
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
    }
    else{
    }

}

