import Link from 'next/link'
import React from 'react'
import styles from './page.module.css'
const index = ({pageNumber}) => {
    pageNumber= parseInt(pageNumber)
  return (
    <div className={styles["btn-container"]}>
        {pageNumber>1 ? <Link href={`/AllPosts/${(pageNumber)-1}`} className={`${styles["pre-btn"]} primary-button`}>Önceki Sayfa</Link> : ""} 
        <Link href={`/AllPosts/${(pageNumber)+1}`} className={`${styles["next-btn"]} primary-button`}>Sonraki Sayfa</Link>
    </div>
  )
}

export default index