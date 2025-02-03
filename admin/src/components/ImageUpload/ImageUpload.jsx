import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      // Send the image to the backend
      const response = await axios.post("/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Set the image URL
      setImage(response.data.imageUrl);
      onImageUpload(response.data.imageUrl); // Pass the URL to the parent component
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} disabled={loading} />
      {loading && <p>Uploading...</p>}
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: "100%" }} />}
    </div>
  );
};

export default ImageUpload;
