import React, {useState, useEffect} from 'react';
import '../common/Title.css';
import './SendfabNetwork.css';
import {ResponsiveChord} from '@nivo/chord';
import LocalData from '../../db/SendfabNetwork.json';

const matrix = [
  [0, 1948, 577, 419, 315],
  [761, 0, 384, 712, 124],
  [474, 14, 0, 51, 492],
  [1523, 62, 194, 0, 48],
  [848, 347, 302, 251, 0],
];

const matrix2 = [
  [0, 148, 77, 41, 315],
  [761, 0, 84, 712, 124],
  [474, 14, 0, 51, 92],
  [123, 62, 194, 0, 48],
  [88, 37, 302, 251, 0],
];

const MyResponsiveChord = ({keys, matrix}) => {
  const theme = {
    background: '#ffffff',
    textColor: '#333333',
    fontSize: 14,
  };

  return (
    <ResponsiveChord
      matrix={matrix}
      keys={keys}
      margin={{top: 60, right: 60, bottom: 60, left: 60}}
      valueFormat=".2f"
      padAngle={0.25}
      innerRadiusRatio={0.96}
      innerRadiusOffset={0.02}
      arcOpacity={1}
      arcBorderWidth={1}
      arcBorderColor={{from: 'color', modifiers: [['darker', 0.4]]}}
      ribbonOpacity={0.5}
      ribbonBorderWidth={1}
      ribbonBorderColor={{from: 'color', modifiers: [['darker', 0.4]]}}
      enableLabel={true}
      label="id"
      labelOffset={12}
      labelRotation={-90}
      labelTextColor={{from: 'color', modifiers: [['darker', 1]]}}
      colors={{scheme: 'nivo'}}
      isInteractive={true}
      arcHoverOpacity={1}
      arcHoverOthersOpacity={0}
      ribbonHoverOpacity={1}
      ribbonHoverOthersOpacity={0.12}
      animate={true}
      motionStiffness={90}
      motionDamping={7}
      theme={theme}
    />
  );
};

const SendfabNetwork = ({curLine, curYear, curMonth}) => {
  const curMatrix = [];
  const keys = [];

  const response = LocalData; // server에 요청 후 json 타입으로 받음
  response['keys'].map(lineId => {
    keys.push(lineId);
    curMatrix.push(response[lineId]);
  });

  return (
    <article className="network_article_layout">
      <h4>Sendfab Network</h4>
      <MyResponsiveChord keys={response.keys} matrix={curMatrix} />
    </article>
  );
};

export default SendfabNetwork;
