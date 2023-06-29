import Post from '../../../components/post'

export async function generateMetadata({params}) {
  // read route params
  const id = params.id
 
  // fetch data
  const res = await fetch("https://siir-sitesi-backend.onrender.com/User/Post",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({id:id}),
  })
const repo = await res.json()  
  return {
    title: repo.post.baslik,
  }
}

export default async function Page({params}) {
return (
  <Post id={params.id}/>
)
}
