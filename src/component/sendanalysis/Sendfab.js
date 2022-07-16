import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import TabList from '../common/TabList';
import '../common/TabList.css';
import '../common/Title.css';
import moduleCss from './Sendfab.module.css';
import NetworkTable from './NetworkTable';
import SendfabNetwork from './SendfabNetwork';
import InterfaceChart from './InterfaceChart';
import LocalData from '../../db/Sendfab.json';
import LocalData_network from '../../db/SendfabNetwork.json';

const getDisplayLines = defaultLine => {
  const curLines = {
    H1: false,
    'H2/3': false,
    P: false,
  };
  defaultLine = defaultLine === undefined ? 'H1' : defaultLine;
  curLines[defaultLine] = true;
  return curLines;
};

const getDisplayYears = oldestYear => {
  const now = new Date();
  const thisYear = now.getFullYear();
  oldestYear = oldestYear === undefined ? thisYear - 1 : oldestYear;

  const curYears = [];
  for (let index = thisYear; index >= oldestYear; index--) {
    curYears.push(`${index}`);
  }
  return curYears;
};

const getDisplayMonths = (defaultMonth, oldestMonth) => {
  const now = new Date();
  const thisMonth = String(now.getMonth() + 1); // 월은 0~11월이므로 +1

  const curMonths = {};
  for (let index = 1; index <= 12; index++) {
    curMonths[String(index)] = false;
  }
  defaultMonth = defaultMonth === undefined ? thisMonth : defaultMonth;
  curMonths[defaultMonth] = true;
  return curMonths;
};

const getCurLine = defaultLine => {
  return defaultLine === undefined ? 'H1' : defaultLine;
};

const getCurYear = defaultYear => {
  const now = new Date();
  const thisYear = now.getFullYear();
  return defaultYear === undefined ? thisYear : defaultYear;
};

const getCurMonth = defaultMonth => {
  const now = new Date();
  const thisMonth = String(now.getMonth() + 1);
  return defaultMonth === undefined ? thisMonth : defaultMonth;
};

const Sendfab = () => {
  const [curLine, setCurLine] = useState(getCurLine('H1'));
  const [curYear, setCurYear] = useState(getCurYear());
  const [curMonth, setCurMonth] = useState(getCurMonth());

  const displayLines = getDisplayLines(curLine);
  const linkOfLines = {...displayLines};
  for (let key in linkOfLines) {
    linkOfLines[key] = '/sendanalysis/sendNetwork';
  }

  const displayYears = getDisplayYears();
  const linkOfYears = {...displayYears};
  for (let key in linkOfYears) {
    linkOfYears[key] = '/sendanalysis/sendNetwork';
  }

  const displayMonths = getDisplayMonths(curMonth);
  const linkOfMonths = {...displayMonths};
  for (let key in linkOfMonths) {
    linkOfMonths[key] = '/sendanalysis/sendNetwork';
  }

  useEffect(() => {
    console.log(curLine);
    console.log(curYear);
    console.log(curMonth);
  }, [curLine, curYear, curMonth]);
  const onSubmit = data => {
    setCurYear(data.target.value);
  };

  const response = LocalData;
  const response_network = LocalData_network; // server에 요청 후 json 타입으로 받음

  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/sendanalysis/network.png"></img>
        층/동간 반송량 Trend
      </h3>
      <div className={moduleCss.filter_wrapper}>
        {/* <div>
          <TabList styleName={'tab_list'} tabList={displayLines} links={linkOfLines} changeStateMethod={setCurLine} />
        </div> */}
        <div>
          <form className="year_list_wrapper">
            <select className="year_list" onChange={onSubmit} value={curYear}>
              {displayYears.map((year, index) => {
                return (
                  <option key={index} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </form>
          <TabList
            styleName={'tab_list {moduleCss.month_list}'}
            tabList={displayMonths}
            links={linkOfMonths}
            changeStateMethod={setCurMonth}
          />
        </div>
      </div>
      <div>
        <h2 style={{fontSize: 25, fontWeight: 'bold'}}>SITE A</h2>
        <section className={moduleCss.section_layout}>
          <SendfabNetwork data={response_network.SendfabNetwork_A} curLine={curLine} />
          <NetworkTable data={response.NetworkTable_A} />
        </section>
        <h2 style={{fontSize: 25, fontWeight: 'bold'}}>SITE B</h2>
        <section className={moduleCss.section_layout}>
          <SendfabNetwork data={response_network.SendfabNetwork_B} curLine={curLine} />
          <NetworkTable data={response.NetworkTable_B} />
        </section>
      </div>
      {/* <div>
        <section className={moduleCss.section_layout}>
          <InterfaceChart />
        </section>
      </div> */}
    </div>
  );
};

export default Sendfab;
