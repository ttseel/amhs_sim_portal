import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import TabList from '../common/TabList';
import '../common/TabList.css';
import '../common/Title.css';
import './Sendfab.css';
import SendfabTable from './SendfabTable';

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
  const displayYears = getDisplayYears();
  const displayMonths = getDisplayMonths(curMonth);

  useEffect(() => {
    console.log(curLine);
    console.log(curYear);
    console.log(curMonth);
  }, [curLine, curYear, curMonth]);
  const onSubmit = data => {
    setCurYear(data.target.value);
  };

  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/sendanalysis/network.png"></img>
        층/동간 반송량 Trend
      </h3>
      <div>
        <TabList styleName={'tab_list'} tabList={displayLines} changeStateMethod={setCurLine} />
      </div>
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
        <TabList styleName={'tab_list month_list'} tabList={displayMonths} changeStateMethod={setCurMonth} />
      </div>
      <div>
        <SendfabTable />
      </div>
    </div>
  );
};

export default Sendfab;
