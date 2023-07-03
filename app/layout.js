import Header from "../components/header"
import Footer from "../components/footer"
import '../styles/reset.css'
import '../styles/global.css'

export const revalidate = 0

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template:"%s | Giresuni",
    default:"Giresuni"
  },
  description:"Giresunî (Hatice Satgun) tarafından kaleme alınan duygusal şiirlerin bulunduğu özel bir site. Şiir severler için en güzel şiirlerin paylaşıldığı ve duyguların derinliklerine yolculuk yapabileceğiniz bir platform. Kendine ait şiirlerinizi keşfedin ve paylaşın",
  keywords: ['Hatice Satgun şiirleri', 'Giresunî şiirleri', 'En güzel şiirler', 'Duygusal şiirler', 'Şiir sitesi' , 'Şair Hatice Satgun' , 'Giresun şiirleri'],
  applicationName: 'Giresunî',
  generator: 'Next.js', 
  authors: [{name: 'Hatice Satgun'},{name:'Metehan Murad Tali'}],
  creator: ['Hatice Satgun'],
  publisher: ['Hatice Satgun'],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

}
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <link rel="icon" href="/icon.png" sizes="any" />
      <body className="container">
          <Header/>
          <main>{children}</main>
          <Footer/>

      </body>
    </html>
  )
}
