import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import Reservation from './Reservation';
import CurrentRunningTable from './CurrentRunningTable';
import ReservedTable from './ReservedTable';
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
    key: '1',
    no: 1,
    scenario: 'Scenario1',
    simulator: 'Simulator A',
    user: ['User1'],
    startDate: '2021-12-20 11:32:54',
    runningTime: 42,
    currentRep: 3,
    requestRep: 4,
    serverNo: '#1',
  },
  {
    key: '2',
    no: 2,
    scenario: 'Scenario2',
    simulator: 'Simulator B',
    user: ['User2'],
    startDate: '2021-12-20 11:45:27',
    runningTime: 57,
    currentRep: 1,
    requestRep: 2,
    serverNo: '#2',
  },
  {
    key: '3',
    no: 3,
    scenario: 'Scenario3',
    simulator: 'Simulator C',
    user: ['User3'],
    startDate: '2021-12-20 15:23:42',
    runningTime: 75,
    currentRep: 3,
    requestRep: 5,
    serverNo: '#1',
  },
];

const mockDataReserved = [
  {
    key: '1',
    no: 1,
    scenario: 'Scenario1',
    simulator: 'Simulator A',
    user: ['User1'],
    reservationDate: '2021-12-20 11:32:54',
  },
  {
    key: '2',
    no: 2,
    scenario: 'Scenario2',
    simulator: 'Simulator B',
    user: ['User2'],
    reservationDate: '2021-12-20 11:45:27',
  },
  {
    key: '3',
    no: 3,
    scenario: 'Scenario3',
    simulator: 'Simulator C',
    user: ['User3'],
    reservationDate: '2021-12-20 15:23:42',
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
          <CurrentRunningTable currentUser={currentUser} data={currentRunning} setData={setCurrentRunning} />
        </section>
        <section>
          <ReservedTable currentUser={currentUser} data={reserved} setData={setReserved} />
        </section>
      </h3>
    </div>
  );
};

export default Summary;
