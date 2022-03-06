import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './TabList.css';

const EachTab = ({tabName, link, selectTab, changeTabMethod}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <li key={tabName} onClick={() => changeTabMethod(tabName)}>
      <Link className={`${selectTab ? 'on' : 'tab_list'}`} to={link}>
        {tabName}
      </Link>
    </li>
  );
};

const TabList = ({styleName, tabList, links, changeStateMethod}) => {
  const [tabNames, seTabNames] = useState(Object.keys(tabList));

  const initSelectTabs = () => {
    const selectTab = {};
    tabNames.map(eachTab => {
      selectTab[eachTab] = false;
    });

    return selectTab;
  };

  const [tabState, setTabState] = useState(tabList);

  const changeTabState = tabName => {
    const newTabState = initSelectTabs();
    newTabState[tabName] = !newTabState[tabName];
    setTabState(newTabState);
    changeStateMethod(tabName);
  };
  return (
    <ul className={styleName}>
      {tabNames.map((eachTab, index) => {
        return (
          <EachTab
            key={index}
            tabName={eachTab}
            link={links[eachTab]}
            selectTab={tabState[eachTab]}
            changeTabMethod={changeTabState}
          ></EachTab>
        );
      })}
    </ul>
  );
};

export default TabList;
