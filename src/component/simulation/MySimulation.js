import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import moduleCss from './MySimulation.module.css';
import {Button, Table, Tag, Space} from 'antd';
import ScenarioTable from './ScenarioTable';
import MyHistoryTable from './MyHistoryTable';
import {readCurrentRunningApi, readReservedScenarioApi, readMyHistoryApi} from '../../api/simulation/SimulationApis';
import {readUserNameByIp, updateUserName} from '../../api/auth/AuthApis';

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
  /*
    Change User button
  */
  const changeUserButtonProps = {
    type: 'primary',
    style: {
      color: 'white',
      background: 'green',
      borderColor: 'green',
    },
  };

  const handleChange = () => {
    const newUser = prompt('Please enter your name', user);
    if (newUser != null) {
      setUser(newUser);
      updateUserName(newUser, ip).then(response => {
        if (response === true) {
          // setUser(newUser);
        }
      });
    }
  };

  const [ip, setIp] = useState();
  const [user, setUser] = useState();
  const [currentRunning, setCurrentRunning] = useState();
  const [reserved, setReserved] = useState();
  const [myHistory, setMyHistory] = useState();
  useEffect(() => {
    readUserNameByIp().then(response => {
      setIp(response.data.ip);
      if (response.data.userName !== undefined && response.data.userName !== null) {
        setUser(prev => response.data.userName);
      }
    });
  }, []);

  useEffect(() => {
    readCurrentRunningApi(user).then(response => {
      console.log(`readCurrentRunningApi(${user}): `, response.data);
      setCurrentRunning(response.data);
    });

    readReservedScenarioApi(user).then(response => {
      console.log(`readReservedScenarioApi(${user}): `, response.data);
      setReserved(prev => response.data);
    });

    readMyHistoryApi(user).then(response => {
      console.log(`readMyHistoryApi(${user}): `, response.data);
      setMyHistory(response.data);
    });
  }, [user]);

  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/simulation/mysim.png"></img>
        <em>My Simulation</em>
      </h3>
      <section>
        <div className={moduleCss.change_user_container}>
          <h4 style={{fontSize: 25}}>Current running</h4>
          <Button {...changeUserButtonProps} onClick={() => handleChange()}>
            Change User
          </Button>
        </div>
        <ScenarioTable currentUser={user} data={currentRunning} setData={setCurrentRunning} />
        {/* <ScenarioTable currentUser={user} data={mockDataCurrentRunning} setData={setCurrentRunning} /> */}
      </section>
      <section>
        <h4 style={{fontSize: 25}}>Reserved</h4>
        <ScenarioTable currentUser={user} data={reserved} setData={setReserved} />
        {/* <ScenarioTable currentUser={user} data={mockDataReserved} setData={setCurrentRunning} /> */}
      </section>
      <section>
        <h4 style={{fontSize: 25}}>My History</h4>
        <MyHistoryTable currentUser={user} data={myHistory} setData={setMyHistory} />
        {/* <MyHistoryTable currentUser={user} data={mockDataHistory} setData={setMyHistory} /> */}
      </section>
    </div>
  );
};

export default MySimulation;
