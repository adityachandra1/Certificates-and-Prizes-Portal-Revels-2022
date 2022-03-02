import React from 'react'

const SubcategoryBox = (props) => {
  return (
    <div className="subcategories-box" id={props.selected}>{props.name}</div>
  )
}

export default SubcategoryBox