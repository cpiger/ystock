import React from 'react';
import Table from './Table';


class TabTable extends React.Component {
  render() {
    let className = "tab-pane fade";
    if (this.props.isActive) {
      className += " in active";
    }

    return (
      <div id={this.props.tabId} className={className}>
        <Table stocks={this.props.stocks} onDelStock={this.props.onDelStock} />
      </div>
    )
  }
}

TabTable.defaultProps = {
  isActive: false,
  stocks: [],
  onDelStock: () => {}
}

export default TabTable;