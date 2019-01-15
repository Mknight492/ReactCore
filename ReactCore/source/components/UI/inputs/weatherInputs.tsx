import * as React from "react";

//components
import DatePicker from "react-datepicker";
import Autocomplete from "react-autocomplete";

//css imports
import * as styles from "../../friendForm/friendForm.module.scss";
import { FormGroup, Col, FormControl, ControlLabel } from "react-bootstrap";

//helper functions
import { HF } from "../../../helpers";

const input = props => {
  let inputField = null;
  let errorMessage = null;

  if (props.invalid && props.shouldValidate && props.touched) {
    errorMessage = <em>{props.errorMessage}</em>;
  }
  switch (props.elementType) {
    case "input":
      inputField = (
        <>
          <div>
            <label className={styles.name} htmlFor="name" id="name">
              Name:
            </label>
            <input
              className={styles.input}
              key={props.id}
              type={props.type}
              value={props.value}
              onChange={props.changed}
              onBlur={props.blur}
            />
          </div>
          <em className={styles.errorMessage}>{errorMessage}</em>
        </>
      );
      break;
    case "typeAhead":
      inputField = (
        <div>
          <label
            style={{ textAlign: "left" }}
            className={styles.location}
            htmlFor={"location"}
          >
            Location:
          </label>
          <div className={styles.typeAhead}>
            {/*Needs div for custom CSS hook */}
            <Autocomplete
              name="location"
              getItemValue={item => item}
              items={props.items}
              renderItem={(item, isHighlighted) => (
                <div
                  key={item}
                  style={{
                    background: isHighlighted ? "lightgray" : "white"
                  }}
                  className="typeAheadComponent"
                >
                  {item}
                </div>
              )}
              value={props.value}
              onChange={props.changed}
              onSelect={props.selectHandler}
              onBlur={props.changed}
            />
          </div>
          <em className={styles.errorMessage}>{errorMessage}</em>
        </div>
      );
      break;
    default:
      inputField = null;
  }

  return <div>{inputField}</div>;
};

export default input;
