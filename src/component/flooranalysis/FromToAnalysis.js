import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import TabList from '../common/TabList';
import '../common/TabList.css';
import '../common/Title.css';
import './FromToTable.css';
import FromToTable from './FromToTable';

const getDisplayLines = defaultLine => {
  const curLines = {
    H1: false,
    'H2,3': false,
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

const FromToAnalysis = () => {
  const [curLine, setCurLine] = useState(getCurLine('H1'));
  const [curYear, setCurYear] = useState(getCurYear());
  const [curMonth, setCurMonth] = useState(getCurMonth());

  const displayLines = getDisplayLines(curLine);
  const linkOfLines = {...displayLines};
  for (let key in linkOfLines) {
    linkOfLines[key] = '/flooranalysis/FromToAnalysis';
  }

  const displayYears = getDisplayYears();
  const linkOfYears = {...displayYears};
  for (let key in linkOfYears) {
    linkOfYears[key] = '/flooranalysis/FromToAnalysis';
  }

  const displayMonths = getDisplayMonths(curMonth);
  const linkOfMonths = {...displayMonths};
  for (let key in linkOfMonths) {
    linkOfMonths[key] = '/flooranalysis/FromToAnalysis';
  }

  const [tableHeader, setTableHeader] = useState([]);
  const [tableData, setTableRows] = useState([]);

  useEffect(() => {
    console.log(curLine);
    console.log(curYear);
    console.log(curMonth);

    axios.get('http://localhost:3001/fromto?year=2021&month=10&site=H1').then(res => {
      setTableHeader(res.data[0].data.header);
      setTableRows(res.data[0].data.rows);
      console.log(res.data[0].data.rows);
    });

    // axios.get('http://localhost:3001/team').then(res => {
    //   setTableHeader(res.data.header);
    //   setTableRows(res.data.data);
    // });
  }, [curLine, curYear, curMonth]);
  const onSubmit = data => {
    setCurYear(data.target.value);
  };

  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/sendanalysis/from-to.png" alt="from-to.png 오류"></img>층 내 반송 From-To 분석
      </h3>
      <div className="filter_wrapper">
        <div>
          <TabList styleName={'tab_list'} tabList={displayLines} links={linkOfLines} changeStateMethod={setCurLine} />
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
          <TabList
            styleName={'tab_list month_list'}
            tabList={displayMonths}
            links={linkOfMonths}
            changeStateMethod={setCurMonth}
          />
        </div>
      </div>
      <div>
        <section className="section_layout">
          <FromToTable header={tableHeader} rows={tableData} />
        </section>
      </div>
    </div>
  );
};

export default FromToAnalysis;
