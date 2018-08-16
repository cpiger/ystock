import React from 'react';
import {SortableHandle} from 'react-sortable-hoc';


const DragHandle = SortableHandle(
  () => <span className="drag-handle"><span className="glyphicon glyphicon-option-vertical" aria-hidden="true"></span></span>
); // This can be any component you want


class Stock  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDel: false,
    };

    this.handleStockLink = this.handleStockLink.bind(this);
    this.onStockInfo = this.onStockInfo.bind(this);
    this.onBtnDelete = this.onBtnDelete.bind(this);
    // this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.onOver = this.onOver.bind(this);
  }

  handleStockLink(e) {
    let stockUrl = `https://tw.stock.yahoo.com/q/q?s=${this.props.stock.id}`;
    chrome.tabs.create({url: stockUrl});
  }

  onStockInfo(e) {
    this.props.onStockInfo(this.props.stock);
  }

  onBtnDelete(e) {
    this.props.onDelStock(this.props.stock.id);
  }
  
  // onHover(e) {
  //   this.setState((state) => ({showDel: true}));
  // }
  
  onLeave(e) {
    if (!this.state.showDel) return;
    this.setState((state) => ({showDel: false}));
  }
  
  onOver(e) {
    if (this.state.showDel) return;
    this.setState((state) => ({showDel: true}));
  }

  render() {
    let yday = parseFloat(this.props.stock.yestorday);
    let upDownRow = <td className="col3">{this.props.stock.upDown}</td>;
    let upDownNum = 0;
    let percent = '0%';
    if (this.props.stock.upDown.indexOf('▽') > -1 ||
        this.props.stock.upDown.indexOf('▼') > -1) {
      this.props.stock.upDown = this.props.stock.upDown.replace('▽', '▼');

      let tmp = this.props.stock.upDown;
      tmp = tmp.replace('▼', '');
      upDownNum = parseFloat(tmp);
      percent = Math.round((upDownNum / yday) * 10000) / 100.0;

      upDownRow = <td className='stock-down col3'>{this.props.stock.upDown}<br/>{percent}%</td>;
    }
    else if (this.props.stock.upDown.indexOf('△') > -1 ||
             this.props.stock.upDown.indexOf('▲') > -1) {
      this.props.stock.upDown = this.props.stock.upDown.replace('△', '▲');

      let tmp = this.props.stock.upDown;
      tmp = tmp.replace('▲', '');
      upDownNum = parseFloat(tmp);
      percent = Math.round((upDownNum / yday) * 10000) / 100.0;

      upDownRow = <td className='stock-up col3'>{this.props.stock.upDown}<br/>{percent}%</td>;
    }

    let col6 = <span className="final-col-time">{this.props.stock.time}</span>;
    if (this.state.showDel) {
      col6 = (
        <span className="final-col-btn">
          <button type="button" className="btn btn-link btn-xs stock-remove" onClick={this.onBtnDelete}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
        </span>
      );
    }
      
    return (
      <tr className="stock-row" onMouseLeave={this.onLeave} onMouseOver={this.onOver}>
        <td className="col1">
          <DragHandle />
          <span className="stock-name-col">
            <a href="#" onClick={this.handleStockLink}>
              {this.props.stock.id}<br/>{this.props.stock.name}
            </a>
            &nbsp;
            <a href="#" onClick={this.onStockInfo}>
              <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
            </a>
          </span>
          
        </td>
        <td className="col2">{this.props.stock.final}</td>
        {upDownRow}
        <td className="col4">{this.props.stock.max}</td>
        <td className="col5">{this.props.stock.min}</td>
        <td className="col6">
          {col6}
          {/* <button type="button" className="btn btn-danger btn-xs" onClick={this.onBtnDelete}>
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </button> */}

        </td>
    </tr>
    );
  }
}

export default Stock;