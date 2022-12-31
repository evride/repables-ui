import React, {useEffect, useState} from 'react';

import { useSelector } from 'react-redux';
import { selectToken } from '../store/auth/selectors';
import ItemCard from '../item-components/ItemCard';

export default function Explore() {

    const [items, setItems] = useState([])
    const token = useSelector(selectToken)
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(20)

    function handleChange () {
      setPage(page + 1)
      console.log("pressed")
    }

    function limitChange(event) {
      setLimit(Number(event.target.value))
    }

    useEffect(() => {
        fetch(`https://api.repables.com/items?offset=${page * limit}&limit=${limit}`, {
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

  return (
    <div className="item-container">
     <select onChange={limitChange}>
        <option value="10" >10</option>
        <option value="20" selected>20</option>
        <option value="50">50</option>
        <option value="100">100</option>
     </select>
     {mappedItems}
     <button type="button" onClick={handleChange}>Next page</button>
    </div>
  );
}
