import React, {useEffect, useState} from 'react';

import { useSelector } from 'react-redux';
import { selectToken } from '../store/auth/selectors';
import ItemCard from '../item-components/ItemCard';

export default function Explore() {

    const [items, setItems] = useState([])
    const token = useSelector(selectToken)

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
        <ItemCard item={item} key={item.id}/>


    // <div key={item.id}> 
    //     <Link to ={"/r/" + item.id} className="item-card">
    //         <div>
    //             <img src={`https://dev.repables.com/${item.previewImage.large.url}`}
    //              alt={item.name}/>
    //             <h1>{item.name}</h1>
    //             <h4>{item.user.username}</h4> 
    //         </div>
    //     </Link> 
    // </div>
    );
})

  return (
    <div className="item-container">
     {mappedItems}
    </div>
  );
}
