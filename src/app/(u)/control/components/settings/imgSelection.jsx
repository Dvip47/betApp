import React, { useState } from 'react';

const ImageUploadForm = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => prevImages.concat(filesArray));
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here.
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload Images:
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      </label>
      <div>
        <p>Image Previews:</p>
        {selectedImages.map((image, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img src={image} alt={`Selected ${index}`} style={{ width: '300px', height: 'auto', marginRight: '10px' }} />
            <button type="button" onClick={() => handleImageDelete(index)} className="del">Delete</button>
          </div>
        ))}
      </div>
    </form>
  );
};

export default ImageUploadForm;
