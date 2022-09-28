import React from 'react';
import { selectFiles } from '../store/uploads/selectors';
import DragAndDrop from '../components/DragAndDrop';
import { useSelector } from 'react-redux';

export default function HomePage() {

  const fileList = useSelector(selectFiles);  
  
  return (
    <div>
      <h4>homepage</h4>
      <p>React drag and drop component</p>
      
    </div>
  );
}
