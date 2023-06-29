"use client"
import React, { useState,useEffect } from 'react'
import { ImPen } from "react-icons/im";
import Link from 'next/link'
import styles from "./page.module.css"

function admin({pageNumber}){

  const [Posts,setPostlar] = useState({
    posts:[]
  });

  async function getData(){
    const res=await fetch('/api/getPostsAdmin', {
          headers: {'Content-Type': "application/json"},
          method:"POST",
          body: JSON.stringify({pageNumber:pageNumber}),
      })
      const {success,postlar} = await res.json()
      if(success){
          setPostlar({posts:postlar})
      }
      else{
          console.log("Postlar Yüklenmedi")
      }
  }
  useEffect(()=>{
    getData();
  },[])
    return (
      <div className={styles["admin-container"]}>
        <h3 className={styles["admin-header"]}><ImPen className={styles["admin-logo"]}/>Şiir Listesi</h3>
        <div className={styles["admin-poem-container"]}>
          {[...Posts.posts].map((post,key)=><Link href={`/Post/${post.id}`} key={key} className={`secondary-button ${styles["admin-poem"]}`}><div>{post.id}-{post.baslik}</div></Link>)}
        </div>
      </div>
      )
}

export default admin