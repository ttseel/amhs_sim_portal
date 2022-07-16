import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import moduleCss from './AdminHome.module.css';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import AdminNavigation from './AdminNavigation';
import AdminFrame from './AdminFrame';

const AdminHome = () => {
  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/admin/filter1.png" alt="filter.png"></img>
        <em>Admin</em>
      </h3>
      <main className={moduleCss.admin_home_wrapper}>
        <BrowserRouter>
          <AdminNavigation />
          <AdminFrame />
        </BrowserRouter>
      </main>
    </div>
  );
};

export default AdminHome;
