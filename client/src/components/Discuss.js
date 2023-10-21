import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";
import "quill/dist/quill.snow.css"; // Import Quill's CSS
import Quill from "quill";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

let quillInitialized = false;
const API_URL = process.env.API_URL;

export default function TextareaWithRichTextEditor() {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!quillInitialized && editor == null) {
      const quill = new Quill("#quill-container", {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: "1" }, { header: "2" }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["image"],
            ["clean"],
            [{ "size": ['medium', 'small', "large"] }]
          ],
        },
      });

      setEditor(quill);
      quillInitialized = true;
    }
  }, []);

  const navigate = useNavigate();
  const handleSave = () => {
    const richText = editor.root.innerHTML;
  
    // Create a JSON object with the rich text content
    const data = { richText };
  
    // Send a POST request using Axios
    axios.post(`${API_URL}/discuss`, data)
    .then((response) => {
        // Handle successful response (e.g., show a success message)
        console.log('Rich text content stored successfully.');
        editor.root.innerHTML = '';
        navigate(`${API_URL}/posts/${response.data.postId}`);
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error('Failed to store rich text content:', error);
      });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-3/4">
        <div className="mb-4">
          <Input size="lg" label="Heading" />
        </div>
        <div
          id="quill-container"
          style={{ minHeight: "100px", maxHeight: "300px", overflowY: "auto" }}
        ></div>
      </div>
      <div className="flex gap-2 mt-2">
        <Button size="sm" color="red" variant="text" className="rounded-md">
          Cancel
        </Button>
        <Button size="sm" className="rounded-md" onClick={handleSave}>
          Post
        </Button>
      </div>
    </div>
  );
}
