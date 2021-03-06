import React from 'react';
import Grabber from '../../utils/Grabber';
import {SearchStockId} from '../../utils/stocks';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    // init state
    this.state = {
      query: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.onBtnSearch = this.onBtnSearch.bind(this);
    this.onBtnReload = this.onBtnReload.bind(this);
  }

  handleChange(e) {
    this.setState({query: e.target.value});
  }

  handleEnter(e) {
    if (e.key === 'Enter')
      this.onBtnSearch(e);
  }

  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" value={this.state.query} 
          onChange={this.handleChange} onKeyPress={this.handleEnter} placeholder="輸入台股代號/名稱" />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.onBtnSearch}>
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
          <button className="btn btn-default" type="button" onClick={this.onBtnReload}>
            <span className="glyphicon glyphicon-repeat" aria-hidden="true"></span>
          </button>
        </span>
      </div>
    );
  }

  onBtnSearch(e) {
    this.props.onSearch(this.state.query);
  }

  onBtnReload(e) {
    this.props.onReloadAll(this.props.currTab - 1);
  }
}

export default SearchBar;