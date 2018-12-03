import React from "react";
import PropTypes from "prop-types";
import Friend from "../../friend/friend.container";

class ApiTestPage extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: ""
    };
  }
  componentDidMount() {
    const { loadAPI } = this.props;
    loadAPI();
  }

  clickHandler() {
    const { loadAPI } = this.props;
    loadAPI();
  }

  handleFormSubmit(event) {
    const { loadAPI } = this.props;
    event.preventDefault();
    async function addTest(value) {
      const data = JSON.stringify({ testString: value });
      await fetch(`/api/testapi`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: data
      });
      loadAPI();
    }
    addTest(this.state.value);
    //this.setState({ value: "" });
  }

  render() {
    const { testArray } = this.props;
    return (
      <div>
        <h2>API Test Page</h2>
        <form onSubmit={event => this.handleFormSubmit(event)}>
          <label htmlFor="text" id="text">
            New value to add:
            <input
              type="text"
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </label>
          <input type="submit" value="submit" />
        </form>
        <h2>{this.state.isActiveId}</h2>
        {testArray &&
          Object.values(testArray).map(el => {
            return (
              <Friend
                key={el.id}
                testString={el.testString}
                clickHandler={id => this.FriendClick(id)}
                id={el.id}
              />
            );
          })}
      </div>
    );
  }
}

ApiTestPage.propTypes = {
  loadAPI: PropTypes.func.isRequired,
  addTestApi: PropTypes.func.isRequired,
  testArray: PropTypes.object
};

export default ApiTestPage;

/* 
          _.map(testArray, el => {
            return <h2> number {el.testString} </h2>;
          })
*/
