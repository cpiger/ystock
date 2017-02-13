import React from 'react';
import StockTableContainer from '../containers/StockTableContainer';


const App = (props) => (
  <div>
    <center><h3>yStock</h3></center>
    <nav>
    </nav>

    <StockTableContainer />

    <br/>
    {props.children}
  </div>
);


export default App;