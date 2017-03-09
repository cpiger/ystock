import React from 'react';
import Grabber from '../../utils/Grabber';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    // init state
    this.state = {
      query: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onBtnSearch = this.onBtnSearch.bind(this);
    this.onBtnReload = this.onBtnReload.bind(this);
  }

  handleChange(e) {
    this.setState({query: e.target.value});
  }

  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" value={this.state.query} onChange={this.handleChange} placeholder="Search for..." />
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
    var grabber = new Grabber(this.state.query);
    grabber.getData((err, rst) => {
      if (err) return;
      this.props.onSearch(rst);
    });
  }

  onBtnReload(e) {
    console.log('bbbbbb');
    console.log(this.props);
    this.props.onReloadAll(this.props.stocks);
  }
}

export default SearchBar;