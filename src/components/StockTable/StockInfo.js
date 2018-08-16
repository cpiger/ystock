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

  _getInfo(source, fixed=0) {
    if (source == '' || source == undefined) {
      return '-';
    }

    let result = source;
    if (fixed > 0) {
      result = source.toFixed(fixed);
    }
    return result;
  }

  render() {
    let info = this.props.stock.info;
    let buyNumList = [];
    buyNumList.push(this._getInfo(info['113']));
    buyNumList.push(this._getInfo(info['115']));
    buyNumList.push(this._getInfo(info['117']));
    buyNumList.push(this._getInfo(info['119']));
    buyNumList.push(this._getInfo(info['121']));
    
    let sellNumList = [];
    sellNumList.push(this._getInfo(info['114']));
    sellNumList.push(this._getInfo(info['116']));
    sellNumList.push(this._getInfo(info['118']));
    sellNumList.push(this._getInfo(info['120']));
    sellNumList.push(this._getInfo(info['122']));
    
    let buyPriceList = [];
    buyPriceList.push(this._getInfo(info['101'], 2));
    buyPriceList.push(this._getInfo(info['103'], 2));
    buyPriceList.push(this._getInfo(info['105'], 2));
    buyPriceList.push(this._getInfo(info['107'], 2));
    buyPriceList.push(this._getInfo(info['109'], 2));

    let sellPriceList = [];
    sellPriceList.push(this._getInfo(info['102'], 2));
    sellPriceList.push(this._getInfo(info['104'], 2));
    sellPriceList.push(this._getInfo(info['106'], 2));
    sellPriceList.push(this._getInfo(info['108'], 2));
    sellPriceList.push(this._getInfo(info['110'], 2));

    let buyTotal = 0;
    let sellTotal = 0;
    
    let tbody = [];
    for (let i=0 ; i<5 ; i++) {
      if (buyNumList[i] != '-') {
        buyTotal += buyNumList[i];
      }

      if (sellNumList[i] !== '-') {
        sellTotal += sellNumList[i];
      }     
      
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

    let buySellRatio = 0;
    if (sellTotal > 0) {
      buySellRatio = (buyTotal / sellTotal).toFixed(2);
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
                <td>{this._getInfo(info['126'], 2)}</td>
                <td>{this._getInfo(info['185'], 2)}%</td>
                <td>{this._getInfo(info['101'], 2)}</td>
                <td>{this._getInfo(info['102'], 2)}</td>
                <td>{this._getInfo(info['172'], 2)}%</td>
                <td>{this._getInfo(info['130'], 2)}</td>
                <td>{this._getInfo(info['131'], 2)}</td>
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
                <td>{this._getInfo(info['125'], 2)}</td>
                <td>{info['413']}</td>
                <td>{this._getInfo(info['184'], 2)}</td>
                <td>{info['404']}</td>
                <td>{this._getInfo(info['471'], 2)}</td>
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
            <div className="col-xs-6">委買賣比：{buySellRatio}</div>
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
