import React from 'react';


class Options extends React.Component {
  render() {
    let className = "tab-pane";
    if (this.props.isActive) {
      className += " active";
    }

    return (
      <div id={this.props.tabId} className={className}>
        <div className="options">
          <div className="tab-table tabs-left">
            <ul className="nav nav-tabs">
              <li className="active">
                <a href="#tab_default_1" data-toggle="tab">一般</a>
              </li>
              <li>
                <a href="#tab_default_2" data-toggle="tab">資料</a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane active" id="tab_default_1">
                <p>還在規劃中阿...</p>
              </div>
              <div className="tab-pane" id="tab_default_2">
                <p>I'm in Tab 2.</p>
              </div>
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