import React from 'react';
import 'antd/dist/antd.css';
import {Progress} from 'antd';
import moduleCss from './ServerStatus.module.css';

const ServerStatus = props => {
  const easyColor = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };
  const busyColor = {
    '0%': 'orange',
    '100%': 'red',
  };

  const getStatusColor = displayName => {
    return displayName === 'Easy' ? easyColor : busyColor;
  };

  return (
    <div className={moduleCss.server_status_component_wrapper}>
      <div>
        <Progress
          type="circle"
          status="NORMAL"
          width={85}
          strokeWidth={8}
          strokeColor={getStatusColor(props.serverInfo.displayName)}
          percent={99.9}
          format={() => props.serverInfo.displayName}
        />
      </div>
      <div className={moduleCss.server_status_textinfo_wrapper}>
        <h5>{props.serverInfo.serverName}</h5>
        <h6>Running {props.serverInfo.running}</h6>
        <h6>CPU {props.serverInfo.cpu}%</h6>
        <h6>RAM {props.serverInfo.ram}%</h6>
      </div>
    </div>
  );
};

export default ServerStatus;
