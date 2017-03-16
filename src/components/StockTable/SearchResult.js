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
    
    this.handleStockLink = this.handleStockLink.bind(this);
    this.onBtnGoHome = this.onBtnGoHome.bind(this);
    this.onBtnAdd = this.onBtnAdd.bind(this);
  }

  handleStockLink(e) {
    let stockUrl = `https://tw.stock.yahoo.com/q/q?s=${this.props.stock.id}`;
    chrome.tabs.create({url: stockUrl});
  }

  render() {
    let upDownRow = <span>{this.props.stock.upDown}</span>;
    if (this.props.stock.upDown.indexOf('▽') > -1) {
      upDownRow = <span className='stock-down'>{this.props.stock.upDown}</span>;
      this.props.stock.upDown.replace('▽', '▼');
    }
    else if (this.props.stock.upDown.indexOf('△') > -1) {
      upDownRow = <span className='stock-up'>{this.props.stock.upDown}</span>;
      this.props.stock.upDown.replace('△', '▲');
    }

    return (
      <div className="result">
        <h4><a href="#" onClick={this.handleStockLink}>{this.props.stock.id} {this.props.stock.name}</a></h4>
        <div>final: {this.props.stock.final}</div>
        <div>UP/Down: {upDownRow}</div>
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