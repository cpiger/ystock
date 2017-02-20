import React from 'react';


const SearchResult = ({
  stock,
  onGoHome,
  onAddStock
}) => (
  <div className="result">
    <h4>{stock.name}</h4>
    <div>final: {stock.final}</div>
    <div>UP/Down: {stock.upDown}</div>
    <div>Max: {stock.max}</div>
    <div>Min: {stock.min}</div>
    <button className="btn btn-default" onClick={onGoHome}>
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Back
    </button>
    <button className="btn btn-success pull-right" onClick={onAddStock}>
      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
    </button>
  </div>
);

export default SearchResult;