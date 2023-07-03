"use client"
import styles from './page.module.css'
import { Comment } from './Comment.js'
import {RiDeleteBin2Fill}  from "react-icons/ri"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Admin ({post,Auth}){
  const router= useRouter();

  const [FormData,setFormData] = useState({
    post_id:post.id,
    post_baslik:post.baslik,
    post_icerik:post.icerik
  })
  async function DeletePost(e){
    e.preventDefault();
    const res=await fetch('/api/deletePostAdmin', {
                headers: {'Content-Type': "application/json"},
                method:"POST",
                body: JSON.stringify({post_id:post.id}),
            }
    )
    const {success} = await res.json()
    if(success){
        router.push("/")
    }
    else{
        alert("yorum silinemedi")
    }
  }
  async function UpdatePost(e){
      e.preventDefault();
      const res=await fetch('/api/updatePostAdmin', {
                  headers: {'Content-Type': "application/json"},
                  method:"POST",
                  body: JSON.stringify({FormData}),
              },
              
      )
      const {success} = await res.json()
      if(success){
          router.refresh()
      }
      else{
          alert("post güncellenemedi")
      }    
  }
//<button onClick={e=>DeletePost(e,post.id)} ></RiDeleteBin2Fill></button>

    return (
        <>
        <div className={`${styles["container"]}`}>
          
            <div className={styles['post']}>
            <form onSubmit={e => UpdatePost(e)}>
              <textarea className={styles["admin-poem-header"]} onChange={(e)=>setFormData({...FormData,post_baslik:e.target.value})}>{post.baslik}</textarea>
              <textarea className={styles["admin-poem"]} onChange={(e)=>setFormData({...FormData,post_icerik:e.target.value})} >{post.icerik}</textarea>
              <button type='submit' className={`secondary-button ${styles["button"]}`}>Şiiri Güncelle</button>
              <button onClick={e=> DeletePost(e,post.id)} className={`secondary-button ${styles["button"]}`}>
                <RiDeleteBin2Fill className={styles["logo"]}/> Şiiri Sil <RiDeleteBin2Fill className={styles["logo"]}/>
              </button>
            </form>
            </div>
          <div className={`${styles["comment-section"]}`}>
            <div className={`${styles["poem-header"]}`}>YORUMLAR</div>
            <Comment Auth={Auth} id={post.id}/>
          </div>
          <div className={styles["container-bg"]}></div>
        </div>
      </>
      )

}

export const getAllOfPosts= async ()=>{
  const res = await fetch("https://siir-sitesi-backend.onrender.com/User/AllOfPosts",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const repo = await res.json()
  return repo.postlar
}
export async function generateStaticParams(){
  console.log("build içinde")
  const posts = await getAllOfPosts();
  
  return posts.map(post => ({id: `${post.id}`}))
}