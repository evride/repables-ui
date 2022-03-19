import React from 'react';

export default function UploadsTable({ files }) {
  console.log(files);

  return (
    <div>
      <h1>itemTable</h1>
      <tr>
        {files.map((file) => (
          <div key={file}>
            <td>{file.fileName}</td>
            <td>{file.fileSize}</td>
            <td>{file.fileType}</td>
          </div>
        ))}
      </tr>

    </div>
  );
}
