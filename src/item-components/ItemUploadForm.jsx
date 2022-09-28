import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import './ItemUploadForm.scoped.scss';
import UploadsTable from './UploadsTable';
import { selectToken } from '../store/auth/selectors';
import { selectFiles } from '../store/uploads/selectors';
import DragAndDrop from '../components/DragAndDrop';
import * as UploadTypes from '../store/uploads/types';


export default function ItemUploadForm() {
  const [files, setFiles] = useState([]);
  const [itemRevId, setItemRevId] = useState();
  const token = useSelector(selectToken);
  const activeRequest = useRef(null);
  const fileList = useSelector(selectFiles);
  const dispatch = useDispatch()
  
  const handleNewFiles = (addedFiles) => {
    const newFiles = [...files];

    for (let i = 0; i < addedFiles.length; i++) {
      const fileObj = {};
      fileObj.id = new Date().getTime() + '' + Math.floor(Math.random() * 10000)
      fileObj.fileRef = addedFiles[i];
      fileObj.fileName = addedFiles[i].name;
      fileObj.fileSize = addedFiles[i].size;
      fileObj.fileType = addedFiles[i].type;
      fileObj.bytesLoaded = 0;
      fileObj.completed = false;
      newFiles.push(fileObj);
    }

    setFiles(newFiles);
  };

  const handleFileInputChange = (evt) => {
    evt.preventDefault();
    handleNewFiles(evt.target.files);
  };

  const handleFileDel = (file) => {
    const updatedFiles = files.filter(f => f.id !== file.id)   
    setFiles(updatedFiles)
  }

  useEffect(() =>{
    if(fileList.length > 0){

      handleNewFiles(fileList);
      dispatch({ type: UploadTypes.CLEAR_FILE_LIST });
    }
  }, [fileList]);

  
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
        console.log('upload file function')
        const payload = new FormData();
        payload.append('file', file.fileRef);
          
        
          const config = {
            onUploadProgress: (progressEvent) => {
              file.bytesLoaded = Math.min(progressEvent.loaded, file.fileSize)
              setFiles([...files])
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              console.log(percentCompleted)
              
            },
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        
          
        
        if(!activeRequest.current){
          const req = axios.post(`https://api.repables.com/file/${itemRevId}`, payload, config);
          activeRequest.current = req;
          req.then(() => {
              file.completed = true;
              activeRequest.current = null;
              const newFiles = [...files];
              setFiles(newFiles);
          });
        }
       
    };

    // useEffect(()=> {
    //   const callback = () => {
          

    //   }
    //   document.addEventListener('click', callback);
    //   return () =>{
    //       document.removeEventListener('click', callback)
    //   }
    // }, []);

    useEffect(() => {
      console.log('use effect')
      const notCompleted = files.filter(file => !file.completed)
      if (notCompleted.length >= 1) {
          uploadFile(notCompleted[0])
      }
     
    }, [files]);
    
    return (
      <div className="item-upload-container">
          <UploadsTable files={files} handleFileDel={handleFileDel}/>
          <DragAndDrop />
      <form className="item-upload-form" onSubmit={handleFormSubmit}>
        <div className="form-row">
          <label htmlFor="file">Files</label>
          <input type="file" multiple name="file"  onChange={handleFileInputChange}/>
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
          <select id="license" name="license">
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
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
