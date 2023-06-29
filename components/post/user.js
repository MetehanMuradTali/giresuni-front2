import React from 'react'
import styles from './page.module.css'
import { Comment } from './Comment.js'


export async function User({id,Auth}){
  const getPost = async (id) => {
    const res = await fetch("https://siir-sitesi-backend.onrender.com/User/Post",{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify({id:id}),
                })
    const repo = await res.json()
    return repo.post
  }
  const post = await getPost(id)
  return (
    <>
    <div className={`${styles["container"]}`}>
      <article className={styles['post']}>
        <header className={styles["poem-header"]}><h3>{post.baslik}</h3> </header>
        <div className={styles["poem"]}>{post.icerik}</div>
      </article>
      <div className={`${styles["comment-section"]}`}>
        <div className={`${styles["poem-header"]}`}>YORUMLAR</div>
        <Comment Auth={Auth} id={post.id}/>
      </div>
      <div className={styles["container-bg"]}></div>
    </div>
  </>
  )
}

