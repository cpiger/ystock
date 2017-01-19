import React from 'react';

class Stock  extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <tr className="Stock">
        <td>{this.props.stock.name}</td>
        <td>{this.props.stock.final}</td>
        <td>{this.props.stock.upDown}</td>
        <td>{this.props.stock.max}</td>
        <td>{this.props.stock.min}</td>
    </tr>
    );
  }
}

export default Stock;