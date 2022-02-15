import React, {useState} from 'react';
import {Table} from 'antd';
import '../common/Table.css';
import 'antd/dist/antd.css';
import './NetworkTable.css';
import LocalData from '../../db/Sendfab.json';

const columns = [
  {
    title: 'Interface',
    dataIndex: 'interface',
    filters: [
      {
        text: '12(7F) - 13(3F)',
        value: '12(7F) - 13(3F)',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.interface.indexOf(value) === 0,
    sorter: (a, b) => a.interface.length - b.interface.length,
    sortDirections: ['descend'],
  },
  {
    title: 'From Line',
    dataIndex: 'fromLine',
    filters: [
      {
        text: '12',
        value: '12',
      },
      {
        text: '13',
        value: '13',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.fromLine.indexOf(value) === 0,
    sorter: (a, b) => a.fromLine.length - b.fromLine.length,
    sortDirections: ['descend'],
  },
  {
    title: 'From Floor',
    dataIndex: 'fromFloor',
    filters: [
      {
        text: '3',
        value: '3',
      },
      {
        text: '7',
        value: '7',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.fromFloor.indexOf(value) === 0,
    sorter: (a, b) => a.fromFloor.length - b.fromFloor.length,
    sortDirections: ['descend'],
  },
  {
    title: 'To Line',
    dataIndex: 'toLine',
    filters: [
      {
        text: '12',
        value: '12',
      },
      {
        text: '13',
        value: '13',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.toLine.indexOf(value) === 0,
    sorter: (a, b) => a.toLine.length - b.toLine.length,
    sortDirections: ['descend'],
  },
  {
    title: 'To Floor',
    dataIndex: 'toFloor',
    filters: [
      {
        text: '3',
        value: '3',
      },
      {
        text: '7',
        value: '7',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.toFloor.indexOf(value) === 0,
    sorter: (a, b) => a.toFloor.length - b.toFloor.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Org Line ID',
    dataIndex: 'orgLineId',
    filters: [
      {
        text: 'KFBC',
        value: 'KFBC',
      },
      {
        text: 'KFBE',
        value: 'KFBE',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.orgLineId.indexOf(value) === 0,
    sorter: (a, b) => a.orgLineId.length - b.orgLineId.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Count',
    dataIndex: 'count',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    sorter: (a, b) => a.count.length - b.count.length,
    sortDirections: ['descend'],
  },
];

const pagination = {
  defaultPageSize: 5,
};

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const NetworkTable = ({data}) => {
  const [pageSize, setPageSize] = useState(10);

  return (
    <article className="sendfab_table_layout">
      <h4>Sendfab Table</h4>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{defaultPageSize: pageSize}}
        onChange={onChange}
        size="small"
      />
    </article>
  );
};

export default NetworkTable;
