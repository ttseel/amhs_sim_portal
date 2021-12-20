import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import CurrentRunningTable from './CurrentRunningTable';
import ReservedTable from './ReservedTable';

const data_cur_running = [
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
    server: '#2',
  },
];

const data_cur_reserved = [
  {
    key: '1',
    no: 1,
    scenario: 'Scenario5',
    simulator: 'Simulator B',
    user: ['User2'],
    reservationDate: '2021-12-20 11:45:27',
  },
];

const data_cur_history = [
  {
    key: '1',
    no: 1,
    scenario: 'History Scenario1',
    simulator: 'Simulator A',
    user: ['User2'],
    startDate: '2021-12-13 11:45:27',
    endDate: '2021-12-13 14:52:59',
    terminateReason: ['NORMAL'],
  },
  {
    key: '2',
    no: 2,
    scenario: 'History Scenario2',
    simulator: 'Simulator C',
    user: ['User2'],
    startDate: '2021-12-14 15:32:57',
    endDate: '2021-12-14 16:21:42',
    terminateReason: ['ABNORMAL'],
  },
];

const columns_cur_history = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Scenario',
    dataIndex: 'scenario',
    key: 'scenario',
  },
  {
    title: 'Simulator',
    dataIndex: 'simulator',
    key: 'simulator',
  },

  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: 'Terminate Reason',
    dataIndex: 'terminateReason',
    key: 'terminateReason',
    render: terminateReason => (
      <>
        {terminateReason.map(reason => {
          let color = 'green';
          if (reason === 'ABNORMAL') {
            color = 'red';
          }
          return (
            <Tag color={color} key={reason}>
              {reason.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Result',
    dataIndex: 'result',
    key: 'result',
    render: () => (
      <Space size="middle">
        <a>Download</a>
      </Space>
    ),
  },
  {
    title: 'Delete',
    dataIndex: 'delete',
    key: 'delete',
    render: () => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const HistoryTable = ({data}) => {
  return (
    <div>
      <h4 style={{fontSize: 25}}>History</h4>
      <Table columns={columns_cur_history} dataSource={data} />
    </div>
  );
};

const MySimulation = () => {
  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/simulation/mysim.png"></img>
        <em>My Simulation</em>
      </h3>
      <section>
        <CurrentRunningTable data={data_cur_running} />
      </section>
      <section>
        <ReservedTable data={data_cur_reserved} />
      </section>
      <section>
        <HistoryTable data={data_cur_history} />
      </section>
    </div>
  );
};

export default MySimulation;
