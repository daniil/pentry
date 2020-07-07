import React, { useState } from 'react';
import firebaseStore from '../../utils/firebaseStore';

const ProfilePictureUpload = ({ user }) => {
  const [previewFile, setPreviewFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageSelect = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      setPreviewFile(e.target.result);
    }
    reader.readAsDataURL(file);

    setSelectedFile(file);
  }

  const handleImageUpload = e => {
    e.preventDefault();
    const ext = selectedFile.name.split('.').slice(-1)[0];
    firebaseStore
      .uploadImage('avatars', `${user.authUser.uid}.${ext}`, selectedFile)
      .then(res => console.log('Upload res', res));
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