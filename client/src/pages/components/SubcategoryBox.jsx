import { Button } from "antd";
import React from "react";

const SubcategoryBox = (props) => {
  return (
    <Button
      className="subcategories-box"
      id={props.selected}
      onClick={props.onselectCategory}
      value={props.value}
    >
      {props.name}
    </Button>
  );
};

export default SubcategoryBox;
