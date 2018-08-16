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
    buyPriceList.push(info['101'].toFixed(2));
    buyPriceList.push(info['103'].toFixed(2));
    buyPriceList.push(info['105'].toFixed(2));
    buyPriceList.push(info['107'].toFixed(2));
    buyPriceList.push(info['109'].toFixed(2));

    let sellPriceList = [];
    sellPriceList.push(info['102'].toFixed(2));
    sellPriceList.push(info['104'].toFixed(2));
    sellPriceList.push(info['106'].toFixed(2));
    sellPriceList.push(info['108'].toFixed(2));
    sellPriceList.push(info['110'].toFixed(2));

    let buyTotal = 0;
    let sellTotal = 0;
    
    let tbody = [];
    for (let i=0 ; i<5 ; i++) {
      buyTotal += buyNumList[i];
      sellTotal += sellNumList[i];
      let buyPriceStyle = {
        color: buyPriceList[i] >= info['126'] ? 'red' : '#009900'
      };
      
      let sellPriceStyle = {
        color: sellPriceList[i] >= info['126'] ? 'red' : '#009900'
      };
      tbody.push(
        <tr key={i}>
          <td className="text-right">{buyNumList[i]}</td>
          <td className="text-center" style={buyPriceStyle}>{buyPriceList[i]}</td>
          <td className="text-center" style={sellPriceStyle}>{sellPriceList[i]}</td>
          <td>{sellNumList[i]}</td>
        </tr>
      );
    }

    return (
      <div className="stock-info">
        <h4><a href="#" onClick={this.handleStockLink}>{this.props.stock.id} {this.props.stock.name}</a></h4>
        <div className="statistics">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>開盤</th>
                <th>漲幅</th>
                <th>買價</th>
                <th>賣價</th>
                <th>振幅</th>
                <th>最高</th>
                <th>最低</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{info['126'].toFixed(2)}</td>
                <td>{info['185'].toFixed(2)}%</td>
                <td>{info['101'].toFixed(2)}</td>
                <td>{info['102'].toFixed(2)}</td>
                <td>{info['172'].toFixed(2)}%</td>
                <td>{info['130'].toFixed(2)}</td>
                <td>{info['131'].toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>成交</th>
                <th>單量</th>
                <th>漲跌</th>
                <th>總量</th>
                <th>均價</th>
                <th>昨量</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{info['125'].toFixed(2)}</td>
                <td>{info['413']}</td>
                <td>{info['184'].toFixed(2)}</td>
                <td>{info['404']}</td>
                <td>{info['471'].toFixed(2)}</td>
                <td>{info['128']}</td>
                <td>{(info['423'] / 100).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <br/>

        <div className="best5">
          <h4>最佳五檔</h4>
          <div className="row">
            <div className="col-xs-6">委買賣差：{buyTotal - sellTotal}</div>
            <div className="col-xs-6">委買賣比：{(buyTotal / sellTotal).toFixed(2)}</div>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="text-right">委買量 ({buyTotal})</th>
                <th className="text-center">委買價</th>
                <th className="text-center">委賣價</th>
                <th className="">委賣量 ({sellTotal})</th>
              </tr>
            </thead>
            <tbody>
              {tbody}
            </tbody>
          </table>
        </div>

        <hr/>
        <br/>

        <button className="btn btn-sm btn-default" onClick={this.onBtnGoHome}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> 回列表
        </button>
      </div>
    );
  }

}

export default StockInfo;
