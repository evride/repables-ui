import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ItemUploadForm.scoped.scss';
import UploadsTable from './UploadsTable';
import { selectToken } from '../store/auth/selectors';
// import axios from 'Axios';

export default function ItemUploadForm() {
  const [files, setFiles] = useState([]);
  const [itemRevId, setItemRevId] = useState();
  const token = useSelector(selectToken)

  function handleChange(evt) {
    const newFiles = [...files];
    for (let i = 0; i < evt.target.files.length; i++) {
      const fileObj = {};
      fileObj.fileRef = evt.target.files[i];
      fileObj.fileName = evt.target.files[i].name;
      fileObj.fileSize = evt.target.files[i].size;
      fileObj.fileType = evt.target.files[i].type;
      fileObj.completed = false;
      newFiles.push(fileObj);
    }

    setFiles(newFiles);
    evt.preventDefault();
  }

  
  useEffect(() => {
      fetch('https://api.repables.com/item', {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setItemRevId(data.id);
        });
    }, []);
    
    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        
        const payload = {};
        Array.from(evt.target).forEach((input) => {
            if (input.name && input.name !== 'file') {
                payload[input.name] = input.value;
            }
        });
        
        fetch(`https://api.repables.com/item/${itemRevId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
    };
    
    const uploadFile = (file) => {
        const payload = new FormData();
        payload.append('file', file.fileRef);
        
        fetch(`https://api.repables.com/file/${itemRevId}`, {
            method: 'POST',
            headers: {
                // 'Sec-Fetch-Site' : 'cross-site',
                // 'Sec-Fetch-Mode' : 'cors',
                // "Content-Type": "multipart/form-data",
                // 'Accept': 'application/json',
                
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        })
        .then((resp) => resp.json())
        .then(() => {
            file.completed = true;
            const newFiles = [...files];
            setFiles(newFiles);
        });
    };

    useEffect(() => {
      const notCompleted = files.filter(file => !file.completed)
      if (notCompleted.length >= 1) {
          uploadFile(notCompleted[0])
      }
     
    }, [files]);
    
    return (
        <div className="item-upload-form">
      <form onSubmit={handleFormSubmit}>
        <div className="form-row">
          <label htmlFor="file">Files</label>
          <input id="file" type="file" multiple name="file" onChange={handleChange} />
      <UploadsTable files={files} />
        </div>
        <div className="form-row">
          <label htmlFor="name">Item Name</label>
          <input id="name" type="text" name="name" placeholder="name" />
        </div>
        <div className="form-row">
          <label htmlFor="description">Item Description</label>
          <textarea id="description" type="text" name="description" placeholder="description" />
        </div>
        <div className="form-row">
          <label htmlFor="instructions">Instructions</label>
          <textarea id="instructions" type="text" name="instructions" placeholder="instructions" />
        </div>
        <div className="form-row">
          <label htmlFor="license">License</label>
          <select>
            <option>cc, Attribution - Creative Commons</option>
            <option>cc-sa, Attribution - Share Alike - Creative Commons</option>
            <option>cc-nd, Attribution - No Derivatives - Creative Commons</option>
            <option>cc-nc, Attribution - Non-Commercial - Creative Commons</option>
            <option>cc-nc-sa, Attribution - Non-Commercial - Share Alike</option>
            <option>cc-nc-nd, Attribution - Non-Commercial - No Derivatives</option>
            <option>pd, Creative Commons - Public Domain Dedication</option>
            <option>gpl, Creative Commons - GNU GPL</option>
            <option>lgpl, Creative Commons - LGPL</option>
            <option>bsd, BSD License</option>
            <option>nokia, Nokia</option>
            <option>public, Public Domain</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="version">Version</label>
          <input id="version" type="text" name="version" placeholder="version" defaultValue="1.0" />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
