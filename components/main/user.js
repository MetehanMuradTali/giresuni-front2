import React from 'react'
import styles from "./page.module.css"
import Link from 'next/link'


async function user({pageNumber}){
  
  const getPosts = async (pageNumber=1) => {
    const res = await fetch("https://siir-sitesi-backend.onrender.com/User/Posts",{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify({pageNumber:pageNumber})
                })
    const repo = await res.json()
    return repo.postlar
  }
  const posts = await getPosts(pageNumber)
  
  return (
    
<div className={styles["post-container"]}>
        {posts.map((post,key)=>
        <article key={key} className={styles["post"]}>
          <header className={styles["header"]}><h3>{post.baslik}</h3></header>
          <br/>
          <div className={styles["poem"]}>
            {post.icerik.indexOf("\n\n") == -1 ? post.icerik : post.icerik.slice(0,post.icerik.indexOf("\n\n"))}
          </div>
          <div className={styles["link"]}><Link className="secondary-button" href={`/Post/${post.id}`}>Devamını Oku</Link></div>
        <div className={styles["post-bg"]}></div>
        </article>)}
    </div>  )
}

export default user