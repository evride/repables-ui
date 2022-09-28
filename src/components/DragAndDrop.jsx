import React, {useEffect} from 'react';
import * as UploadTypes from '../store/uploads/types';
import { useSelector, useDispatch } from 'react-redux';
import { selectDropDepth } from '../store/uploads/selectors';


function DragAndDrop () {

    const dispatch = useDispatch();
    
   

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();

    
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'none';
    
    dispatch({ type: UploadTypes.SET_IN_DROP_ZONE, inDropZone: false })
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: UploadTypes.SET_IN_DROP_ZONE, inDropZone: true });
  };

  const handleDrop = (e)=> {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];

    if (files && files.length > 0) {
    //   const existingFiles = fileList.map(f => f.name)
    //   files = files.filter(f => !existingFiles.includes(f.name))

      dispatch({ type: UploadTypes.ADD_FILE_TO_LIST, files });
      dispatch({ type: UploadTypes.SET_IN_DROP_ZONE, inDropZone: false });
    }
  };

    useEffect(()=> {
        
        document.querySelector('.app').addEventListener('drop', handleDrop);
        document.querySelector('.app').addEventListener('dragover', handleDragOver);
        document.querySelector('.app').addEventListener('dragenter', handleDragEnter);
        document.querySelector('.app').addEventListener('dragleave', handleDragLeave);
        return () =>{
            document.querySelector('.app').removeEventListener('drop', handleDrop)
            document.querySelector('.app').removeEventListener('dragover', handleDragOver);
            document.querySelector('.app').removeEventListener('dragenter', handleDragEnter);
            document.querySelector('.app').removeEventListener('dragleave', handleDragLeave);
        }
    }, []);

  return (
    <>
    </>
  );
};

export default DragAndDrop;