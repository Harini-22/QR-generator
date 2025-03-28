import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser"; // Safely parses HTML
import Header from "./Header";

const ViewText = () => {
  const { id } = useParams();
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/view/${id}`)
      .then((res) => {
        setHtmlContent(res.data); // Directly use the raw HTML string
      })
      .catch(() => setHtmlContent("<p>Error loading content</p>"));
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col gap-6 pt-10 items-center mx-auto bg-[#2e2e2e]">
      <Header/>
      <div className="bg-white p-6 shadow-lg rounded-lg w-[600px]">
        <div className="border p-4 rounded bg-gray-50">{parse(htmlContent)}</div>
      </div>
    </div>
  );
};

export default ViewText;
