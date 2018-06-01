import React from 'react';

class Stock  extends React.Component {
  constructor(props) {
    super(props);

    this.handleStockLink = this.handleStockLink.bind(this);
    this.onBtnDelete = this.onBtnDelete.bind(this);
  }

  handleStockLink(e) {
    let stockUrl = `https://tw.stock.yahoo.com/q/q?s=${this.props.stock.id}`;
    chrome.tabs.create({url: stockUrl});
  }

  onBtnDelete(e) {
    this.props.onDelStock(this.props.stock.id);
  }

  render() {
    let yday = parseFloat(this.props.stock.yestorday);
    let upDownRow = <td>{this.props.stock.upDown}</td>;
    let upDownNum = 0;
    let percent = '0%';
    if (this.props.stock.upDown.indexOf('▽') > -1 ||
        this.props.stock.upDown.indexOf('▼') > -1) {
      this.props.stock.upDown = this.props.stock.upDown.replace('▽', '▼');

      let tmp = this.props.stock.upDown;
      tmp = tmp.replace('▼', '');
      upDownNum = parseFloat(tmp);
      percent = Math.round((upDownNum / yday) * 10000) / 100.0;

      upDownRow = <td className='stock-down'>{this.props.stock.upDown}<br/>{percent}%</td>;
    }
    else if (this.props.stock.upDown.indexOf('△') > -1 ||
             this.props.stock.upDown.indexOf('▲') > -1) {
      this.props.stock.upDown = this.props.stock.upDown.replace('△', '▲');

      let tmp = this.props.stock.upDown;
      tmp = tmp.replace('▲', '');
      upDownNum = parseFloat(tmp);
      percent = Math.round((upDownNum / yday) * 10000) / 100.0;

      upDownRow = <td className='stock-up'>{this.props.stock.upDown}<br/>{percent}%</td>;
    }
      
    return (
      <tr className="Stock">
        <td>
          <a href="#" onClick={this.handleStockLink}>
            {this.props.stock.id}<br/>{this.props.stock.name}
          </a>
        </td>
        <td>{this.props.stock.final}</td>
        {upDownRow}
        <td>{this.props.stock.max}</td>
        <td>{this.props.stock.min}</td>
        <td>
          <button type="button" className="btn btn-danger btn-xs" onClick={this.onBtnDelete}>
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </button>
            {/*<span className="stock-up"><i className="glyphicon glyphicon-trash" aria-hidden="true"></i></span>*/}
        </td>
    </tr>
    );
  }
}

export default Stock;