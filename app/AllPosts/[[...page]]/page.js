import Posts from '../../../components/posts'
import Pagination from "../../../components/posts_pagination"

export const revalidate = 0


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
  async function setPageNumber(){
    if(params.page==undefined){
      return 1
    }
    else{
      return params.page[0]
    }
  }

  async function getPosts(){
    if(params.page==undefined){
      return await getAllPosts(1)
    }
    else{
      return  await getAllPosts(params.page[0])
    }
  }
  
  let pageNumber = await setPageNumber()
  let posts = await getPosts()
return (
  <div>
    <Posts posts={posts}/>
    <Pagination pageNumber={pageNumber}/>
  </div>
)
}
