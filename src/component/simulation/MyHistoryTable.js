import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space, Modal} from 'antd';
import {deleteMyHistoryApi, downloadHistoryApi} from '../../api/simulation/SimulationApis';
import {readCurrentRunningApi, stopSimulationApi} from '../../api/simulation/SimulationApis';

const MyHistoryTable = ({currentUser, data, setData}) => {
  console.log('data:', data);

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
      title: 'Result',
      dataIndex: 'result',
      key: 'result',

      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => requestDownload(record)}>Download</a>
        </Space>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',

      render: (text, record) => (
        <>
          <Space size="middle">
            <a style={{color: 'red'}} onClick={() => showDeleteModal(record)}>
              Delete
            </a>
          </Space>
        </>
      ),
    },
  ];

  const requestDownload = record => {
    try {
      console.log(record);
      downloadHistoryApi(currentUser, record.simulator, record.group, record.scenario).then(response => {
        // status 200: 서버의 응답이 성공했다는 HTTP 상태 코드
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${record.scenario}.zip`);
          document.body.appendChild(link);
          link.click();
        } else {
          console.log('http status is not 200');
          console.log('response: ', response);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const modalTitle = 'Request Stop';
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState();
  const [recordNo, setRecordNo] = useState();
  const [recordSimulator, setRecordSimulator] = useState();
  const [recordScenario, setRecordScenario] = useState();

  const showDeleteModal = record => {
    setRecordNo(record.no);
    setRecordSimulator(record.simulator);
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

  function handleOk() {
    setConfirmLoading(true);
    try {
      deleteMyHistoryApi(currentUser, recordSimulator, recordScenario).then(response => {
        // status 200: 서버의 응답이 성공했다는 HTTP 상태 코드
        if (response.status === 200) {
          if (response.data === true) {
            showResultModal(response.data, `history: ${recordScenario} deleted successfully`);
            removeRecordFromList();
          } else {
            showResultModal(response.data, `Delete history request failed`);
          }
        } else {
          console.log('The request to delete the history failed');
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
    console.log('My History after remove', afterRemove);
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

export default MyHistoryTable;
