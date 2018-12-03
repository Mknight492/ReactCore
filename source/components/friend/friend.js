import React from "react";
import PropTypes from "prop-types";
import styles from "./friend.css";

class FriendComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      testString: this.props.testString
    };
  }
  changeTest(event) {
    const { loadAPI, id } = this.props;
    const { testString } = this.state;
    event.preventDefault();
    async function addTest() {
      const data = JSON.stringify({
        id,
        testString
      });
      await fetch(`/api/testapi`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: data
      });
      loadAPI();
    }
    addTest();
    //this.setState({ value: "" });
  }

  deleteTest(event) {
    const { loadAPI, id } = this.props;
    event.preventDefault();
    async function addTest() {
      await fetch(`/api/testapi/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      loadAPI();
    }
    addTest();
    //this.setState({ value: "" });
  }

  //const { testString } = this.props;
  render() {
    const { isActive, id, changeActiveTest } = this.props;
    return (
      <div className={styles.container}>
        {isActive == id ? (
          <>
            <input
              type="text"
              value={this.state.testString}
              onChange={e => this.setState({ testString: e.target.value })}
            />
            <button onClick={e => this.changeTest(e)}>Update</button>
            <button onClick={e => this.deleteTest(e)}>Delete</button>
          </>
        ) : (
          <>
            <p>
              {this.state.testString} {id} {isActive == id && "I'm Active"}
            </p>
            <button onClick={() => changeActiveTest(id)}>Change..</button>
          </>
        )}
      </div>
    );
  }
}

FriendComponent.propTypes = {
  testString: PropTypes.string.isRequired,
  isActive: PropTypes.number,
  id: PropTypes.number.isRequired,
  changeActiveTest: PropTypes.func.isRequired,
  loadAPI: PropTypes.func.isRequired
};

export default FriendComponent;
