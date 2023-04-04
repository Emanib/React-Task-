import React, { useState } from 'react';
import './style.css'
interface IProps {
    pages: number;
    currentPage: number;
    setPage: Function;
    totalProducts:number
}
const Pagination = ({ pages, currentPage = 1, setPage, totalProducts }: IProps ) => {
const handleClick = (page: number) => {
        setPage(page);
        // console.log("ss", page)
    };
   

    const handlePrevPage = () => {
        setPage((prevState: number) => prevState - 1);
    };

    const handleNextPage = () => {
    //  should handle this case when reach last product 
           setPage((prevState: number) => prevState + 1);
    };

    let Pages = [];
    for (let i = 1; i <= Math.ceil(totalProducts/pages); i++) {
        // console.log(i, Math.ceil(7 / 3), totalProducts )
        Pages.push(i)

  }
  return (
    <>
      <button onClick={handlePrevPage} className='btn-page' disabled= {currentPage ===1} > {"< "}</button>
          {Pages.map((page,index)=>(
              <button
              
                key={index}
                onClick={() => handleClick(page)}
                className={page ==currentPage? "active":"btn-page"}
               >
                {page}
             </button>
          ))}
      <button onClick={handleNextPage} className='btn-page' disabled={currentPage == totalProducts} > {"> "}</button>
    </>
  )

}

export default Pagination;
