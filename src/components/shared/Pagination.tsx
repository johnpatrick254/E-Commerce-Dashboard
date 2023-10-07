export const Pagination:React.FC<{lastPage:number,setCurrentPage:(current:number)=>void,totals:number}>=({lastPage,setCurrentPage,totals})=>{
    const pages = [];
    for (let index = 0; index < lastPage; index++) {
       pages.push(1+1);
        
    }
   return <>
   <div className="pagination">
    <div className="back"><p>{"<"}</p></div>
    <div className="pages">
    {
        pages.map(i=><p onClick={()=>{
            if(i>lastPage)return;
            setCurrentPage(i);
        }}>{i}</p>)
    }
    </div>
    <div className="next"></div>
   </div>
   </>

}