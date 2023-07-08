"use client"
import React from 'react'
import styles from "./page.module.css"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
function index(){
    const router= useRouter();

    const [FormData,setFormData] = useState({
        post_baslik:"Baslik",
        post_icerik:"İcerik"
      })

    async function CreatePost(e){
        e.preventDefault();
        const res=await fetch('/api/createPostAdmin', {
                    headers: {'Content-Type': "application/json"},
                    method:"POST",
                    body: JSON.stringify({FormData}),
                },
                
        )
        const {success} = await res.json()
        if(success){
            //Yorum silindi yorumları tekrar yükle
            router.push("/")
        }
        else{
            //Yorum silinemedi
            alert("yorum güncellenemedi")
        }    
    }
    return (
    <>
    <div className={`${styles["container"]}`}>
          <div className={styles['post']}>
          <form onSubmit={e => CreatePost(e)}>
            <textarea className={styles["admin-poem-header"]} onChange={(e)=>setFormData({...FormData,post_baslik:e.target.value})}>{FormData.post_baslik}</textarea>
            <textarea className={styles["admin-poem"]} onChange={(e)=>setFormData({...FormData,post_icerik:e.target.value})}>{FormData.post_icerik}</textarea>
            <button type='submit' className={`secondary-button ${styles["button"]}`}>Şiir'i Oluştur</button>
          </form>
          </div>
        <div className={styles["container-bg"]}></div>
      </div>
    </>
    )
}

export default index
