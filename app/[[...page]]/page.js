import Main from "../../components/main"
import Pagination from "../../components/pagination"

export const revalidate = 0


export default async function Home({params}) {
  async function setPageNumber(){
    if(params.page==undefined){
      return 1
    }
    else{
      return params.page[0]
    }
  }
  let pageNumber = await setPageNumber()
    console.log(pageNumber)

  return (
    <div>
      <Main pageNumber={pageNumber}/>
      <Pagination pageNumber={pageNumber}/>
    </div>
  )
}
