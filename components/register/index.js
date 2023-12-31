"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css"


export default function Register(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const [formData,setFormData] = useState({
        isim:"",
        sifre:""
    })
    async function Register(){
        const res=await fetch('/api/register', {
                    headers: {'Content-Type': "application/json"},
                    method:"POST",
                    body: JSON.stringify(formData),

                }
        )
        const {success} = await res.json()
        if(success){
            const nextUrl= searchParams.get("next")
            router.push("/")
            router.refresh()
        }
        else{
            alert("kayıt başarısız")
        }   
    }
    
  return (
    <div>
        <form className={styles["form"]} onSubmit={(e)=>{e.preventDefault();Register()}}>
            <div className={styles["con"]}>
                <header className={styles["header-form"]}>
                    <h2 className={styles["header-form-h2"]}>Kayıt Formu</h2>
                </header>
                <br/>
                <div className="field-set">
                    <span className={styles["input-item"]}>
                        <i className="fa fa-user-circle"></i>
                    </span>
                    <input className={styles["form-input"]} id={styles["txt-input"]} type="text" placeholder="@Kullanıcıİsmi" required onChange={(e)=>setFormData({...formData,isim:e.target.value})}/>
                    <br/>

                    <span className={styles["input-item"]}>
                        <i className="fa fa-key"></i>
                    </span>
                    <input className={styles["form-input"]} id="pwd" type="password" placeholder="Şifre"  required onChange={(e)=>setFormData({...formData,sifre:e.target.value})}/>
                    <br/>
                    <button type="submit" className={styles["log-in"]} style={{"marginTop":"10px"}}> Kayıt Ol </button>
                </div>
            </div>
        </form>
    </div>
  )
}

