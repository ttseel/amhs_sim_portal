import React, {useState} from 'react';
import axios from 'axios';
import DataTable from './common/DataTable';

const Home = () => {
  const [apiTest, setApiTest] = useState('before request');

  const getTest = () => {
    axios
      .get('http://localhost:80/sendanalysis/contStep')
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
      <h3 className="sub_title">Home</h3>
      <h1>{apiTest}</h1>
      <button style={{fontSize: 15}} onClick={getTest}>
        request to server
      </button>
    </div>
  );
};

export default Home;
