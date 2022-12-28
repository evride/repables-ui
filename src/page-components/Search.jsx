import React, {useEffect, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/auth/selectors';

export default function Search() {

    const [items, setItems] = useState([])
    const token = useSelector(selectToken)



    const [searchParams] = useSearchParams();
    console.log(searchParams.get("q"))
    const q = searchParams.get("q")

    useEffect(() => {
        fetch(`https://api.repables.com/search?q=${q}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
              },
          })
          .then((resp) => resp.json())
          .then((data) => {
                if(Array.isArray(data.results)){
                    setItems(data.results);
                }
          })
      }, []);

const mappedItems = items.map(item => { 
    return ( 
    <div key={item.id}> 
        <Link to ={"/r/" + item.id}> {item.id}
            <div>
                <h4>{item.user.username}</h4> 
                <h1>{item.name}</h1>
            </div>
        </Link> 
    </div>
    );
})

  return (
    <div>
        <h1>Search Page!!!!!</h1>
        {mappedItems}
    </div>
  );
}
