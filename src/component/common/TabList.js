import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TabList.css";
import TestComponent from "../../TestComponent";

const EachTab = ({ tabName, link, selectTab, changeTabMethod }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <li onClick={() => changeTabMethod(tabName)}>
      <Link className={`${selectTab ? "on" : "tab_list"}`} to={link}>
        {tabName}
      </Link>
    </li>
  );
};

const TabList = ({ styleName, tabList }) => {
  const [tabNames, seTabNames] = useState(tabList);
  const [style, setStyleName] = useState(styleName);

  const initSelectTabs = () => {
    const selectTab = {};
    tabNames.map((eachTab) => {
      selectTab[eachTab] = false;
    });

    return selectTab;
  };

  const [tabState, setTabState] = useState(initSelectTabs());

  const changeTabState = (tabName) => {
    const newTabState = initSelectTabs();
    newTabState[tabName] = !newTabState[tabName];
    setTabState(newTabState);
  };

  return (
    <ul className={style}>
      {tabNames.map((eachTab, index) => {
        // console.log(index);
        return (
          <EachTab
            tabName={eachTab}
            link="/sendanalysis/sendNetwork"
            selectTab={tabState[eachTab]}
            changeTabMethod={changeTabState}
          ></EachTab>
        );
      })}
    </ul>
  );
};

export default TabList;
