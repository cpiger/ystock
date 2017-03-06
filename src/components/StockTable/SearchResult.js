import React from 'react';


/*const SearchResult = ({
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
);*/

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    
    this.onBtnGoHome = this.onBtnGoHome.bind(this);
    this.onBtnAdd = this.onBtnAdd.bind(this);
  }

  render() {
    return (
      <div className="result">
        <h4>{this.props.stock.name}</h4>
        <div>final: {this.props.stock.final}</div>
        <div>UP/Down: {this.props.stock.upDown}</div>
        <div>Max: {this.props.stock.max}</div>
        <div>Min: {this.props.stock.min}</div>
        <hr/>
        <button className="btn btn-default" onClick={this.onBtnGoHome}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Back
        </button>
        <button className="btn btn-success pull-right" onClick={this.onBtnAdd}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
        </button>
      </div>
    );
  }

  onBtnGoHome(e) {
    this.props.onGoHome();
  }

  onBtnAdd(e) {
    this.props.onAddStock(this.props.stock);
  }
}

export default SearchResult;