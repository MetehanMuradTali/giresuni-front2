import React from 'react'
import Link from 'next/link'
import styles from "./page.module.css"
import { ImPen } from "react-icons/im";

const index = ({posts}) => {
  return (
  <div className={styles["container"]}>
    <h3 className={styles["header"]}><ImPen className={styles["logo"]}/>Şiir Listesi</h3>
    <div className={styles["poem-container"]}>{posts.map((post,key)=><Link href={`/Post/${post.id}`} key={key} className={`secondary-button ${styles["poem"]}`}><div>{post.baslik}</div></Link>)}</div>
  </div>
  )
}

export default index