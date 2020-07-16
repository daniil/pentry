import React, { useState } from 'react';
import firebaseStore from '../../utils/firebaseStore';

const ProfilePictureUpload = ({ user }) => {
  const [previewFile, setPreviewFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageSelect = e => {
    if (!e.target.files.length) {
      setPreviewFile(null);
      setSelectedFile(null);
      return;
    };

    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      setPreviewFile(e.target.result);
    }
    reader.readAsDataURL(file);

    setSelectedFile(file);
  }

  const generateAvatarProps = fileObj => {
    const filePathArr = fileObj.filePath.split('.');
    const getResizedFilePath = res => `${filePathArr[0]}_${res}.${filePathArr[1]}`;
    return {
      avatar: getResizedFilePath('100x100'),
      avatarFull: getResizedFilePath('600x600')
    };
  }

  const handleImageUpload = e => {
    e.preventDefault();
    const ext = selectedFile.name.split('.').slice(-1)[0];
    firebaseStore
      .uploadImage('avatars', `${user.authUser.uid}.${ext}`, selectedFile)
      .then(res => {
        const avatarObj = generateAvatarProps(res);
        firebaseStore
          .updateUserDetails(user.authUser.uid, avatarObj)
          .then(() => user.updateAvatar({
            ...avatarObj,
            updatedTimestamp: {
              seconds: Date.now() / 1000
            }
          }));
      });
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