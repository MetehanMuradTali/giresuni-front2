import React from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import {FaFacebookSquare,FaInstagramSquare,FaYoutubeSquare} from 'react-icons/fa'
import {GiCherry} from "react-icons/gi"
import { useAuth } from '../../hooks/auth'

const index =async () => {
    const Auth=await useAuth.fromServer()
  return (
    <nav className={styles["header-container"]}>
        <div className={styles["left-flex"]}>
            <h2 className={styles["brand"]}><GiCherry style={{"display":"inline-block","color":"var(--accent)"}}/><Link href={"/"}>Giresuni</Link></h2>
        </div>
        <input className={styles.checkbox_toggle} type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className={styles.hamburger}>&#9776;</label>

        <div className={styles["link-container"]}>
            {Auth ? ( Auth.role=="admin" ? <div className={styles["all-posts"]}><Link className={styles["all-posts-link"]} href={`/Admin/Create`}>Şiir Oluştur</Link></div> : <div className={styles["all-posts"]}><Link className={styles["all-posts-link"]} href={`/AllPosts`}>Bütün Şiirler</Link></div>) : <div className={styles["all-posts"]}><Link className={styles["all-posts-link"]} href={`/AllPosts`}>Bütün Şiirler</Link></div> }
            <div className={styles["links"]}>
            <div className={styles["external"]}>
                <div className={styles["external-banner"]}>Sosyal Medya</div>
                <hr/>
                <div className={styles["external-links"]} >
                    <Link  className={`${styles["link"]}`} href="https://www.facebook.com/haticesatgunn" target="_blank" ><FaFacebookSquare/></Link>
                    <Link  className={styles["link"]} href="https://instagram.com/hsatgun" target="_blank" ><FaInstagramSquare/></Link>
                    <Link  className={styles["link"]} href="https://youtube.com/@HaticeSatgunGiresuni" target="_blank" ><FaYoutubeSquare/></Link>
                </div>
            </div>
            <div className={styles["internal"]}>
                {Auth ? <Link href="/Logout" className={`primary-button ${styles["button"]}`} >Çıkış Yap</Link>
                :   <><Link href="/Login" className={`primary-button ${styles["button"]}`} >Giriş Yap</Link>
                <Link href="/Register" className={`primary-button ${styles["button"]}`} >Kayıt Ol</Link></>}
            </div>
        </div>
        </div>
        <div className={styles["full-page-green"]}></div>
    </nav>
  )
}

export default index
