import React, {useState} from 'react';
import axios from 'axios';
import '../common/Title.css';

const ContStep = () => {
  const [apiTest, setApiTest] = useState('before request');

  const getTest1 = () => {
    axios
      .get('http://localhost:80/sendanalysis/contStep/getTest')
      .then(function (response) {
        console.log(response.data);
        setApiTest(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // 항상 실행
      });
  };

  return (
    <div>
      <h3 className="sub_title">
        <img src="/component/sendanalysis/process.png"></img>
        <em>연속 Step</em>
      </h3>
      <h1>{apiTest}</h1>
      <button style={{fontSize: 15}} onClick={getTest1}>
        request to server button1
      </button>
    </div>
  );
};

export default ContStep;
