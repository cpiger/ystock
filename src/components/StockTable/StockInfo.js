import React from 'react';
import * as consts from '../../constants';


class StockInfo extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleStockLink = this.handleStockLink.bind(this);
    this.onBtnGoHome = this.onBtnGoHome.bind(this);
  }

  handleStockLink(e) {
    let stockUrl = `https://tw.stock.yahoo.com/q/q?s=${this.props.stock.id}`;
    chrome.tabs.create({url: stockUrl});
  }

  onBtnGoHome(e) {
    this.props.onGoHome();
  }

  render() {
    let info = this.props.stock.info;
    let buyNumList = [];
    buyNumList.push(info['113']);
    buyNumList.push(info['115']);
    buyNumList.push(info['117']);
    buyNumList.push(info['119']);
    buyNumList.push(info['121']);
    
    let sellNumList = [];
    sellNumList.push(info['114']);
    sellNumList.push(info['116']);
    sellNumList.push(info['118']);
    sellNumList.push(info['120']);
    sellNumList.push(info['122']);
    
    let buyPriceList = [];
    buyPriceList.push(info['101'].toFixed(1));
    buyPriceList.push(info['103'].toFixed(1));
    buyPriceList.push(info['105'].toFixed(1));
    buyPriceList.push(info['107'].toFixed(1));
    buyPriceList.push(info['109'].toFixed(1));

    let sellPriceList = [];
    sellPriceList.push(info['102'].toFixed(1));
    sellPriceList.push(info['104'].toFixed(1));
    sellPriceList.push(info['106'].toFixed(1));
    sellPriceList.push(info['108'].toFixed(1));
    sellPriceList.push(info['110'].toFixed(1));

    let buyTotal = 0;
    let sellTotal = 0;
    
    let tbody = [];
    for (let i=0 ; i<5 ; i++) {
      buyTotal += buyNumList[i];
      sellTotal += sellNumList[i];
      tbody.push(
        <tr>
          <td>{buyNumList[i]}</td>
          <td>{buyPriceList[i]}</td>
          <td>{sellPriceList[i]}</td>
          <td>{sellNumList[i]}</td>
        </tr>
      );
    }

    return (
      <div className="stock-info">
        <h4><a href="#" onClick={this.handleStockLink}>{this.props.stock.id} {this.props.stock.name}</a></h4>
        <div className="statistics">
          <div className="row">
            <div className="col-xs-6">開盤：{info['126'].toFixed(2)}</div>
            <div className="col-xs-6">漲幅：{info['185'].toFixed(2)} %</div>
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="col1">委買量 ({buyTotal})</th>
              <th className="col2">委買價</th>
              <th className="col3">委賣價</th>
              <th className="col4">委賣量 ({sellTotal})</th>
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </table>
        <div>委買賣差：{buyTotal - sellTotal}</div>
        <div>委買賣比：{(buyTotal / sellTotal).toFixed(2)}</div>
        <hr/>
        <button className="btn btn-sm btn-default" onClick={this.onBtnGoHome}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> 回列表
        </button>
      </div>
    );
  }

}

export default StockInfo;
