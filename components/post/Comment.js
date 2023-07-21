"use client"
import styles from './page.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {RiDeleteBin2Fill}  from "react-icons/ri"
export function Comment ({Auth,id}){
    const [formData,setFormData] = useState({
        comment:"",
        id:id
    })
    const [Comments,setComments] = useState({
        comments:[]
    });
    async function getData(){
        const res=await fetch('/api/getComments', {
            headers: {'Content-Type': "application/json"},
            method:"POST",
            body: JSON.stringify({id:id}),
        })
        const {success,yorumlar} = await res.json()
        const yorumlar_reversed =[...yorumlar].reverse()
        if(success){
            setComments({comments:yorumlar_reversed})
        }
        else{
            setComments({comments:[]})
        }
    }
    useEffect(()=>{getData()},[])
    async function DoComment(e){
        e.preventDefault();
        const res=await fetch('/api/addComment', {
                    headers: {'Content-Type': "application/json"},
                    method:"POST",
                    body: JSON.stringify(formData),
                }
        )
        const {success} = await res.json()
        if(success){
            //Yorum yapıldı yorumları tekrar yükle
            getData();
        }
        else{
            //Yorum yapılamadı
            alert("yorum yapılamadı")
        }   
    }
    async function DeleteComment(e,id){
        e.preventDefault();
        const res=await fetch('/api/deleteComment', {
                    headers: {'Content-Type': "application/json"},
                    method:"POST",
                    body: JSON.stringify({comment_id:id}),
                }
        )
        const {success} = await res.json()
        if(success){
            //Yorum silindi yorumları tekrar yükle
            getData();
        }
        else{
            //Yorum silinemedi
            alert("yorum silinemedi")
        }   
    }
return (<>
<div className={`${styles["comments-container"]}`}>
    <div className={`${styles["comments"]}`}>
          {Comments.comments.length!=0 ? Comments.comments.map((comment,key)=>
          <div key={key} className={`${styles["comment"]}`}>
            {Auth?.role=="admin" ? 
            <button onClick={e=>DeleteComment(e,comment.id)} className={`${styles["comment-delete"]}`}><RiDeleteBin2Fill></RiDeleteBin2Fill></button> : ""
            }
            <div className={`${styles["comment-header"]}`}>{comment["kullaniciIsim"]}</div>
            <div className={`${styles["comment-content"]}`}>{comment["yorum"]}</div>
          </div>
        ):<div className={`${styles["comment"]}`}>Yorum yapılmamış. İlk Yorumu Siz Yapın</div>}
   </div>
</div>
    {Auth ? 
    <form className={`${styles["comment-form"]}`} onSubmit={(e)=>{DoComment(e)}}>
        <textarea className={`${styles["comment-form-textarea"]}`} onChange={(e)=>setFormData({...formData,comment:e.target.value})}></textarea>
        <button type='submit' className={`secondary-button ${styles["comment-form-button"]}`}>Yorum Yap</button>
    </form> 
    : 
    <div className={`${styles["not-Auth"]}`}>
        <div className={`${styles["not-Auth-header"]}`}>Yorum Yapabilmek İçin</div>
        <div className={`${styles["not-Auth-buttons"]}`}>
            <Link href="/Login" className={`secondary-button ${styles["btn"]}`} >Giriş Yapın</Link> 
            <span style={{"margin":"0 10px"}} >veya</span>
            <Link href="/Register"className={`secondary-button ${styles["btn"]}`} >Kayıt Olun</Link>
        </div>
     </div>  
     }

    </>
    )
}

