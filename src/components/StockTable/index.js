import React from 'react';
import Table from './Table';
import SearchBar from './SearchBar';


const StockTable = () => (
  <div className="stock-table">
    <SearchBar />
    <Table />
  </div>
);


export default StockTable;