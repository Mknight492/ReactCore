import React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";

import { userActions } from "../../../redux/actions";

class HomePage extends React.Component {
  componentDidMount() {
    //this.props.getUsers();
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  render() {
    const { user, users } = this.props;
    if (user && users)
      return (
        <div className="col-md-6 col-md-offset-3">
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in with React and ASP.NET Core 2.0!!</p>
          <h3>All registered users:</h3>

          {users.loading && <em>Loading users...</em>}
          {users.error && (
            <span className="text-danger">ERROR: {users.error}</span>
          )}
          {users.items && (
            <ul>
              {users.items.map((user, index) => (
                <li key={user.id}>
                  {user.firstName + " " + user.lastName}
                  {user.deleting ? (
                    <em> - Deleting...</em>
                  ) : user.deleteError ? (
                    <span className="text-danger">
                      {" "}
                      - ERROR: {user.deleteError}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      -{" "}
                      <button onClick={this.handleDeleteUser(user.id)}>
                        Delete
                      </button>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <p>
            <Link to="/login">Logout</Link>
          </p>
        </div>
      );
    else {
      return (
        <>
          <h2> you shouldn't be here</h2>
          <h2> you shouldn't be here</h2>
          <h2> you shouldn't be here</h2>
        </>
      );
    }
  }
}

export default HomePage;
