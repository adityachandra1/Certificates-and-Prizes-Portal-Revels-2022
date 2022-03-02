import React from "react";

const PreviewRow = (props) => {
  return (
    <div className="preview-table-content">
      <div className="table-row-content">{props.name}</div>
      <div className="table-row-content">{props.designation}</div>
      <div className="">
          <a href="" className="show-preview">Show Preview</a>
      </div>
    </div>
  );
};

export default PreviewRow;
