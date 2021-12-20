import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import Reservation from './Reservation';

const columns_cur_running = [
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
    title: 'User',
    key: 'user',
    dataIndex: 'user',
    render: user => (
      <>
        {user.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'orange';
          if (tag === 'User2') {
            color = 'geekblue';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'Running Time',
    dataIndex: 'runningTime',
    key: 'runningTime',
  },
  {
    title: 'Current Rep',
    dataIndex: 'currentRep',
    key: 'currentRep',
  },
  {
    title: 'Request Rep',
    dataIndex: 'requestRep',
    key: 'requestRep',
  },
  {
    title: 'Server',
    dataIndex: 'server',
    key: 'server',
  },
  {
    title: 'Terminate',
    key: 'terminate',
    render: () => (
      <Space size="middle">
        <a>Terminate</a>
      </Space>
    ),
  },
];

const CurrentRunningTable = ({data}) => {
  return (
    <div>
      <h4 style={{fontSize: 25}}>Current running</h4>
      <Table columns={columns_cur_running} dataSource={data} />
    </div>
  );
};

export default CurrentRunningTable;
