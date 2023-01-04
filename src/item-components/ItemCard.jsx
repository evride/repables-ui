import React from 'react'
import {Link} from 'react-router-dom';


function ItemCard({item}) {
    return (
        <Link to ={"/r/" + item.id} className="item-card">
            <div>
                <img src={`https://dev.repables.com/${item.previewImage.large.url}`}
                alt={item.name}/>
                <h2>{item.name}</h2>
                <h4>{item.user.username}</h4> 
            </div>
        </Link> 
    )
}

export default ItemCard