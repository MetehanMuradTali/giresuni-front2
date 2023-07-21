import Post from '../../../components/post'

export const revalidate = 0

export default async function Page({params}) {
return (
    <Post id={params.id}/>
)
}
export async function generateMetadata({params}) {
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

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://siir-sitesi-backend.onrender.com/User/AllOfPosts",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',   
    }
  });
  const repo = await res.json()
 
  // Get the paths we want to pre-render based on posts
  const paths = repo.postlar.map((post) => ({
    params: { id: `${post.id}` },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}


/*export const getAllOfPosts= async ()=>{
  const res = await fetch("https://siir-sitesi-backend.onrender.com/User/AllOfPosts",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',   
    }
  })
  const repo = await res.json()
  return repo.postlar
}
export async function generateStaticParams(){
  console.log("build içinde")
  const posts = await getAllOfPosts();
  
  return posts.map(post => ({id: `${post.id}`}))
}*/