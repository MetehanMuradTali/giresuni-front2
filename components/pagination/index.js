import Link from 'next/link'
import React from 'react'
import styles from './page.module.css'
const index = ({pageNumber}) => {
    console.log("1:",pageNumber);
    pageNumber= parseInt(pageNumber);
    console.log("2:",pageNumber);
    
  return (
    <div className={styles["btn-container"]}>
        {pageNumber>1 ? <Link href={`/${(pageNumber)-1}`} className={`${styles["pre-btn"]} primary-button`}>Önceki Sayfa</Link> : ""} 
        <Link href={`/${(pageNumber)+1}`} className={`${styles["next-btn"]} primary-button`}>Sonraki Sayfa</Link>
    </div>
  )
}

export default index
