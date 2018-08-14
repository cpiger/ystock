import React from 'react';
import TabTable from './TabTable';
import Donate from './Donate';


class TabContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(tabKey) {
    // let tabKey = parseInt(e.target.text);
    this.props.onChangeTab(tabKey);
  }

  render() {
    let tabs = [];
    let menu = [];
    this.props.tabs.forEach((item, index) => {
      let isActive = false;
      if (item.key === this.props.currTab) {
        isActive = true;
      }
      
      tabs.push(
        <TabTable 
          key={item.key}
          tabId={`tab_table_${item.key}`}
          isActive={isActive}
          stocks={item.stocks}
          status={item.status}
          currTab={this.props.currTab}
          onDelStock={this.props.onDelStock}
          onStockInfo={this.props.onStockInfo}
          onSortEnd={this.props.onSortEnd}
        />
      );

      menu.push(
        <li className={isActive ? "active" : ""} key={item.key}>
          <a data-toggle="tab" href={`#tab_table_${item.key}`} onClick={() => this.handleClick(item.key)}>
            {item.key}
          </a>
        </li>
      );
    });
    
    // donate tab
    tabs.push(
      <Donate key={this.props.tabs.length+1} tabId={`tab_donate`} />
    );

    // donate menu
    let donateKey = this.props.tabs.length + 1;
    let isDonateActive = (this.props.currTab === donateKey);
    menu.push(
      <li className={isDonateActive ? "active" : ""} key={donateKey}>
        <a data-toggle="tab" href={'#tab_donate'} onClick={() => this.handleClick(donateKey)}>
          <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
        </a>
      </li>
    );
    
    return (
      <div className="tab-table">
        {/* <ul className="nav nav-pills nav-stacked col-xs-1">
          {menu}
        </ul>

        <div className="tab-content col-xs-11">
          {tabs}
        </div> */}

        <div className="tab-content">
          {tabs}
        </div>

        <ul className="nav nav-tabs">
          {menu}
        </ul>

      </div>
    )
  }
}

TabContainer.defaultProps = {
  tabs: [],
  currTab: 1,
  onDelStock: () => {},
  onStockInfo: () => {},
  onChangeTab: () => {}
}


export default TabContainer;