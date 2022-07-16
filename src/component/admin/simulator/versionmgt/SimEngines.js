import React from 'react';
import moduleCss from '../AdminSimulator.module.css';

import 'antd/dist/antd.css';
import {Menu} from 'antd';
import SimEngineTable from './SimEngineTable';

const SimEngines = () => {
  return (
    <section className={moduleCss.version_management}>
      <article style={{fontSize: 20}}>
        <h4>Upload Web Simulation Engine</h4>
        <div>Simulator(AMHS Sim UI, SeeFlow 중 선택), version(입력 칸), Message, File 업로드 칸</div>
      </article>
      <article>
        <SimEngineTable></SimEngineTable>
      </article>
    </section>
  );
};

export default SimEngines;
