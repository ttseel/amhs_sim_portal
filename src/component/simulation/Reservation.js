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
import ScenarioName from './ScenarioName';

const Reservation = () => {
  /*
    Simulator select
  */
  const [simulator, setSimulator] = useState('MCPSIM');
  const isSimulatorSelected = () => {
    return simulator !== undefined;
  };
  const optionsWithDisabled = [
    {label: 'MCPSIM', value: 'MCPSIM'},
    {label: 'OCS4SIM', value: 'OCS4SIM'},
    {label: 'OCS3SIM', value: 'OCS3SIM'},
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
    MCPSIM: [initialVersionPhrase],
    OCS3SIM: [initialVersionPhrase],
    OCS4SIM: [initialVersionPhrase],
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
      if (checkFileUploadIsCompleted(event.fileList)) {
        initAllFilesStatusToDone(event.fileList);
        initfslNameStatus();

        if (!checkOnlyOneFileUploaded(event.fileList)) {
          for (let element of event.fileList) {
            element.status = 'error';
          }
          const newFile = {};
          setFslFile(prev => newFile);
          return;
        }

        for (let element of event.fileList) {
          const extension = splitFilenameAndExtension(element.name, 3)['extension'];

          if (!validExtension('fsl', extension)) {
            element.status = 'error';

            const newFile = {};
            setFslFile(prev => newFile);
            return;
          }
        }
        message.success(`${event.file.name} file uploaded successfully`);

        const file = event.file.originFileObj;
        console.log('Imported file: ', file);
        setFslFile(file);

        setFslName(prev => splitFilenameAndExtension(file.name, 3)['filename']);
        setNameVisible(prev => true);

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
    } else if (fileList.length !== 1) {
      return false;
    }
    return true;
  };

  /*
    .fss files import
  */
  const [fssFiles, setFssFiles] = useState({});
  const [fssNameList, setFssNameList] = useState([]);
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
      }

      if (checkFileUploadIsCompleted(event.fileList)) {
        setAllFssFilesIntoState(event.fileList)
          .then(result => {
            message.success(`all .fss files are uploaded successfully`);
            console.log('imported fss files: ', result);

            const newFssFiles = {...result};
            return newFssFiles;
          })
          .then(result => {
            setFssFiles(prev => result);

            let newFssNameList = [];
            Object.keys(result).map((element, index) => {
              newFssNameList.push(splitFilenameAndExtension(element, 3)['filename']);
            });
            setFssNameList(prev => newFssNameList);
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

  const checkFileUploadIsCompleted = fileList => {
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
        const extension = splitFilenameAndExtension(element.name, 3)['extension'];
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

  const splitFilenameAndExtension = (fullname, extensionLength) => {
    const result = {};
    result['filename'] = fullname.slice(0, -extensionLength - 1);
    result['extension'] = fullname.slice(-extensionLength, fullname.length);
    return result;
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
    Scenario Name
   */
  const [fslName, setFslName] = useState('');
  const [nameVisible, setNameVisible] = useState(false);
  const initfslNameStatus = () => {
    setFslName(prev => '');
    setNameVisible(prev => false);
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

  // Submit Modal
  const [submitModalTitle, setModalTitle] = useState(
    <ModalTitleComponent text="Request new reservation" color="#3b49cb" />,
  );
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [submitModalText, setSubmitModalText] = useState();
  const handleSubmitModalCancel = () => {
    setSubmitModalVisible(false);
  };

  const submitModalProps = {
    title: submitModalTitle,
    visible: submitModalVisible,
    onOk: handleSubmitOk,
    confirmLoading: confirmLoading,
    onCancel: handleSubmitModalCancel,
  };

  /*
    Submit button
  */
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
  const submitButtonProps = {
    type: 'primary',
    disabled: !isPossibleSubmit,
    onClick() {
      setSubmitModalText(`Are you sure you want to reserve new scenario?`);
      setSubmitModalVisible(true);
    },
  };

  const formData = new FormData();

  function handleSubmitOk() {
    setConfirmLoading(true);
    try {
      formData.append('user', 'USER2');
      formData.append('simulator', simulator);
      formData.append('version', version.label);
      formData.append('fslName', fslName);
      formData.append('fslFile', fslFile);
      for (let element of fssNameList) {
        formData.append('fssNameList', element);
      }
      Object.keys(fssFiles).map((element, index) => {
        formData.append('fssFiles', fssFiles[element]);
      });
      for (var value of formData.values()) {
        console.log('formData.values(): ', value);
      }

      reserveNewScenarioApi(formData).then(response => {
        if (response.data.status === true) {
          // setIsPossibleSubmit(true);
          Modal.success({
            title: submitModalTitle,
            content: response.data.message,
            okButtonProps: {href: '/simulation/MySimulation'},
          });
        } else {
          Modal.error({
            title: submitModalTitle,
            content: response.data.message,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
    setSubmitModalVisible(false);
    setConfirmLoading(false);
  }

  /*
    Validation button
  */
  const [isPossibleValidation, setIsPossibleValidation] = useState(false);
  const valiationButtonProps = {
    type: isPossibleValidation === true ? 'primary' : 'dashed',
    style: {
      color: isPossibleValidation === true ? 'white' : 'green',
      background: isPossibleValidation === true ? 'green' : 'white',
      borderColor: 'green',
    },
    disabled: !isPossibleValidation,
    onClick() {
      try {
        const fssFileNameList = [];
        for (const fileName of Object.keys(fssFiles)) {
          fssFileNameList.push(splitFilenameAndExtension(fileName, 3)['filename']);
        }

        validatePossibleToRserveApi(currentUser, simulator, fssFileNameList).then(response => {
          const validationModalTitle = 'Scenario reservation';

          if (response.data.status === true) {
            setIsPossibleSubmit(true);

            Modal.success({
              title: validationModalTitle,
              content: response.data.message,
              okButtonProps: {disabled: false, size: 'large'},
            });
          } else {
            Modal.error({
              title: validationModalTitle,
              content: response.data.message,
              okButtonProps: {disabled: false, size: 'large'},
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
  };
  /*
    Common Info
  */
  const [currentUser, setCurrentUser] = useState('ADMIN');
  const {Option} = Select;

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
    setIsPossibleSubmit(prev => false);
    if (isSimulatorSelected() && isVersionSelected() && isFslUploaded() && isFssUploaded()) {
      setIsPossibleValidation(prev => true);
    } else {
      setIsPossibleValidation(prev => false);
    }
  }, [simulator, version, fslFile, fssFiles, fssNameList]);

  return (
    <section style={{fontSize: 20}} className={moduleCss.reservation_section_wrapper}>
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
      <ScenarioName name={fslName} visible={nameVisible} />
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
      <Modal {...submitModalProps}>
        <p>{submitModalText}</p>
      </Modal>
    </section>
  );
};

export default Reservation;
