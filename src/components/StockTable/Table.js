import React from 'react';
import Stock from './Stock';

const Table = ({stocks}) => {
  let tbody = <tr><td colSpan="5">None</td></tr>;
  if (stocks.length > 0) {
    tbody = stocks.map(
              (obj) => <Stock stock={obj.stock} key={obj.idx} id={obj.idx} />
            );
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>編號/名稱</th>
          <th>今價</th>
          <th>漲跌</th>
          <th>最高</th>
          <th>最低</th>
        </tr>
      </thead>
      <tbody>
        {tbody}
      </tbody>
    </table>
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