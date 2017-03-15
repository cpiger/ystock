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

  render() {
    let upDownRow = <td>{this.props.stock.upDown}</td>;
    if (this.props.stock.upDown.indexOf('▽') > -1) {
      upDownRow = <td className='stock-down'>{this.props.stock.upDown}</td>;
      this.props.stock.upDown.replace('▽', '▼');
    }
    else if (this.props.stock.upDown.indexOf('△') > -1) {
      upDownRow = <td className='stock-up'>{this.props.stock.upDown}</td>;
      this.props.stock.upDown.replace('△', '▲');
    }
      
    return (
      <tr className="Stock">
        <td><a href="#" onClick={this.handleStockLink}>{this.props.stock.name}</a></td>
        <td>{this.props.stock.final}</td>
        {upDownRow}
        <td>{this.props.stock.max}</td>
        <td>{this.props.stock.min}</td>
        <td>
          <button type="button" className="btn btn-danger btn-xs" onClick={this.onBtnDelete}>
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </button>
        </td>
    </tr>
    );
  }

  onBtnDelete(e) {
    this.props.onDelStock(this.props.stock.id);
  }
}

export default Stock;