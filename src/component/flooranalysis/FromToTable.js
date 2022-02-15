import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import {Table} from 'antd';
import moduleCss from './FromToTable.module.css';

const makeColumns = colNames => {
  const columns = [];

  for (let i = 0; i < colNames.length; i++) {
    columns[i] = {
      title: colNames[i],
      dataIndex: colNames[i],
      sorter: (a, b) => {
        if (i === 0) {
          return `a.${colNames[i]}.length - b.${colNames[i]}.length`;
        }
        return `a.${colNames[i]} - b.${colNames[i]}`;
      },
      sortDirections: ['descend'],
    };

    if (i === 0) {
      columns[i]['render'] = function (text, record) {
        return {
          props: {
            style: {background: '#EBEBEB'},
          },
          children: <div>{text}</div>,
        };
      };
    }
  }
  return columns;
};

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const FromToTable = ({title, header, rows, downloadUrl}) => {
  const [pageSize, setPageSize] = useState(3);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const newColumn = makeColumns(header);
    setColumns(newColumn);
  }, [header]);

  return (
    <article style={{width: 800}}>
      <div className={moduleCss.title_container}>
        <h4 className={moduleCss.table_title}>{title}</h4>
        <div className={moduleCss.download_container}>
          <a href={downloadUrl} download>
            <img src="/component/common/excel_icon.jpeg" alt="excel_icon.jpeg" />
          </a>
        </div>
      </div>
      <Table columns={columns} dataSource={rows} onChange={onChange} size="middle" />
    </article>
  );
};

export default FromToTable;
