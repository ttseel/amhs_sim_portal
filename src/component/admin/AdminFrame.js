import React from 'react';
import {Route, Switch} from 'react-router-dom';
import moduleCss from './AdminHome.module.css';
import InstallFiles from './simulator/versionmgt/InstallFiles';
import AdminServerDashboard from './server/dashboard/AdminServerDashboard';
import SimEngines from './simulator/versionmgt/SimEngines';

const AdminFrame = () => {
  return (
    <div className={moduleCss.admin_frame_wrapper}>
      <Switch>
        <Route exact path="/">
          <SimEngines />
        </Route>
        <Route path="/admin/simulator/versionmgt/SimEngines">
          <SimEngines />
        </Route>
        <Route path="/admin/simulator/versionmgt/InstallFiles">
          <InstallFiles />
        </Route>
        <Route path="/admin/server/dashboard/AdminServerDashboard">
          <AdminServerDashboard />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminFrame;
