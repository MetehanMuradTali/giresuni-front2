"use client"
import { useEffect} from "react";
import { useRouter } from "next/navigation";



export default function page(){
    useEffect(()=>{
        Logout()
    },[])
    const router = useRouter()
    async function Logout(){
        const res=await fetch('/api/logout', {
                    method:"POST",
                }
        )
        const {success} = await res.json()
        if(success){
            router.push("/")
            router.refresh()
        }
        else{
            alert("çıkış başarısız")
        }
    }
    
  return (
    <div>
        "Çıkış Yapılıyor"
    </div>
  )
}

