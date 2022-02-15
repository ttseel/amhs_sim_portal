import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import moduleCss from './Reservation.module.css';
import {Upload, message, Button, Radio, Empty, Select, Space, Modal} from 'antd';
import {UploadOutlined, FileAddOutlined, CheckCircleOutlined} from '@ant-design/icons';
import ScenarioDescription from './ScenarioDescription';
import {
  simulatorVersionListApi,
  validatePossibleToRserveApi,
  reserveNewScenarioApi,
} from '../../api/simulation/SimulationApis';

const Reservation = () => {
  /*
    Simulator select
  */
  const [simulator, setSimulator] = useState('AMHS_SIM');
  const isSimulatorSelected = () => {
    return simulator !== undefined;
  };
  const optionsWithDisabled = [
    {label: 'AMHS_SIM', value: 'AMHS_SIM'},
    {label: 'SeeFlow', value: 'SeeFlow'},
    {label: 'REMOTE_SIM', value: 'REMOTE_SIM', disabled: true},
  ];

  const handleSimulatorChange = event => {
    console.log('Selected simulator: ' + event.target.value);
    setSimulator(prev => event.target.value);
    setVersion({value: 'Please select a version'});
  };

  /*
    Version select
  */

  // 주의: version은 value라는 속성을 가진 object 타입이어야 한다. <Select> 컴포넌트의 value 속성은 value를 가진 object 타입을 받기 때문
  const initialVersionPhrase = 'Please select a version';
  const [version, setVersion] = useState({value: initialVersionPhrase});
  const [versionList, setVersionList] = useState({
    AMHS_SIM: [initialVersionPhrase],
    SEEFLOW: [initialVersionPhrase],
    REMOTE_SIM: [initialVersionPhrase],
  });
  const isVersionSelected = () => {
    return version['value'] !== initialVersionPhrase;
  };
  const VersionSelectComponent = props => {
    const {Option} = Select;

    const handleVersionChange = changed => {
      console.log('Selected version:', changed.label); // changed는 value, key, label이 있는 Object
      setVersion(prev => changed); // 주의: setVersion
    };

    return (
      <Select
        labelInValue
        // defaultValue={{value: 'Please select a version'}}
        value={version}
        style={{width: 295}}
        onChange={handleVersionChange}
        disabled={!isSimulatorSelected()}
      >
        {versionList[simulator].map((element, index) => {
          return (
            <Option key={index} value={element}>
              {element}
            </Option>
          );
        })}
      </Select>
    );
  };

  /*
    .fsl file import
  */
  const [fslFile, setFslFile] = useState({});
  const isFslUploaded = () => {
    return Object.keys(fslFile).length !== 0;
  };
  const fslImportButtonProps = {
    name: 'fslFile',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(event) {
      if (event.file.status !== 'uploading') {
        const newFile = {};
        setFslFile(prev => newFile);
      }
      if (checkAllFilesUploaded(event.fileList)) {
        initAllFilesStatusToDone(event.fileList);

        if (!checkOnlyOneFileUploaded(event.fileList)) {
          for (let element of event.fileList) {
            element.status = 'error';
          }
          const newFile = {};
          setFslFile(prev => newFile);
          return;
        }
        for (let element of event.fileList) {
          const extension = element.name.slice(-3, element.name.length);
          if (!validExtension('fsl', extension)) {
            element.status = 'error';

            const newFile = {};
            setFslFile(prev => newFile);
            return;
          }
        }
        message.success(`${event.file.name} file uploaded successfully`);

        const file = event.file.originFileObj;
        console.log('Imported file type: ' + typeof file);
        setFslFile(file);

        const reader = new FileReader();
        reader.onload = function () {
          console.log(reader.result);
        };
        reader.readAsText(file);
      }
    },
  };

  const initAllFilesStatusToDone = fileList => {
    for (let element of fileList) {
      element.status = 'done';
    }
  };

  const checkOnlyOneFileUploaded = fileList => {
    if (fileList.length > 1) {
      Modal.error({
        title: 'File upload failed',
        content: `The allowed number of '.fsl' files is one.`,
      });
      return false;
    }
    return true;
  };

  /*
    .fss files import
  */
  const [fssFiles, setFssFiles] = useState({});
  const isFssUploaded = () => {
    return Object.keys(fssFiles).length !== 0;
  };
  const fssImportButtonProps = {
    name: 'fssFile',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    uploadFile: [{name: 'test', percent: 1, status: 'done'}],
    multiple: true,
    // maxCount: 10,
    onChange(event) {
      if (event.file.status !== 'uploading') {
        const newFssFiles = {};
        setFssFiles(prev => newFssFiles);
        // console.log(event.file, event.fileList);
      }

      if (checkAllFilesUploaded(event.fileList)) {
        setAllFssFilesIntoState(event.fileList)
          .then(result => {
            message.success(`all .fss files are uploaded successfully`);
            console.log('imported fss files: ', result);

            const newFssFiles = {...result};
            return newFssFiles;
          })
          .then(result => {
            setFssFiles(prev => result);
            // setFssFiles(prev => [result['scenario1.fss'], result['scenario2.fss']]);
          })
          .catch(result => {
            const newFssFiles = {};
            setFssFiles(prev => newFssFiles);
          });
      } else if (event.file.status === 'error') {
        message.error(`${event.file.name} file upload failed.`);
      }
    },
  };

  const checkAllFilesUploaded = fileList => {
    const res = true;
    for (let element of fileList) {
      if (element.status === 'uploading') {
        return;
      }
    }
    return res;
  };

  const setAllFssFilesIntoState = fileList => {
    return new Promise(function (resolve, reject) {
      const newFssFiles = {};

      for (let element of fileList) {
        const extension = element.name.slice(-3, element.name.length);
        if (validExtension('fss', extension) && validDuplicate(element, newFssFiles)) {
          newFssFiles[element.name] = element.originFileObj;
        } else {
          element.status = 'error';
        }
      }

      if (Object.keys(newFssFiles).length === fileList.length) {
        resolve(newFssFiles);
      } else {
        reject(undefined);
      }
    });
  };

  const validExtension = (expect, actual) => {
    if (expect !== actual) {
      Modal.error({
        title: 'File upload failed',
        content: `At least one non-${expect} file uploaded`,
      });
      return false;
    }
    return true;
  };

  const validDuplicate = (candidateFile, newFssFiles) => {
    if (newFssFiles !== undefined && newFssFiles[candidateFile.name] !== undefined) {
      Modal.error({
        title: 'File upload failed',
        content: `${candidateFile.name} file is aleady uploaded`,
      });
      return false;
    }
    return true;
  };

  /*
    Scenario description
  */
  // const [scenarioInfo, setScenarioInfo] = useState({});

  /*
    Modal settings
  */
  const ModalTitleComponent = ({text, color}) => {
    return (
      <Space>
        <FileAddOutlined style={{color: color, fontSize: 20}} />
        {text}
      </Space>
    );
  };

  const [modalTitle, setModalTitle] = useState(<ModalTitleComponent text="Request new reservation" color="#3b49cb" />);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState();

  /*
    Submit button
  */
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
  const submitButtonProps = {
    type: 'primary',
    disabled: !isPossibleSubmit,
    onClick() {
      setModalText(`Are you sure you want to reserve new scenario?`);
      setVisible(true);
    },
  };

  const formData = new FormData();

  function handleSubmitOk() {
    setConfirmLoading(true);
    try {
      console.log('handleSubmitOk');
      formData.append('user', 'USER1');
      formData.append('simulator', 'AMHS_SIM');
      formData.append('version', version);
      formData.append('scenario', 'Scenario8');
      formData.append('fslFile', fslFile);
      formData.append('fssFiles', fssFiles['scenario1.fss']);
      formData.append('fssFiles', fssFiles['scenario2.fss']);
      for (var value of formData.values()) {
        console.log('formData.values(): ', value);
      }

      reserveNewScenarioApi(formData).then(response => {
        if (response.data.status === true) {
          setIsPossibleSubmit(true);
          Modal.success({
            title: modalTitle,
            content: response.data.message,
            onOk: e => {
              <Link to="/simulation/SimBoard">Sim Board</Link>;
            },
          });
        } else {
          Modal.error({
            title: modalTitle,
            content: response.data.message,
            onOk: e => {
              <Link to="/simulation/SimBoard">Sim Board</Link>;
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
    setVisible(false);
    setConfirmLoading(false);
  }

  const handleSubmitCancel = () => {
    setVisible(false);
  };

  /*
    Validation button
  */
  const [isPossibleValidation, setIsPossibleValidation] = useState(true);
  const valiationButtonProps = {
    type: isPossibleValidation === true ? 'primary' : 'dashed',
    style: {
      color: isPossibleValidation === true ? 'white' : 'green',
      background: isPossibleValidation === true ? 'green' : 'white',
      borderColor: 'green',
    },
    disabled: !isPossibleValidation,
    onClick() {
      console.log('Validation button clicked');

      try {
        validatePossibleToRserveApi('user4', 'SeeFlow', 'Scenario3').then(response => {
          const validationModalTitle = 'Scenario reservation';

          if (response.data.status === true) {
            setIsPossibleSubmit(true);
            Modal.success({
              title: validationModalTitle,
              content: response.data.message,
              okButtonProps: {disabled: true, size: 'large'},
            });
          } else {
            Modal.error({
              title: validationModalTitle,
              content: response.data.message,
              okButtonProps: {disabled: true, size: 'large'},
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
  };

  /*
    Hooks
  */
  useEffect(() => {
    simulatorVersionListApi('ALL').then(response => {
      console.log('RequestVersionList: ', response.data);
      setVersionList(response.data);
    });
  }, []);

  useEffect(() => {
    if (isSimulatorSelected() && isVersionSelected() && isFslUploaded() && isFssUploaded()) {
      // if (isSimulatorSelected() && isVersionSelected() && isFslUploaded()) {
      // if (isSimulatorSelected() && isFslUploaded() && isFssUploaded()) {

      setIsPossibleSubmit(prev => true);
    } else {
      setIsPossibleSubmit(prev => false);
    }
  }, [simulator, version, fslFile, fssFiles]);
  const {Option} = Select;

  return (
    <section style={{fontSize: 20}} className={moduleCss.reservation_sectio_wrapper}>
      <h3 className="sub_title">
        <img src="/component/simulation/reservation.png" alt="reservation.png"></img>
        <em>Reservation</em>
      </h3>
      <article className={moduleCss.simulator_button_container}>
        <h4>Simulator</h4>
        <Radio.Group
          options={optionsWithDisabled}
          onChange={handleSimulatorChange}
          value={simulator}
          optionType="button"
          buttonStyle="solid"
        />
      </article>
      <article className={moduleCss.simulator_button_container}>
        <h4>Version</h4>
        <VersionSelectComponent props={versionList} />
      </article>
      <article className={moduleCss.simulator_button_container}>
        <h4>Import .fsl file</h4>
        <Upload {...fslImportButtonProps}>
          <Button icon={<UploadOutlined />}>Cilck to Import</Button>
        </Upload>
      </article>
      <article className={moduleCss.simulator_button_container}>
        <h4>Import .fss files</h4>
        <Upload {...fssImportButtonProps}>
          <Button icon={<UploadOutlined />}>Cilck to Import</Button>
        </Upload>
      </article>
      {/* <article>
        <h4>Scenario description</h4>
        <ScenarioDescription scenarioInfo={fslFile} />
      </article> */}
      <div>
        <Space size={'small'}>
          <Button {...submitButtonProps}>Submit</Button>
          <Button {...valiationButtonProps}>Validation</Button>
        </Space>
      </div>
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={handleSubmitOk}
        confirmLoading={confirmLoading}
        onCancel={handleSubmitCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </section>
  );
};

export default Reservation;
