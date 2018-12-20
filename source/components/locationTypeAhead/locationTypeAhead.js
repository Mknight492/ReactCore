import React from "react";
import PropTypes from "prop-types";
import Autocomplete from "react-autocomplete";
import { locationServices } from "../../redux/services";
import { helperFunctions } from "../../helpers";
class LocationTypeAhead extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      locationTypeAhead: "",
      name: "",
      results: [],
      Locations: []
    };
  }

  //const { testString } = this.props;
  render() {
    const { changeHandler, value, items, submitHandler } = this.props;
    return (
      <div>
        <label htmlFor={"location"}> Location: </label>
        <Autocomplete
          name="location"
          getItemValue={item => item.label}
          items={[...items]}
          renderItem={(item, isHighlighted) => (
            <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
              {item.label}
            </div>
          )}
          value={value}
          onChange={e => changeHandler(e)}
          onSelect={val => submitHandler(val)}
        />
      </div>
    );
  }
}

LocationTypeAhead.propTypes = {};

export default LocationTypeAhead;

//async function kept her instead of in redux as it only effects local state - not global app state.
