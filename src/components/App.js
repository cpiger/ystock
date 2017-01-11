import React from 'react';
import StockTable from './StockTable';

const App = (props) => (
  <div>
    <center><h3>yStock</h3></center>
    <nav>
    </nav>

    <StockTable />

    <br/>
    {props.children}
  </div>
);


export default App;