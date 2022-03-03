import React from 'react'
import SearchSubCategories from './components/SearchSubCategories'
import "./CSS/upload.css"

const Upload = () => {
  return (
    <div className="main-upload-container">
        {/* Left Component */}
        <SearchSubCategories />
        {/* Right Component */}
        <div className="upload-container"></div>
    </div>
  )
}

export default Upload