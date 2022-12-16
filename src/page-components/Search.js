import React, {useEffect, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/auth/selectors';

export default function Search() {

    const [items, setItems] = useState([])
    const token = useSelector(selectToken)
    const [searchParams] = useSearchParams();
    console.log(searchParams.get("q"))

    useEffect(() => {
        fetch(`https://api.repables.com/items`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
              },
          })
          .then((resp) => resp.json())
          .then((data) => {
              setItems(data);
          });
      }, []);

const mappedItems = items.map(item => { 
    return ( 
    <div key={item.id}> 
        <Link to ={"/r/" + item.id}> {item.id}
            <div>
                <h1>Search Page!!!!!</h1>
                <h4>{item.user.username}</h4> 
                <h1>{item.name}</h1>
            </div>
        </Link> 
    </div>
    );
})

  return (
    <div>
        {mappedItems}
    </div>
  );
}
