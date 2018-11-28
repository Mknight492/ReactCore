import React from "react";
import PropTypes from "prop-types";

class ApiTestPage extends React.Component {
  constructor(...args) {
    super(...args);
  }
  componentDidMount() {
    const { loadAPI } = this.props;
    loadAPI();
  }

  clickHandler() {
    const { loadAPI } = this.props;
    loadAPI();
  }

  render() {
    const { testArray } = this.props;
    return (
      <div>
        <h2>API Test Page</h2>
        <button
          onClick={() => {
            this.clickHandler();
          }}
        >
          Load API data
        </button>
        <input />
        <button> add new data to database </button>
        {testArray && testArray.map(el => <h2> {el} </h2>)}
      </div>
    );
  }
}

ApiTestPage.propTypes = {
  loadAPI: PropTypes.func.isRequired,
  testArray: PropTypes.array
};

export default ApiTestPage;
