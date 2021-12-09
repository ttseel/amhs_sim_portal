import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import TabList from '../common/TabList';
import '../common/TabList.css';
import '../common/Title.css';
import moduleCss from './FromToTable.module.css';
import FromToTable from './FromToTable';
import FromToAnalysisApi from '../../api/flooranalysis/FromToAnalysisApi';
import {PropTypes} from 'prop-types';

const fromToAnalysisApi = new FromToAnalysisApi();

const getDisplaySites = defaultSite => {
  const curSites = {
    H1: false,
    'H2,3': false,
    P: false,
  };
  defaultSite = defaultSite === undefined ? 'H1' : defaultSite;
  curSites[defaultSite] = true;
  return curSites;
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

const getCurSite = defaultSite => {
  return defaultSite === undefined ? 'H1' : defaultSite;
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

const makeSearchKey = (site, year, month) => {
  return site + '_' + year + '_' + month;
};

const isExistInObject = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

const FromToAnalysis = () => {
  const [curSite, setCurSite] = useState(getCurSite('H1'));
  const [curYear, setCurYear] = useState(getCurYear());
  const [curMonth, setCurMonth] = useState(getCurMonth());

  const displaySites = getDisplaySites(curSite);
  const linkOfSites = {...displaySites};
  for (let key in linkOfSites) {
    linkOfSites[key] = '/flooranalysis/FromToAnalysis';
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

  const [displayLineCache, setDisplayLineCache] = useState({});

  const requestFromToData = async () => {
    if (
      displayLineCache === undefined ||
      isExistInObject(displayLineCache, makeSearchKey(curSite, curYear, curMonth))
    ) {
      console.log('aleady requested');
      return;
    }

    const res = await fromToAnalysisApi.readFromToTable(curSite, curYear, curMonth);
    return res;
  };

  const updateDisplayLines = response => {
    if (isExistInObject(displayLineCache, makeSearchKey(curSite, curYear, curMonth))) {
      console.log('find in cache');
    } else {
      response.then(result => {
        const newLines = {...displayLineCache};
        newLines[makeSearchKey(curSite, curYear, curMonth)] = result;
        setDisplayLineCache(newLines);
      });
    }
  };

  const displayFromToTableComponent = () => {
    if (displayLineCache[makeSearchKey(curSite, curYear, curMonth)] === undefined) {
      return <div style={{fontSize: 20}}>No data to display</div>;
    }

    const displayTarget = displayLineCache[makeSearchKey(curSite, curYear, curMonth)].data.line;
    console.log(displayTarget);
    return Object.keys(displayTarget).map((line, index) => {
      return (
        <section key={index} className={moduleCss.section_container}>
          <FromToTable
            title={line}
            header={displayTarget[line].header}
            rows={displayTarget[line].rows}
            downloadUrl={`${curSite}_${line}_${curYear}_${curMonth}`}
          />
        </section>
      );
    });
  };

  useEffect(() => {
    console.log('selected -> ' + `site: ${curSite}, year: ${curYear}, month: ${curMonth}`);

    const response = requestFromToData();
    updateDisplayLines(response);
  }, [curSite, curYear, curMonth]);
  const onSubmit = data => {
    setCurYear(data.target.value);
  };

  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/sendanalysis/from-to.png" alt="from-to.png" />
        From-To Analysis
      </h3>
      <div className={moduleCss.filter_wrapper}>
        <div>
          <TabList styleName={'tab_list'} tabList={displaySites} links={linkOfSites} changeStateMethod={setCurSite} />
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
      <div>{displayFromToTableComponent()}</div>
    </div>
  );
};

export default FromToAnalysis;
