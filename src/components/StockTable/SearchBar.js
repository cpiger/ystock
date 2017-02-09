import React from 'react';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    // init state
    this.state = {
      query: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onBtnSearch = this.onBtnSearch.bind(this);
  }

  handleChange(e) {
    this.setState({query: e.target.value});
  }

  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" value={this.state.query} onChange={this.handleChange} placeholder="Search for..." />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.onBtnSearch}>Go!</button>
        </span>
      </div>
    );
  }

  onBtnSearch(e) {
    console.log(this.state.query);
    // this.props.onSearch(this.props.query);
  }
}

export default SearchBar;