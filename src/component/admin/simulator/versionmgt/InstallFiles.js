import React from 'react';
import moduleCss from '../AdminSimulator.module.css';

import 'antd/dist/antd.css';
import {Menu} from 'antd';
import InstallFileTable from './InstallFileTable';

const InstallFiles = () => {
  return (
    <section className={moduleCss.version_management}>
      <article style={{fontSize: 20}}>
        <h4>Upload Intall File</h4>
        <div>Simulator(AMHS Sim UI, SeeFlow 중 선택), version(입력 칸), Message, File 업로드 칸</div>
      </article>
      <article>
        <InstallFileTable></InstallFileTable>
      </article>
    </section>
  );
};

export default InstallFiles;
