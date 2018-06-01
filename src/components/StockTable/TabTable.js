import React from 'react';
import Table from './Table';


class TabTable extends React.Component {
  render() {
    let className = "tab-pane";
    if (this.props.isActive) {
      className += " active";
    }

    return (
      <div id={this.props.tabId} className={className}>
        <Table idx={this.props.tabId} stocks={this.props.stocks} status={this.props.status} onDelStock={this.props.onDelStock} />
      </div>
    )
  }
}

TabTable.defaultProps = {
  isActive: false,
  stocks: [],
  status: 'normal',
  onDelStock: () => {}
};

export default TabTable;