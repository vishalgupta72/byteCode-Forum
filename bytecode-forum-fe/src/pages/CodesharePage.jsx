import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

const CodesharePage = () => {
  const [code, setCode] = useState("");
  const [link, setLink] = useState("");
  const [expiryTime, setExpiryTime] = useState(null);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleShare = () => {
    // Simulate generating a unique link
    const uniqueLink = `https://techforum.com/code/${Math.random().toString(36).substr(2, 9)}`;
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    setLink(uniqueLink);
    setExpiryTime(expiry);

    // Simulate the expiry countdown
    setTimeout(
      () => {
        setLink(""); // Clear link after 24 hours
        alert("The link has expired.");
      },
      24 * 60 * 60 * 1000
    );
  };

  return (
    <div
      className="code-editor-container"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div className="flex flex-row justify-between text-xl">
        <h1>Share Your Code</h1>
        <h1>Expires in 24 hours</h1>
      </div>
      <MonacoEditor
        height="90vh" // Makes the editor take most of the screen
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{ selectOnLineNumbers: true }}
      />
      <button
        onClick={handleShare}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
        }}
      >
        Share Code
      </button>

      {link && (
        <div style={{ marginTop: "20px" }}>
          <p>
            Share this link:{" "}
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </p>
          <p>Expires at: {expiryTime && expiryTime.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CodesharePage;
