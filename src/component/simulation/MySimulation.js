import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import ScenarioTable from './ScenarioTable';
import MyHistoryTable from './MyHistoryTable';
import {readCurrentRunningApi, readReservedScenarioApi, readMyHistoryApi} from '../../api/simulation/SimulationApis';

const mockDataCurrentRunning = [
  {
    key: 72,
    group: 'Group1',
    scenario: 'Scenario AS-IS',
    simulator: 'ABC',
    version: '1.0.0',
    status: 'RUNNING',
    user: ['ADMIN'],
    replication: [
      {
        key: 42,
        randomSeed: 1,
        status: 'END',
        reason: ['NORMAL'],
        server: '1',
        start: '2022-06-24 14:12:00',
      },
      {
        key: 43,
        randomSeed: 2,
        status: 'RUNNING',
        reason: ['-'],
        server: 2,
        start: '2022-06-24 15:12:00',
      },
    ],
  },
  {
    key: 73,
    group: 'Group1',
    scenario: 'Scenario TO-BE',
    simulator: 'ABC',
    version: '1.0.0',
    status: 'RUNNING',
    user: ['ADMIN'],
    replication: [
      {
        key: 44,
        randomSeed: 1,
        status: 'END',
        reason: ['NORMAL'],
        server: 1,
        start: '2022-06-24 15:12:00',
      },
      {
        key: 45,
        randomSeed: 2,
        status: 'RUNNING',
        reason: ['-'],
        server: 2,
        start: '2022-06-24 17:12:00',
      },
    ],
  },
];

const mockDataReserved = [
  {
    key: 74,
    group: 'Group2',
    scenario: 'Scenario',
    simulator: 'DEF',
    version: '1.0.0',
    status: 'RESERVED',
    user: ['ADMIN'],
    replication: [
      {
        key: 46,
        randomSeed: 1,
        status: 'RESERVED',
        reason: ['-'],
        server: 1,
        start: '',
      },
      {
        key: 47,
        randomSeed: 2,
        status: 'RESERVED',
        reason: ['-'],
        server: 2,
        start: '',
      },
    ],
  },
];

const mockDataHistory = [
  {
    key: 74,
    group: 'Group2',
    scenario: 'Scenario',
    simulator: 'DEF',
    version: '1.0.0',
    status: 'END',
    user: ['ADMIN'],
    replication: [
      {
        key: 46,
        randomSeed: 1,
        status: 'END',
        reason: ['NORMAL'],
        server: 1,
        start: '',
      },
      {
        key: 47,
        randomSeed: 2,
        status: 'END',
        reason: ['NORMAL'],
        server: 2,
        start: '',
      },
    ],
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
        <h4 style={{fontSize: 25}}>Current running</h4>
        <ScenarioTable currentUser={currentUser} data={currentRunning} setData={setCurrentRunning} />
        {/* <ScenarioTable currentUser={currentUser} data={mockDataCurrentRunning} setData={setCurrentRunning} /> */}
      </section>
      <section>
        <h4 style={{fontSize: 25}}>Reserved</h4>
        <ScenarioTable currentUser={currentUser} data={reserved} setData={setReserved} />
        {/* <ScenarioTable currentUser={currentUser} data={mockDataReserved} setData={setCurrentRunning} /> */}
      </section>
      <section>
        <h4 style={{fontSize: 25}}>My History</h4>
        <MyHistoryTable currentUser={currentUser} data={myHistory} setData={setMyHistory} />
        {/* <MyHistoryTable currentUser={currentUser} data={mockDataHistory} setData={setMyHistory} /> */}
      </section>
    </div>
  );
};

export default MySimulation;
