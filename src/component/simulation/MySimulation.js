import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import CurrentRunningTable from './CurrentRunningTable';
import ReservedTable from './ReservedTable';
import MyHistoryTable from './MyHistoryTable';
import {readCurrentRunningApi, readReservedScenarioApi, readMyHistoryApi} from '../../api/simulation/SimulationApis';

const mockDataCurrentRunning = [
  {
    key: '1',
    no: 1,
    scenario: 'Scenario2',
    simulator: 'Simulator B',
    user: ['User2'],
    startDate: '2021-12-20 11:45:27',
    runningTime: 57,
    currentRep: 1,
    requestRep: 2,
    serverNo: '#2',
  },
];

const mockDataReserved = [
  {
    key: '1',
    no: 1,
    scenario: 'Scenario5',
    simulator: 'Simulator B',
    user: ['User2'],
    reservationDate: '2021-12-20 11:45:27',
  },
];

const mockDataHistory = [
  {
    key: '1',
    no: 1,
    scenario: 'History Scenario1',
    simulator: 'Simulator A',
    user: ['User2'],
    startDate: '2021-12-13 11:45:27',
    endDate: '2021-12-13 14:52:59',
    terminationReason: ['NORMAL'],
  },
  {
    key: '2',
    no: 2,
    scenario: 'History Scenario2',
    simulator: 'Simulator C',
    user: ['User2'],
    startDate: '2021-12-14 15:32:57',
    endDate: '2021-12-14 16:21:42',
    terminationReason: ['ABNORMAL'],
  },
];

const MySimulation = () => {
  const [currentUser, setCurrentUser] = useState('ADMIN');
  const [currentRunning, setCurrentRunning] = useState();
  const [reserved, setReserved] = useState();
  const [myHistory, setMyHistory] = useState();
  useEffect(() => {
    readCurrentRunningApi(currentUser).then(response => {
      console.log(`readCurrentRunningApi(${currentUser}): `, response.data);
      setCurrentRunning(response.data);
    });

    readReservedScenarioApi(currentUser).then(response => {
      console.log(`readReservedScenarioApi(${currentUser}): `, response.data);
      setReserved(response.data);
    });

    readMyHistoryApi(currentUser).then(response => {
      console.log(`readMyHistoryApi(${currentUser}): `, response.data);
      setMyHistory(response.data);
    });
  }, []);

  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/simulation/mysim.png"></img>
        <em>My Simulation</em>
      </h3>
      <section>
        <CurrentRunningTable currentUser={currentUser} data={currentRunning} setData={setCurrentRunning} />
      </section>
      <section>
        <ReservedTable currentUser={currentUser} data={reserved} setData={setReserved} />
      </section>
      <section>
        <MyHistoryTable currentUser={currentUser} data={myHistory} setData={setMyHistory} />
      </section>
    </div>
  );
};

export default MySimulation;
