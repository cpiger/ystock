import React from 'react';
import * as consts from '../../constants';


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
    let yday = parseFloat(this.props.stock.yestorday);
    let upDownRow = <span>{this.props.stock.upDown}</span>;
    let upDownNum = 0;
    let percent = '0%';
    if (this.props.stock.upDown.indexOf('▽') > -1) {
      this.props.stock.upDown = this.props.stock.upDown.replace('▽', '▼');
      let tmp = this.props.stock.upDown;
      tmp = tmp.replace('▼', '');
      upDownNum = parseFloat(tmp);
      percent = Math.round((upDownNum / yday) * 10000) / 100.0;
      
      upDownRow = <span className='stock-down'>{this.props.stock.upDown} ({percent}%)</span>;
    }
    else if (this.props.stock.upDown.indexOf('△') > -1) {
      this.props.stock.upDown = this.props.stock.upDown.replace('△', '▲');
      let tmp = this.props.stock.upDown;
      tmp = tmp.replace('▲', '');
      upDownNum = parseFloat(tmp);
      percent = Math.round((upDownNum / yday) * 10000) / 100.0;
      
      upDownRow = <span className='stock-up'>{this.props.stock.upDown} ({percent}%)</span>;
    }

    let rstTitle = <h4><a href="#" onClick={this.handleStockLink}>{this.props.stock.id} {this.props.stock.name}</a></h4>;
    if (this.props.stock.name === '此股票不存在') {
      rstTitle = <h4><a href="#" onClick={this.handleStockLink}>{this.props.stock.name}</a></h4>;
    }

    let menus = [];
    for (var i=0 ; i<consts.TAB_NUM ; i++) {
      let tabIdx = i;
      menus.push(<li key={i}><a href="#" onClick={() => this.onBtnAdd(tabIdx)}>加到分頁 {i + 1}</a></li>);
    }

    let addToTabIdx = this.props.currTab;
    if (addToTabIdx > consts.TAB_NUM) {
      addToTabIdx = 1;
    }

    return (
      <div className="result">
        {rstTitle}
        <div>今價: {this.props.stock.final}</div>
        <div>漲跌: {upDownRow}</div>
        <div>最高: {this.props.stock.max}</div>
        <div>最低: {this.props.stock.min}</div>
        <hr/>
        <button className="btn btn-sm btn-default" onClick={this.onBtnGoHome}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> 回列表
        </button>
        {/* <button className="btn btn-sm btn-success pull-right" onClick={this.onBtnAdd}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 加到分頁 {this.props.currTab}
        </button> */}
        <div className="btn-group dropup pull-right">
          <button type="button" className="btn btn-sm btn-success" onClick={() => this.onBtnAdd(addToTabIdx-1)}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 加到分頁 {addToTabIdx}
          </button>
          <button type="button" className="btn btn-sm btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="caret"></span>
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu dropup">
            {menus}
          </ul>
        </div>
      </div>
    );
  }

  onBtnGoHome(e) {
    this.props.onGoHome();
  }

  onBtnAdd(tabIdx) {
    this.props.onAddStock(tabIdx, this.props.stock);
  }
}

export default SearchResult;