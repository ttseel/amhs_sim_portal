import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import moduleCss from './Reservation.module.css';
import 'antd/dist/antd.css';
import {Menu, Table} from 'antd';
import {MailOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons';

const Download = () => {
  const [current, setCurrent] = useState('AMHSSIM');

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(prev => e.key);
  };

  const columns = [
    {title: 'Version', dataIndex: 'version', key: 'version'},
    {title: 'Tags', dataIndex: 'tags', key: 'tags'},
    {title: 'Upload Date', dataIndex: 'uploadDate', key: 'uploadDate'},
    {
      title: 'Download',
      dataIndex: '',
      key: 'x',
      render: () => <a>Download</a>,
    },
  ];

  const mockdata = [
    {
      key: 1,
      version: 'v1.0.0',
      tags: 'Latest',
      uploadDate: '2022-02-24',
      description: '시뮬레이션 안정화',
    },
    {
      key: 2,
      version: 'v0.0.3',
      tags: '',
      uploadDate: '2022-01-12',
      description: '배속 향상',
    },
    {
      key: 3,
      version: 'v0.0.2',
      tags: '',
      uploadDate: '2021-12-01',
      description: '새로운 기능 추가',
    },
    {
      key: 4,
      version: 'v0.0.1',
      tags: '',
      uploadDate: '2021-10-12',
      description: '가독성 강화',
    },
  ];

  return (
    <section style={{fontSize: 20}} className={moduleCss.reservation_section_wrapper}>
      <h3 className="sub_title">
        <img src="/component/simulation/download.png" alt="download.png"></img>
        <em>Download</em>
      </h3>
      <Menu onClick={handleClick} style={{fontSize: 16}} selectedKeys={current} mode="horizontal">
        <Menu.Item key="AMHSSIM" icon={<MailOutlined />}>
          AMHS Sim UI
        </Menu.Item>
        <Menu.Item key="SeeFlow" icon={<AppstoreOutlined />}>
          SeeFlow
        </Menu.Item>

        {/* Link to 사용가능! */}
        {/* <Menu.Item key="alipay">
          <Link to="/flooranalysis/FromToAnalysis">From-To Analysis</Link>
        </Menu.Item> */}
      </Menu>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{margin: 0}}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={mockdata}
      />
    </section>
  );
};

export default Download;
