import React, { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [singleItem, setSingleItem] = useState(null);
  const [multiItem, setMultiItem] = useState([]);
  const [multiBtnSelect, setMutliBtnSelect] = useState(false);

  function handleSingleClick(getItemId) {
    if (multiBtnSelect) {
      setSingleItem(null);
      const ar = [...multiItem];
      if (ar.includes(getItemId)) {
        // remove the item
        setMultiItem(ar.filter((item) => item !== getItemId));
      } else {
        // add the item
        setMultiItem([...ar, getItemId]);
      }
    } else {
      // single select mode
      setSingleItem(getItemId);
    }
  }

  function handleMultiSelectionBtn() {
    setMutliBtnSelect(!multiBtnSelect);
  }

  return (
    <div className="accordian-section">
      <h1 style={{ color: "purple" }}>Accordian Example</h1>
      <button id="multiBtn" onClick={() => handleMultiSelectionBtn()}>
        Enable Multi Selection
      </button>
      {data && data.length > 0 ? (
        data.map((dataItem, key) => {
          return (
            <div
              className="container"
              onClick={() => handleSingleClick(dataItem.id)}
              key={dataItem.id}
            >
              <div className="title">{dataItem?.question}</div>
              <span className="plusIcon">+</span>
              {multiBtnSelect && multiItem.includes(dataItem.id) ? (
                <div> {dataItem.answer} </div>
              ) : singleItem && singleItem === dataItem.id ? (
                <div> {dataItem.answer} </div>
              ) : null}
            </div>
          );
        })
      ) : (
        <div>Data is not found!</div>
      )}
    </div>
  );
}
