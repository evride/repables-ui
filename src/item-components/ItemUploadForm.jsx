import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ItemUploadForm.scoped.scss';
import UploadsTable from './UploadsTable';
import { selectToken } from '../store/auth/selectors';
// import axios from 'Axios';

export default function ItemUploadForm() {
  const [files, setFiles] = useState([]);
  const [itemRevId, setItemRevId] = useState();
  const [currUpload, setCurrUpload] = useState();
  const [uploadStatusChange, setUploadStatusChange] = useState(0);
  const token = useSelector(selectToken)

  function handleChange(evt) {
    const newFiles = [...files];
    for (let i = 0; i < evt.target.files.length; i++) {
      console.log(evt.target.files[i]);
      const fileObj = {};
      fileObj.fileRef = evt.target.files[i];
      fileObj.fileName = evt.target.files[i].name;
      fileObj.fileSize = evt.target.files[i].size;
      fileObj.fileType = evt.target.files[i].type;
      fileObj.bytesLoaded = 0;
      fileObj.id = `${fileObj.fileName},${fileObj.fileSize},${new Date().getTime()}`;
      fileObj.completed = false;
      newFiles.push(fileObj);
    }
    console.log(newFiles);
    setFiles(newFiles);
    evt.preventDefault();
  }

  
  useEffect(() => {
      fetch('https://api.repables.com/item-revision', {
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
 

    useEffect(() => {
      const notCompleted = files.filter((file) => !file.completed);      
      if (notCompleted.length >= 1 && !currUpload) {
        setCurrUpload(notCompleted[0]);
      }
     
    }, [files, currUpload]);
    
    useEffect(() => {
      if (currUpload) {
        
        const file = currUpload;
        const payload = new FormData();
        payload.append('file', file.fileRef);
        
        const req = new XMLHttpRequest();
        req.addEventListener('load', () => {
          file.completed = true;
          setCurrUpload(undefined);
        });
        req.upload.addEventListener('progress', (evt) => {
          console.log('progress', evt.loaded, evt.total)
          file.bytesLoaded = evt.loaded;
          setUploadStatusChange((new Date()).getTime());
        });
        req.fileId = file.id;
        req.open("POST", `https://api.repables.com/file/${itemRevId}`);
        req.setRequestHeader('Authorization', `Bearer ${token}`);
        req.send(payload);
      }
    }, [currUpload]);


    return (
        <div className="item-upload-form">
      <form className="create-form-design" onSubmit={handleFormSubmit}>
        <div className="form-row">
          <label htmlFor="file">Add Files</label>
          <input  id="file" type="file" multiple name="file" onChange={handleChange} />
        </div>
        <UploadsTable files={files} />
        <div className="form-row">
          <label htmlFor="name">Item Name:</label>
          <input  id="name" type="text" name="name" placeholder="name" />
        </div>
        <div className="form-row">
          <label htmlFor="description">Item Description:</label>
          <textarea id="description" type="text" name="description" placeholder="description" />
        </div>
        <div className="form-row">
          <label htmlFor="instructions">Instructions:</label>
          <textarea id="instructions" type="text" name="instructions" placeholder="instructions" />
        </div>
        <div className="form-row">
          <label  htmlFor="license">License</label>
          <select id="license">
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
        <button className="upload-form-btn" type="submit">Upload</button>
      </form>
    </div>
  );
}
