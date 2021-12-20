import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Tag, Space} from 'antd';
import Reservation from './Reservation';

const columns_cur_reserved = [
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
    dataIndex: 'user',
    key: 'user',
    render: user => (
      <>
        {user.map(user => {
          let color = user.length > 5 ? 'geekblue' : 'orange';
          if (user === 'User2') {
            color = 'geekblue';
          }
          return (
            <Tag color={color} key={user}>
              {user.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Reservation Date',
    dataIndex: 'reservationDate',
    key: 'reservationDate',
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

const ReservedTable = ({data}) => {
  return (
    <div>
      <h4 style={{fontSize: 25}}>Reserved</h4>
      <Table columns={columns_cur_reserved} dataSource={data} />
    </div>
  );
};

export default ReservedTable;
