import React from 'react';
import Table from './Table';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';


const StockTable = ({
  page,
  stocks,
  searchResult,
  onSearch,
  onAddStock,
  onDelStock,
  onGoHome,
}) => (
  <div className="stock-table">
    <SearchBar onSearch={onSearch}/>
    {
      page == 'search' ? <SearchResult stock={searchResult}/> : <Table />
    }
    <div>aaaa: {page}</div>
  </div>
);

// StockTable.defaultProps = {
//   page: 'table'
// }

export default StockTable;