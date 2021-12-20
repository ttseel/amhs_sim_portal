import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import Reservation from './Reservation';
import CurrentRunningTable from './CurrentRunningTable';
import ReservedTable from './ReservedTable';

const data_cur_running = [
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
    server: '#1',
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
    server: '#2',
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
    server: '#1',
  },
];

const data_cur_reserved = [
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

const SimBoard = () => {
  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/simulation/simboard.png"></img>
        <em>Sim Board</em>
        <section>
          <CurrentRunningTable data={data_cur_running} />
        </section>
        <section>
          <ReservedTable data={data_cur_reserved} />
        </section>
      </h3>
    </div>
  );
};

export default SimBoard;
