import React from 'react';
import PropTypes from 'prop-types';
import Stock from './Stock';
import { Table, Button } from 'antd';


class StockList extends React.Component {
  constructor(props) {
    super(props);

    this.onBtnDelete = this.onBtnDelete.bind(this);
  }

  render() {
    const columns = [
      {
        title: '個股',
        dataIndex: 'name',
        width: 88,
        render: (text) => {
          let split_ = text.split('__');
          let id = split_[0];
          let name = split_[1];
          return (
            <a href={`https://tw.stock.yahoo.com/q/q?s=${id}`} target='_blank'>
              {id}<br/>{name}
            </a>
          )
        }
      },
      {
        title: '今價',
        dataIndex: 'final',
        width: 56
      },
      {
        title: '漲跌',
        dataIndex: 'updown',
        width: 62,
        render: (text) => {
          let split_ = text.split('__');
          let upDown = split_[0];
          let yDay = parseFloat(split_[1]);
          let upDownRow = <span>{upDown}</span>;
          let upDownNum = 0;
          let percent = '0';
          if (upDown.indexOf('▽') > -1 || upDown.indexOf('▼') > -1) {
            upDown = upDown.replace('▽', '▼');
            upDownNum = parseFloat(upDown.replace('▼', ''));
            percent = Math.round((upDownNum / yDay) * 10000) / 100.0;
            upDownRow = <span className='stock-down'>{upDown}<br/>{percent}%</span>;
          }
          else if (upDown.indexOf('△') > -1 || upDown.indexOf('▲') > -1) {
            upDown = upDown.replace('△', '▲');
            upDownNum = parseFloat(upDown.replace('▲', ''));
            percent = Math.round((upDownNum / yDay) * 10000) / 100.0;
            upDownRow = <span className='stock-up'>{upDown}<br/>{percent}%</span>;
          }

          return upDownRow;
        }
      },
      {
        title: '最高',
        dataIndex: 'max',
        width: 52
      },
      {
        title: '最低',
        dataIndex: 'min',
        width: 52
      },
      {
        title: '',
        width: 50,
        render: (text, record, index) => (
          <Button shape="circle" icon="delete" onClick={this.onBtnDelete.bind(this, record.key)} />
        )
      }
    ];

    let tableData = [];
    this.props.stocks.forEach((obj, index) => {
      tableData.push({
        key: obj.id,
        name: `${obj.id}__${obj.name}`,
        final: obj.final,
        updown: `${obj.upDown}__${obj.yestorday}`,
        max: obj.max,
        min: obj.min
      });
    });

    return (
      <div className="stock-table-list">
        <Table
          columns={columns}
          dataSource={tableData}
          // bordered
          // size="middle"
          pagination={false}
          scroll={{y: 300}}
        />
      </div>
    );
  } 

  onBtnDelete(stockId) {
    this.props.onDelStock(stockId);
  }
}

StockList.propTypes = {
  stocks: PropTypes.array,
  onDelStock: PropTypes.func
}

// // Prop 預設值
// Table.defaultProps = {
//   stocks: [
//     {
//       'idx': 1001,
//       'stock': {
//         name: 'aaaa',
//         final: 100,
//         upDown: '+10',
//         max: 10,
//         min: 1
//       }
//     } 
//   ]
// }


export default StockList;