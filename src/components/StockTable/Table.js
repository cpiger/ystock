import React from 'react';

const Table = (props) => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th>名稱</th>
        <th>編號</th>
        <th>今價</th>
        <th>漲跌</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>測試一號</td>
        <td>0001</td>
        <td>100</td>
        <td>+10</td>
      </tr>
    </tbody>
  </table>
);

export default Table;