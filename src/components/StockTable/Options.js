import React from 'react';


class Options extends React.Component {
  constructor(props) {
    super(props);
    
    // init state
    this.state = {
      exportData: '',
      importOverText: ''
    };

    this.onDataChange = this.onDataChange.bind(this);
    // this.handleEnter = this.handleEnter.bind(this);
    this.onBtnExport = this.onBtnExport.bind(this);
    this.onBtnImport = this.onBtnImport.bind(this);
  }

  onBtnExport(e) {
    // this.props.onSearch(this.state.query);
    let exportData = [];
    this.props.exportData.forEach((tab, index) => {
      let exportTabData = {
        key: tab.key,
        stocks: []
      };
      tab.stocks.forEach((stock) => {
        exportTabData.stocks.push({id: stock.id});
      });
      
      exportData.push(exportTabData);
    });
    this.setState({
      exportData: JSON.stringify(exportData),
      importOverText: ''
    });
  }

  onBtnImport(e) {
    let importTabs = [];
    try {
      let orgData = JSON.parse(this.state.exportData);
      orgData.forEach((tab, index) => {
        let importTab = {
          key: tab.key,
          stocks: []
        };
        
        tab.stocks.forEach((stock) => {
          let newStock = {
            id: stock.id,
            name: '匯入',
            final: '0',
            upDown: '0',
            yestorday: '0',
            max: '0',
            min: '0',
            time: '00:00'
          };
          importTab.stocks.push(newStock);
        });
  
        importTabs.push(importTab);
      });      

      this.props.onImportStocks(importTabs);
      this.setState({importOverText: '匯入完成'});
    } catch (error) {
      this.setState({importOverText: '匯入失敗'});
    }
  }

  onDataChange(e) {
    this.setState({
      exportData: e.target.value,
      importOverText: ''
    });
  }

  render() {
    let className = "tab-pane";
    if (this.props.isActive) {
      className += " active";
    }

    // data tab
    let dataTab = [];
    dataTab.push(
      <div className="opt-data" key="opt-data">
        <textarea className="export-data" value={this.state.exportData} onChange={this.onDataChange}>
        </textarea>
        <button className="btn btn-success" type="button" onClick={this.onBtnExport}>
          <span className="glyphicon glyphicon-log-out"></span>&nbsp;
          匯出
        </button>
        <span className="import-over">{this.state.importOverText}</span>
        <button className="btn btn-success pull-right" type="button" onClick={this.onBtnImport}>
        <span className="glyphicon glyphicon-log-in"></span>&nbsp;
          匯入
        </button>
      </div>
    );

    return (
      <div id={this.props.tabId} className={className}>
        <div className="options">
          <div className="tab-table tabs-left">
            <ul className="nav nav-tabs">
              {/* <li className="active">
                <a href="#opt-normal" data-toggle="tab">一般</a>
              </li> */}
              <li className="active">
                <a href="#opt-data" data-toggle="tab">資料</a>
              </li>
            </ul>

            <div className="tab-content">
              {/* <div className="tab-pane active" id="opt-normal">
                <p>還在規劃中阿...</p>
              </div> */}
              <div className="tab-pane active" id="opt-data">{dataTab}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Options.defaultProps = {
  isActive: false
};


export default Options;