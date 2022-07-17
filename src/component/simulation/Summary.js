import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import Reservation from './Reservation';
import ScenarioTable from './ScenarioTable';
import {readCurrentRunningApi, readReservedScenarioApi} from '../../api/simulation/SimulationApis';
import ServerStatusBoard from './ServerStatusBoard';

const mockServerInfos = [
  {
    key: '1',
    serverName: 'Server #1',
    displayName: 'Easy',
    status: 'success',
    running: 4,
    cpu: 68,
    ram: 64,
  },
  {
    key: '2',
    serverName: 'Server #2',
    displayName: 'Easy',
    status: 'success',
    running: 5,
    cpu: 65,
    ram: 73,
  },
  {
    key: '3',
    serverName: 'Server #3',
    displayName: 'Busy',
    status: 'exception',
    running: 7,
    cpu: 87,
    ram: 89,
  },
];

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
        server: 1,
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

const Summary = () => {
  const [currentUser, setCurrentUser] = useState('ADMIN');
  const [serverInfos, setServerInfos] = useState({});
  const [currentRunning, setCurrentRunning] = useState();
  const [reserved, setReserved] = useState();

  useEffect(() => {
    // setServerInfos(prev => mockServerInfos);

    readCurrentRunningApi('all').then(response => {
      console.log('readCurrentRunningApi(all): ', response.data);
      setCurrentRunning(response.data);
    });

    readReservedScenarioApi('all').then(response => {
      console.log('readReservedScenarioApi(all): ', response.data);
      setReserved(response.data);
    });
  }, []);

  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/simulation/simboard.png"></img>
        <em>Summary</em>
        <section>
          <ServerStatusBoard serverInfos={mockServerInfos} />
        </section>
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
      </h3>
    </div>
  );
};

export default Summary;
