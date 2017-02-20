import React from 'react';
import Table from './Table';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';


const StockTable = ({
  page,
  stocks,
  result,
  onSearch,
  onAddStock,
  onDelStock,
  onGoHome,
}) => (
  <div className="stock-table">
    <SearchBar onSearch={onSearch}/>
    {
      page == 'search' ? <SearchResult stock={result} onGoHome={onGoHome} onAddStock={onAddStock}/> : <Table stocks={stocks}/>
    }
  </div>
);

/*const StockTable = ({
  page,
  stocks,
  result,
  onSearch,
  onAddStock,
  onDelStock,
  onGoHome,
}) => {
  let pageUI = <table />;
  if (page == 'search') {
    console.log('searchhhhhh');
    pageUI = <SearchResult stock={result} />;
  }

  return (
    <div className="stock-table">
      <SearchBar onSearch={onSearch}/>
      {pageUI}
      <div>aaaa: {page}</div>
    </div>
  );
}*/

// StockTable.defaultProps = {
//   page: 'table'
// }

export default StockTable;