import React from 'react';
import { Row, Col, Input, Button } from 'antd';

import Grabber from '../../utils/Grabber';
import {SearchStockId} from '../../utils/stocks';


const ButtonGroup = Button.Group;

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
      <div className="search-bar">
        <Row gutter={4}>
          <Col span={19}>
            <Input
              placeholder="Search for..."
              onPressEnter={this.onBtnSearch}
              onChange={this.handleChange}
            />
          </Col>
          <Col span={5}>
            <ButtonGroup>
              <Button type="primary" icon="search" onClick={this.onBtnSearch} />
              <Button type="primary" icon="reload" onClick={this.onBtnReload} />
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    );
  }

  onBtnSearch(e) {
    let stockId = SearchStockId(this.state.query);
    // console.log(`stockID: ${stockId}, query: ${this.state.query}`);
    let grabber = new Grabber(stockId);
    grabber.getStockData((err, rst) => {
      if (err) return;
      this.props.onSearch(rst);
    });
  }

  onBtnReload(e) {
    this.props.onReloadAll(this.props.stocks);
  }
}

export default SearchBar;