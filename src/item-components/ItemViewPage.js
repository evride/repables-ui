import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/auth/selectors';


function ItemViewPage() {

const [item, setItem] = useState("")

const {itemId} = useParams()
const token = useSelector(selectToken)

useEffect(() => {
    fetch(`https://api.repables.com/items/${itemId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
          },
      })
      .then((resp) => resp.json())
      .then((data) => {
          setItem(data);
      });
  }, []);

    return (
        <div>
            <h1>{item.name}</h1>
            <h2>{item.description}</h2>
            <p>{item.instructions}</p>
            <p>{item.license}</p>
        </div>
    )
}


export default ItemViewPage