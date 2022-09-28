import React, { useEffect, useState } from 'react';
import './UploadsTable.scoped.scss';

export default function UploadsTable({ files, handleFileDel }) {
  console.log(files);
 
  

  
  return (
    <div>

      <h4>Files</h4>
      <table className="uploads-table">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Size</th>
            <th>Type</th>
            <th>Progress</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>{file.fileName}</td>
              <td>{file.fileSize}</td>
              <td>{file.fileType}</td>
              <td>{file.bytesLoaded}</td>
              <td><button type="button" onClick={() => handleFileDel(file)}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
