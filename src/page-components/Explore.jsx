import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/auth/selectors';
import ItemCard from '../item-components/ItemCard';

export default function Explore() {

    const [items, setItems] = useState([])
    const token = useSelector(selectToken)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    

    function nextPage () {
      setPage(page + 1)
      console.log("pressed")
    }

    function previousPage() {
      if(page > 1){
        setPage(page - 1)
      } 
    }

    function limitChange(event) {
      setLimit(Number(event.target.value))
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
          });
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
     return num >= 1
    })


    const mappedArray = filteredArray.map(num => {
    return <button className={num === page ? "current-page" : ""} type="button">{num}</button>
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
          <button className="results-page-btn" type="button" onClick={previousPage}>Previous page</button>
          <div>
            {mappedArray}
            </div>
          <button className="results-page-btn" type="button" onClick={nextPage}>Next page</button>
        </div>
    </div>
  );
}
