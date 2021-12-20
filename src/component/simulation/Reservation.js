import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import moduleCss from './Reservation.module.css';
import {Upload, message, Button, Radio, Empty} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import ScenarioDescription from './ScenarioDescription';

const Reservation = () => {
  const [simulator, setSimulator] = useState();
  const isSimulatorSelected = () => {
    return simulator !== undefined;
  };
  const optionsWithDisabled = [
    {label: 'AMHS Sim', value: 'amhsSim'},
    {label: 'SeeFlow', value: 'seeflow'},
    {label: 'Remote Sim', value: 'remoteSim', disabled: true},
  ];

  const handleSimulatorChange = event => {
    console.log('Selected simulator: ' + event.target.value);
    setSimulator(prev => event.target.value);
  };

  const [uploadFile, setUploadFile] = useState();
  const isFileUploaded = () => {
    return uploadFile !== undefined;
  };
  const scenarioUploadButtonProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(event) {
      if (event.file.status !== 'uploading') {
        setUploadFile(prev => undefined);
        // console.log(event.file, event.fileList);
      }
      if (event.file.status === 'done') {
        message.success(`${event.file.name} file uploaded successfully`);

        const file = event.file.originFileObj;
        console.log('typeOf: ' + typeof file);
        setUploadFile(file);
        const reader = new FileReader();
        reader.onload = function () {
          // console.log(reader.result);
        };
        reader.readAsText(file);
      } else if (event.file.status === 'error') {
        message.error(`${event.file.name} file upload failed.`);
      }
    },
  };

  const [isPossibleReservation, setIsPossibleReservation] = useState(false);
  const reservationButtonProps = {
    type: 'primary',
    disabled: !isPossibleReservation,
    onClick() {
      console.log('Reservation Clicked');
    },
  };

  useEffect(() => {
    if (isSimulatorSelected() && isFileUploaded()) {
      setIsPossibleReservation(prev => true);
    }
  }, [simulator, uploadFile]);

  return (
    <section style={{fontSize: 20}} className={moduleCss.reservation_sectio_wrapper}>
      <h3 className="sub_title">
        <img src="/component/simulation/reservation.png"></img>
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
        <h4>Scenario upload</h4>
        <Upload {...scenarioUploadButtonProps}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </article>
      <article>
        <h4>Scenario description</h4>
        <ScenarioDescription scenarioFile={uploadFile} />
      </article>
      <div>
        <Button {...reservationButtonProps}>Reservation</Button>
      </div>
    </section>
  );
};

export default Reservation;
