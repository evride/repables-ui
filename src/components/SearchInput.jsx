import React, {useEffect, useRef, useState} from "react"
import {useNavigate, useSearchParams} from 'react-router-dom'

export default function SearchInput() {
    const navigate = useNavigate();
    const inputRef = useRef()
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q")
    const [searchState, setSearchState] = useState("")
    
    
    function handleSubmit(event) {
          event.preventDefault();
          const searchVariable = event.target.search.value
          navigate("/search?q=" + encodeURIComponent(searchVariable).replace( '%20', '+'))  
       }

    function handleChange(event) {
        setSearchState(event.target.value)
    }
      
    useEffect(() => {
        inputRef.current.value = q;
        inputRef.current.focus();
        setSearchState(q ?? "")
    },[])
    
    console.log(searchState.length)
    
    return (
        <form onSubmit={handleSubmit}>
                <input className = "search-input" ref={inputRef} type="text" placeholder="search" 
                name="search" onChange={handleChange}/> 
                { searchState.length >= 1 ? 
                (<button className="search-button" type="submit">Search!</button>) : 
                null}
        </form>


    )
}