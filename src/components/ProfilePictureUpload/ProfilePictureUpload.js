import React, { useState } from 'react';

const ProfilePictureUpload = () => {
  const [previewFile, setPreviewFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageSelect = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    setSelectedFile(file);
    
    reader.onload = function(e) {
      setPreviewFile(e.target.result);
    }

    reader.readAsDataURL(file);
  }

  const handleImageUpload = () => {
    //TODO: Manage Firebase Upload
  }

  return (
    <>
      <h3>Upload Profile Picture</h3>
      {previewFile
        && <img width="250" src={previewFile} alt={selectedFile.name} />}
      <input
        type="file"
        id="profilePic"
        name="profilePic"
        onChange={handleImageSelect} />
      <button type="submit" onClick={handleImageUpload}>
        Update Profile Picture
      </button>
    </>
  )
}

export default ProfilePictureUpload;