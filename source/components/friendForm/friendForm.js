import React from "react";
import PropTypes from "prop-types";
import styles from "./friendForm.css";
import Autocomplete from "react-autocomplete";

class FriendFormComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      locationTypeAhead: "",
      name: "",
      results: [],
      Locations: []
    };
  }
  getCity() {
    event.preventDefault();
    const { locationTypeAhead } = this.state;
    async function getLocation() {
      const result = await fetch(`/api/location/${locationTypeAhead}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const JSONv = await result.json();
      return JSONv;
    }
    return getLocation();
  }

  changeHandler(event) {
    let searchTerm = event.target.value;
    this.setState({ locationTypeAhead: searchTerm });
    if (!isNullOrWhiteSpace(searchTerm) && searchTerm.length >= 3) {
      getCities(event.target.value).then(result => {
        result = result.slice(0, 5);
        this.setState({ Locations: result });
        let names = result.map(location => ({ label: location.name }));
        this.setState({ results: names });
      });
    } else {
      this.setState({ results: [] });
    }
  }

  submitHandler(event) {
    event.preventDefault();
    const location = this.state.Locations.filter(L => {
      //console.log(L.name + " " + this.state.locationTypeAhead);
      //console.log(L.name ===this.state.locationTypeAhead);
      return L.name === this.state.locationTypeAhead;
    });
    submitForm(this.state.name, location[0]);
  }

  //const { testString } = this.props;
  render() {
    return (
      <div className={styles.container}>
        <form
          onSubmit={e => {
            this.submitHandler(e);
          }}
        >
          <label htmlFor="name"> Name: </label>
          <input
            name="name"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />

          <label htmlFor={"location"}> Location: </label>
          <Autocomplete
            name="location"
            getItemValue={item => item.label}
            items={[...this.state.results]}
            renderItem={(item, isHighlighted) => (
              <div
                style={{ background: isHighlighted ? "lightgray" : "white" }}
              >
                {item.label}
              </div>
            )}
            value={this.state.locationTypeAhead}
            onChange={e => this.changeHandler(e)}
            onSelect={val => this.setState({ locationTypeAhead: val })}
            key={1}
            placeholder="damn"
          />
          <button type="submit" key={2}>
            Add friend
          </button>
        </form>
      </div>
    );
  }
}

FriendFormComponent.propTypes = {};

export default FriendFormComponent;

//async function kept her instead of in redux as it only effects local state - not global app state.
async function getCities(name) {
  const result = await fetch(`/api/location?type=location&query=${name}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  const parsedResult = await result.json();
  return parsedResult;
}

//helper function
function isNullOrWhiteSpace(input) {
  if (typeof input === "undefined" || input == null) return true;

  return input.replace(/\s/g, "").length < 1;
}

async function submitForm(Name, Location) {
  const data = JSON.stringify({ Name, Location });
  const result = await fetch("/api/friend", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: data
  });
}
