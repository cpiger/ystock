import React from 'react';

class Stock  extends React.Component {
  constructor(props) {
    super(props);

    this.onBtnDelete = this.onBtnDelete.bind(this);
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
        <td>{this.props.stock.name}</td>
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