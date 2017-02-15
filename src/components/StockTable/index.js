import React from 'react';
import Table from './Table';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';


const StockTable = ({
  onSearch,
  onAddStock,
  onDelStock,
  onGoHome,
  stocks,
  page
}) => (
  <div className="stock-table">
    <SearchBar onSearch={onSearch}/>
    {
      page == 'search' ? <SearchResult /> : <Table />
    }
  </div>
);

// StockTable.defaultProps = {
//   page: 'table'
// }

export default StockTable;