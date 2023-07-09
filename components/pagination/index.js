import Link from 'next/link'
import React from 'react'
import styles from './page.module.css'
const index = ({pageNumber}) => {
    let prePage= parseInt(pageNumber)-1
    let nextPage = parseInt(pageNumber)+1
  return (
    <div className={styles["btn-container"]}>
        {pageNumber>1 ? <Link href={`/${prePage}`} className={`${styles["pre-btn"]} primary-button`}>Önceki Sayfa</Link> : ""} 
        <Link href={`/${nextPage}`} className={`${styles["next-btn"]} primary-button`}>Sonraki Sayfa</Link>
    </div>
  )
}

export default index
