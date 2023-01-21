import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom'
import { selectToken } from '../store/auth/selectors';
import ItemCard from '../item-components/ItemCard';

export default function Explore() {

    const [items, setItems] = useState([])
    const token = useSelector(selectToken)
    const [limit, setLimit] = useState(20)
    const [count, setCount] = useState()
    const {pageNum} = useParams() 
    const page = Number(pageNum ?? 1)  
    const navigate = useNavigate()
    console.log(pageNum)

    
    function setPage(num){
      navigate(`/explore/${num}`)
    }
    
    function nextPage () {
      setPage(page + 1)
      console.log("pressed")
    }
    
    function previousPage() {
      if(page !== 1){
        setPage(page -1)
      }
    }
    
    
    function limitChange(event) {
      const currentPage = page;
      const currentLimit = limit;
      const newLimit = event.target.value;
      const newPage = Math.floor((currentPage - 1) * currentLimit / newLimit ) + 1

      setLimit(Number(event.target.value));
      setPage(newPage)

    }

    useEffect(() => {
        fetch(`https://api.repables.com/items?offset=${(page -1) * limit}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
              },
          })
          .then((resp) => resp.json())
          .then((data) => {
              setItems(data.results);
              setCount(data.count)
          });
          // window.scrollTo({top: 10, left: 0, behavior: 'smooth'})
      }, [page, limit]);

    const mappedItems = items.map(item => { 
        return ( 
         <ItemCard item={item} key={item.id}/>
    );
    
})

    const array = [
      page - 4, page - 3, page - 2, page - 1, page, page + 1, page + 2, page + 3, page + 4
    ]

    const filteredArray = array.filter(num => {
     return num >= 1 && num <= count / limit + 1 
    })


    const mappedArray = filteredArray.map(num => {
    return <button onClick={() => setPage(num)} className={`paginated-numbers ${num === page ? "current-page" : ""}`} type="button" key={num}>{num}</button>
      } 
    )

  return (
    <div className="items-page">
        <div className="results-per-page-container">
          <label htmlFor="ResultsPerPage">Results per page</label>
            <select id="ResultsPerPage" className="select-limit" onChange={limitChange} defaultValue="20">
              <option value="10" >10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
          </select>
       </div>
      <div className="item-container">
          {mappedItems}
      </div>
        <div className="results-btn-container">
          { page !== 1 && <button className="results-page-btn" type="button" onClick={previousPage}>Previous page</button>}
          <div>
            {mappedArray}
            </div>
         { page < Math.floor(count / limit + 1) && <button className="results-page-btn" type="button" onClick={nextPage}>Next page</button>}
        </div>
    </div>
  );
}
