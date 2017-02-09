import React from 'react';


const SearchResult = (props) => (
  <div className="result">
    <h4>{this.props.stock.name}</h4>
    <div>final: {this.props.stock.final}</div>
    <div>UP/Down: {this.props.stock.upDown}</div>
    <div>Max: {this.props.stock.max}</div>
    <div>Min: {this.props.stock.min}</div>
  </div>
);

export default SearchResult;