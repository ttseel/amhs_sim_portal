import React from "react";
import TabList from "../common/TabList";
import "../common/TabList.css";
import "../common/Title.css";

const Sendfab = () => {
  const lineList = ["H1", "H2/3", "P"];
  const monthList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  return (
    <article>
      <h3 className="sub_title">
        <img src="/component/sendanalysis/network.png"></img>
        층/동간 반송량 Trend
      </h3>
      <div>
        <TabList styleName={"tab_list"} tabList={lineList} />
      </div>
      <div>
        <TabList styleName={"tab_list"} tabList={monthList} />
      </div>
    </article>
  );
};

export default Sendfab;
