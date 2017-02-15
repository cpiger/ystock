import React from 'react';
import Table from './Table';
import SearchBar from './SearchBar';


const StockTable = ({
  onSearch,
  onAddStock,
  onDelStock,
  onGoHome,
  stocks
}) => (
  <div className="stock-table">
    <SearchBar onSearch={onSearch}/>
    <Table />
  </div>
);


export default StockTable;