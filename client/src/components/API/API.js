import React, { Component } from 'react';
import axios from 'axios';
import { dump } from '../../utils/helpers';

class API extends Component {
  state = {
    msg: 'No data yet!',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const msg = await this.fetchData();
    this.setState({ msg, isLoading: false });
  }

  fetchData = async () => {
    try {
      const { data } = await axios.get('/api/v1/test/documents');
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { msg, isLoading } = this.state;
    return <div>{isLoading ? 'Loading...' : dump(msg)}</div>;
  }
}

export default API;
