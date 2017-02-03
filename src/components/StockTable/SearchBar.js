import React from 'react';


const SearchBar = () => (
  <div className="input-group">
    <input type="text" className="form-control" placeholder="Search for..." />
    <span className="input-group-btn">
      <button className="btn btn-default" type="button">Go!</button>
    </span>
  </div>
);

export default SearchBar;