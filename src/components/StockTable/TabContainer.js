import React from 'react';
import TabTable from './TabTable';


class TabContainer extends React.Component {
  constructor(props) {
    super(props);

    this.tabs = [
      {},{},{}
    ];
  }

  render() {
    let tabs = [];
    let menu = [];
    this.tabs.forEach((item, index) => {
      let isActive = false;
      if (index === 0) {
        isActive = true;
      }
      
      tabs.push(
        <TabTable 
          key={index}
          tabId={`tab_table_${index}`}
          isActive={index === 0}
          stocks={this.props.stocks}
        />
      );

      menu.push(
        <li className={index === 0 ? "active" : ""} key={index}>
          <a data-toggle="tab" href={`#tab_table_${index}`}>
            <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>{index}
          </a>
        </li>
      );
    });
    
    // option menu
    menu.push(
      <li key={this.tabs.length}>
        <a data-toggle="tab" href={`#tab_table_${this.tabs.length}`}><span className="glyphicon glyphicon-cog" aria-hidden="true"></span></a>
      </li>
    );


    return (
      <div className="tab-table">
        <ul className="nav nav-tabs">
          {menu}
        </ul>
      
        <div className="tab-content">
          {tabs}
        </div>
      </div>
    )
  }
}

TabContainer.defaultProps = {
  stocks: [],
  onDelStock: () => {}
}


export default TabContainer;