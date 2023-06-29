import '../App.css';
import React from "react";
import { useState } from "react";

const Image = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

  };

  return (
    <div>
      <form><label>Insert image: <input className='image-input' type="file" accept="image/*" onChange={handleImageUpload} /> </label></form>
      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
}

export default Image;