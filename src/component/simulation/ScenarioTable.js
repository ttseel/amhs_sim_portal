import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import {Space, Table, Tag, Modal} from 'antd';
import {stopSimulationApi} from '../../api/simulation/SimulationApis';

const ScenarioTable = ({currentUser, data, setData}) => {
  console.log('data:' + data);

  const expandedRowRender = (record, index, indent, expanded) => {
    // console.log(record);
    const columns_child = [
      {
        title: 'Random Seed',
        dataIndex: 'randomSeed',
        key: 'randomSeed',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Termination Reason',
        dataIndex: 'reason',
        key: 'reason',
        render: reason => (
          <>
            {reason.map(reason => {
              if (reason === '-') {
                return <div>-</div>;
              }

              let color = '';
              if (reason === 'NORMAL') {
                color = 'green';
              } else if (reason === 'ABNORMAL') {
                color = 'red';
              }

              return (
                <Tag color={color} key={reason}>
                  {reason.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Server',
        dataIndex: 'server',
        key: 'server',
      },
      {
        title: 'Start',
        dataIndex: 'start',
        key: 'start',
      },
    ];

    return (
      <div>
        <Table columns={columns_child} dataSource={record.replication} pagination={false} size={'large'} />
      </div>
    );
  };

  const columns_parent = [
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      title: 'Cancel',
      key: 'cancel',
      render: (text, record) => (
        <>
          <Space size="middle">
            <a style={{color: 'red'}} onClick={() => showRequestModal(record)}>
              Cancel
            </a>
          </Space>
        </>
      ),
    },
  ];

  const modalTitle = 'Request Cancel';
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
      <Table
        columns={columns_parent}
        expandable={{
          expandedRowRender,
        }}
        dataSource={data}
        size="middle"
      />
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

export default ScenarioTable;
