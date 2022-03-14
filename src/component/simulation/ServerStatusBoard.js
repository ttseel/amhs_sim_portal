import React from 'react';
import ServerStatus from './ServerStatus';
import moduleCss from './ServerStatus.module.css';

const ServerStatusBoard = ({serverInfos}) => {
  return (
    <div>
      <h4 style={{fontSize: 25}}>Server Status</h4>
      <div className={moduleCss.server_status_board_wrapper}>
        {serverInfos.map(element => {
          return <ServerStatus key={element.key} serverInfo={element} />;
          // console.log(element);
        })}
      </div>
    </div>
  );
};

export default ServerStatusBoard;
