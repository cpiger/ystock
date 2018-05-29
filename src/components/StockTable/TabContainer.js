import React from 'react';
import TabTable from './TabTable';


class TabContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    // this.tabs = [
    //   {stocks: []},{stocks: []},{stocks: this.props.stocks},{stocks: []},{stocks: []}
    // ];
  }

  handleClick(e) {
    console.log('cccccc', e.target.text);
    console.log(this.props.tabs);
    let idx = parseInt(e.target.text) - 1;
    this.props.onReloadStocks(idx);
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
        />
      );

      menu.push(
        <li className={isActive ? "active" : ""} key={item.key}>
          <a data-toggle="tab" href={`#tab_table_${item.key}`} onClick={this.handleClick}>
            {item.key}
          </a>
        </li>
      );
    });
    
    // option menu
    menu.push(
      <li key={this.props.tabs.length+1}>
        <a data-toggle="tab" href={`#tab_table_${this.props.tabs.length+1}`}><span className="glyphicon glyphicon-cog" aria-hidden="true"></span></a>
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
  onReloadStocks: () => {}
}


export default TabContainer;