import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Dropdown.scoped.scss" 



export default function Dropdown({ options, children}){
    
    const [open, setOpen] = useState(false);
    const ref = useRef(null)
    const clickedDropdown = (evt) => {
        evt.preventDefault()
        setOpen(!open);
    };

    useEffect(()=> {
        const callback = (evt) => {
            if (ref.current && !ref.current.contains(evt.target)){
                setOpen(false)
            }

        }
        document.addEventListener('click', callback);
        return () =>{
            document.removeEventListener('click', callback)
        }
    }, [open]);

    return(
        <div className="dropdown" onClick={clickedDropdown} ref={ref}>
            {children}
           { open && Array.isArray(options) && (
                    <ul>
                        {options.map(option => <li key={option.label}><Link to={option.value}>{option.label}</Link></li>)}
                    </ul>)}
        </div>
    )
}