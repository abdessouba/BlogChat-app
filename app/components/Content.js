import React from 'react'
import "react-quill/dist/quill.snow.css";
import "./page.css"
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Content = ({value=null}) => {
  return (
    <ReactQuill className='content' readOnly value={value} modules={{toolbar: false}}/>
  )
}

export default Content