import React from 'react';
import Stock from './Stock';

const Table = ({
  stocks,
  status,
  idx,
  onDelStock
}) => {
  let tbody = null;
  if (status === 'loading') {
    tbody = (
      <tr className="table-loading">
        <td colSpan="6" rowSpan="6">
          <center><img src="./images/ajax-loader.gif" /></center>
        </td>
      </tr>
    );
  } else {
    tbody = <tr className="table-none"><td colSpan="6">No Data</td></tr>;
    if (stocks.length > 0) {
      tbody = stocks.map(
                (obj) => <Stock stock={obj} key={obj.id} id={obj.id} onDelStock={onDelStock}/>
              );
    }
  }

  return (
    <div className="stock-table-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col1">個股</th>
            <th className="col2">今價</th>
            <th className="col3">漲跌</th>
            <th className="col4">最高</th>
            <th className="col5">最低</th>
            <th className="col6"></th>
          </tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </table>
    </div>
  );
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


export default Table;