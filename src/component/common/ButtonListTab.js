import React from "react";
import "./ButtonListTab.css";

const ListTab = () => {
  const nameList = ["H1", "H2/3", "P"];

  return (
    <ul className="ButtonListTab">
      {nameList.map((element) => {
        return (
          <li>
            <button>{element}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default ListTab;
