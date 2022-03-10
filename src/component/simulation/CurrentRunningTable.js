import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Tag, Space, Modal} from 'antd';
import Reservation from './Reservation';
import {readCurrentRunningApi, stopSimulationApi} from '../../api/simulation/SimulationApis';

const CurrentRunningTable = ({currentUser, data, setData}) => {
  const columns_cur_running = [
    // {
    //   title: 'No',
    //   dataIndex: 'no',
    //   key: 'no',
    // },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
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
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'User',
      key: 'user',
      dataIndex: 'user',
      render: user => (
        <>
          {user.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'orange';
            if (tag === currentUser) {
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
      title: 'Start',
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
      dataIndex: 'executionServer',
      key: 'executionServer',
    },
    {
      title: 'Request Stop',
      key: 'stop',
      render: (text, record) => (
        <>
          <Space size="middle">
            <a style={{color: 'red'}} onClick={() => showRequestModal(record)}>
              Stop
            </a>
          </Space>
        </>
      ),
    },
  ];

  const modalTitle = 'Request Stop';
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState();
  const [recordNo, setRecordNo] = useState();
  const [recordUser, setRecordUser] = useState();
  const [recordSimulator, setRecordSimulator] = useState();
  const [recordGroup, setRecordGroup] = useState();
  const [recordScenario, setRecordScenario] = useState();

  const showRequestModal = record => {
    setRecordNo(record.no);
    setRecordUser(record.user);
    setRecordSimulator(record.simulator);
    setRecordGroup(record.group);
    setRecordScenario(record.scenario);
    setModalText(`Are you sure you want to stop the ${record.scenario} that ${record.user} has reserved?`);
    setVisible(true);
  };

  const showResultModal = (result, message) => {
    if (result === true) {
      Modal.success({
        content: message,
      });
    } else {
      Modal.error({
        content: message,
      });
    }
  };

  const uniqueSimRecordDto = new FormData();

  function handleOk() {
    setConfirmLoading(true);
    try {
      uniqueSimRecordDto.append('user', recordUser);
      uniqueSimRecordDto.append('simulator', recordSimulator);
      uniqueSimRecordDto.append('group', recordGroup);
      uniqueSimRecordDto.append('scenario', recordScenario);
      stopSimulationApi(uniqueSimRecordDto).then(response => {
        // status 200: 서버의 응답이 성공했다는 HTTP 상태 코드
        if (response.status === 200) {
          if (response.data.status === true) {
            showResultModal(response.data, `${recordScenario} stopped successfully`);
            removeRecordFromList();
          } else {
            showResultModal(response.data, `Stop request failed`);
          }
        } else {
          console.log('The request to stop the simualtion failed');
        }
      });
    } catch (error) {
      console.error(error);
    }
    setVisible(false);
    setConfirmLoading(false);
  }

  const handleCancel = () => {
    setVisible(false);
  };

  const removeRecordFromList = () => {
    const afterRemove = data.filter(element => {
      return element.no !== recordNo;
    });

    setData(afterRemove);
    console.log('Current running list after remove', afterRemove);
  };

  return (
    <div>
      <h4 style={{fontSize: 25}}>Current running</h4>
      <Table columns={columns_cur_running} dataSource={data} />
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default CurrentRunningTable;
