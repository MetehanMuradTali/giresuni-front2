import Main from "../../components/main"
import Pagination from "../../components/pagination"

export const revalidate = 0


export default async function Home({params}) {
  let pageNumber
  if(params.page){
    pageNumber=params.page[0]
  }
  else{
    pageNumber=1
  }
  
  
  return (
    <div>
      <Main pageNumber={pageNumber}/>
      <Pagination pageNumber={pageNumber}/>
    </div>
  )
}
