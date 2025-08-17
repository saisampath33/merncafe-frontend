import React, { useState } from "react";
import axios from "axios";

export default function ImageUpload() {
const [file, setFile] = useState(null);
const [uploading, setUploading] = useState(false);
const [imageUrl, setImageUrl] = useState("");

const handleChange = (e) => {
setFile(e.target.files[0]);
};

const handleUpload = async () => {
if (!file) return alert("Please select an image");

const formData = new FormData();
formData.append("image", file); // must match multer field

try {
    setUploading(true);
    const res = await axios.post("http://localhost:3080/api/upload", formData);

    console.log("Upload Success Response:", res.data);

    if (res.data?.imageUrl) {
    setImageUrl(res.data.imageUrl);
    alert("Upload successful!");
    } else {
    throw new Error("No image URL returned from backend");
    }
} catch (err) {
    console.error("Upload failed:", err.response?.data || err.message);
    alert("Upload failed");
} finally {
    setUploading(false);
}
};

return (
<div style={{ padding: "20px", border: "1px solid #ddd" }}>
    <input type="file" onChange={handleChange} accept="image/*" />
    <button onClick={handleUpload} disabled={uploading}>
    {uploading ? "Uploading..." : "Upload"}
    </button>
    {imageUrl && (
    <div>
        <p>Uploaded Image:</p>
        <img src={imageUrl} alt="Uploaded" style={{ width: "200px", marginTop: "10px" }} />
    </div>
    )}
</div>
);
}
