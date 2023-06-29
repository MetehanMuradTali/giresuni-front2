import Posts from '../../../components/posts'
import Pagination from "../../../components/posts_pagination"

export const metadata = {
  title: "Bütün Şiirler"
}

const getAllPosts = async (pageNumber) => {
  const res = await fetch("https://siir-sitesi-backend.onrender.com/User/AllPost",{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify({pageNumber:pageNumber})
              })
  const repo = await res.json()
  return repo.postlar
}

export default async function Page({params}) {
  let posts
  let pageNumber
  if(params.page){
    pageNumber=params.page[0]
    posts = await getAllPosts(pageNumber)
  }
  else{
    pageNumber=1
    posts=await getAllPosts(pageNumber)
  }
return (
  <div>
    <Posts posts={posts}/>
    <Pagination pageNumber={pageNumber}/>
  </div>
)
}
