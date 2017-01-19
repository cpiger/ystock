import React from 'react';
import Stock from './Stock';

const Table = (stocks) => (
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
        {
          stocks.map(
            (stock, idx) => <Stock stock={stock} key={idx} id={idx} />
          )
        }
    </tbody>
  </table>
);

export default Table;