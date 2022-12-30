import React from 'react';

export default function UploadsTable({ files }) {
  return (
    <div>
      <h1 className="table-header">Item Table</h1>
      <div >
        <table  >
          <tbody >
            {files.map((file) => (
              <tr key={file.id} >
                <td>{file.fileName}</td>
                <td>{file.fileSize}</td>
                <td>{file.fileType}</td>
                <td style={{width: '200px'}}>
                  <div style={{
                    background: `linear-gradient(to right, 
                      #333, 
                      #333 ${Math.round(file.bytesLoaded / file.fileSize * 100)}%, 
                      #eee ${Math.round(file.bytesLoaded / file.fileSize * 100)}%`
                    }}>
                  
                    <div style={{ textAlign: 'center', color:'#fff', mixBlendMode: 'difference'}}>{Math.round(file.bytesLoaded / file.fileSize * 100)}%</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
     
    </div>
  );
}
