import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

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
        <div role="menu" tabIndex={0} className="dropdown" onClick={clickedDropdown} ref={ref}>
            {children}
           { open && Array.isArray(options) && (
                    <ul>
                        {options.map(option => <li key={option.label}><Link to={option.value}>{option.label}</Link></li>)}
                    </ul>)}
        </div>
    )
}

Dropdown.propTypes = {
options: PropTypes.arrayOf(PropTypes.exact({
    label: PropTypes.string,
    value: PropTypes.string
})).isRequired,
children: PropTypes.arrayOf(PropTypes.element).isRequired
}