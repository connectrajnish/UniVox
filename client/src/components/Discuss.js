import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuWithCheckbox from "./MenuWithCheckbox";

const API_URL = process.env.API_URL;

export default function TextareaWithRichTextEditor() {
  const [content, setContent] = useState("");
  const [heading, setHeading] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const navigate = useNavigate();

  const handleSave = () => {
    if (
      heading.trim() === "" ||
      selectedItems.length === 0 ||
      content.trim() === ""
    ) {
      // Display an alert if any of the required fields are missing
      alert("Please fill in all fields.");
    } else {
      const richText = content;
      const category = selectedItems;
      const data = { heading, category, richText };
      console.log(data);
      axios
        .post(`${API_URL}/post/create-post`, data, {
          withCredentials: true, // Include credentials
        })
        .then((response) => {
          console.log("Post successfully.");
          setContent("");
          setHeading("");
          setSelectedItems([]);
          navigate(`${API_URL}/post/${response.data.postId}`);
        })
        .catch((error) => {
          console.error("Failed to post", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-3/4">
        <div className="mb-4">
          <Input
            size="lg"
            label="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <MenuWithCheckbox
            handleItemClick={handleItemClick}
            selectedItems={selectedItems}
          />
        </div>

        <div
          id="quill-container"
          className="min-h-[100px] max-h-[300px] overflow-y-auto"
        >
          <ReactQuill
            className="reactQuill"
            value={content}
            onChange={handleContentChange}
            placeholder="Type something..."
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                [{ header: "1" }, { header: "2" }],
                [{ align: [] }],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "link",
              "image",
              "align",
            ]}
          />
        </div>
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
