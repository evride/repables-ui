import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/auth/selectors';


function ItemViewPage() {

const [item, setItem] = useState("")
const [imageIndex, setImageIndex] = useState(0)

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
  
  


  function newSlide(i){
    console.log(i)
    setImageIndex(i) 

  }

  const styles = {
    marginLeft: imageIndex * -640 + "px",

  }

  

       const renderedGalleryImage = item.images && item.images.map(pic => {
          return (
              <div className="item-large-image" key={pic.small.url}>
                   <img src={`https://dev.repables.com/${pic.large.url}`} alt="something" /> 
              </div>

          )
          
      })
      


  
  
  const renderedThumbNails = item.images && item.images.map((pic, i) => {
    return (
        <div onClick={() => newSlide(i)} role="button" className="item-thumbnail" key={pic.small.url}>
           <img src={`https://dev.repables.com/${pic.small.url}`} alt="something" /> 
        </div>
       
       )
    })

    return (
        <div className="item-view-page-container">
            <div className="item-gallery-large-image">
                <div className="item-gallery-scroll" style={styles} >
                
                    {renderedGalleryImage}
                </div>
            </div>
            <div className="item-gallery-thumbnail">
                {renderedThumbNails}
            </div>
            <h1>{item.name}</h1>
            <h2>{item.description}</h2>
            <p>{item.instructions}</p>
            <p>{item.license}</p>
        </div>
    )
}


export default ItemViewPage