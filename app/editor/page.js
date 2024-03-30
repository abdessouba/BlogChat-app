"use client";

import React, { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";

const Dome = () => {
  const [mdStr, setMdStr] = useState(
    `# This is a H1  \n## This is a H2  \n###### This is a H6`
  );
  return (
    <>
      <MarkdownEditor
        value={mdStr}
        onChange={(value, viewUpdate) => {
          setMdStr(value);
        }}
      />
      <App value={mdStr} /> {/* Pass mdStr as value prop to App */}
    </>
  );
};

function App({ value }) {
  return <MarkdownEditor.Markdown source={value} height="200px" />;
}

export default Dome; // Don't forget to export your component
