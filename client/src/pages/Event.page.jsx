import React from 'react'
import { useState } from 'react'
import "./CSS/event.css"

const Event = () => {
   const [file, setFile] = useState(null);
   const handleClick = async () =>{
       console.log(file);
       alert("Your file has been uploaded!")
       //no idea
       document.write(file.name)
   }

  return (
    <div>
        <div className="event-container">
            <h1>Heading</h1>
            <input type="file" onChange={(e) => {
                setFile(e.target.files[0])
            }} />
            <button onClick={handleClick}>Submit</button>
        </div>
    </div>
  )
}

export default Event