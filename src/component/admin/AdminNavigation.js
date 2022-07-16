import React from 'react';
import {Link} from 'react-router-dom';
import moduleCss from './AdminHome.module.css';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import SimEngines from './simulator/versionmgt/SimEngines';
import InstallFiles from './simulator/versionmgt/InstallFiles';

const AdminNavigation = () => {
  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const {SubMenu} = Menu;

  // submenu keys of first level
  const rootSubmenuKeys = ['sub1', 'sub2'];
  return (
    <nav className={moduleCss.admin_navigator_wrapper}>
      {' '}
      {/* <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{width: 256}}> */}
      <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Simulator">
          <Menu.Item key="1">
            <Link to="/admin/simulator/versionmgt/SimEngines">Web Simulation Engines</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/simulator/versionmgt/InstallFiles">Install Files</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<SettingOutlined />} title="Server">
          <Menu.Item key="3">
            <Link to="/admin/server/dashboard/AdminServerDashboard">Dashboard</Link>
          </Menu.Item>

          {/* 서브메뉴 안에 서브메뉴 가능 */}
          {/* <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="3">Option 7</Menu.Item>
          <Menu.Item key="4">Option 8</Menu.Item>
        </SubMenu> */}
        </SubMenu>
      </Menu>
    </nav>
  );
};

export default AdminNavigation;
