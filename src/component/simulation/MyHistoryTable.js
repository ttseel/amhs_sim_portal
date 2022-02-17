import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space, Modal} from 'antd';
import {deleteMyHistoryApi, downloadHistoryApi} from '../../api/simulation/SimulationApis';

const HistoryTable = ({currentUser, data, setData}) => {
  const columns_cur_history = [
    // {
    //   title: 'No',
    //   dataIndex: 'no',
    //   key: 'no',
    // },
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
      title: 'Completed Rep',
      dataIndex: 'completedRep',
      key: 'completedRep',
    },
    {
      title: 'Request Rep',
      dataIndex: 'requestRep',
      key: 'requestRep',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Termination Reason',
      dataIndex: 'terminationReason',
      key: 'terminationReason',
      render: terminationReason => (
        <>
          {terminationReason.map(reason => {
            let color = 'green';
            if (reason === 'ABNORMAL') {
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
      title: 'Execution Server',
      dataIndex: 'executionServer',
      key: 'executionServer',
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
      downloadHistoryApi(currentUser, record.simulator, record.scenario).then(response => {
        // status 200: 서버의 응답이 성공했다는 HTTP 상태 코드
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers['content-type']}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${record.simulator}-${record.scenario}.zip`);
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
      <h4 style={{fontSize: 25}}>My History</h4>
      <Table columns={columns_cur_history} dataSource={data} />
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

export default HistoryTable;
