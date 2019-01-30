import * as React from "react";

//components
import DatePicker from "react-datepicker";
import Autocomplete from "react-autocomplete";
import TypeAhead from "components/typeAhead/typeAhead";

//css imports
import * as styles from "../../friendForm/friendForm.module.scss";
import { FormGroup, Col, FormControl, ControlLabel } from "react-bootstrap";

//helper functions
import { HF } from "helpers";

//models
import { formRow, Locations } from "models";
import { isNull } from "util";

interface IProps {
  formRow: formRow;
  changed: (event: React.ChangeEvent<HTMLInputElement>) => void;
  blur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  items: any[];
  selectHandler: (value: Locations) => void;
  locations: Locations[];
}

export interface myAutocomplete extends Autocomplete {}

const FormRow: React.FunctionComponent<IProps> = ({
  formRow,
  changed,
  blur,
  items = [],
  selectHandler,
  locations
}) => {
  let inputField;
  let errorMessage;

  //if form is current;y invalid, requires validation and
  // has been altered by a use show the error msg
  if (!formRow.valid && formRow.validation && formRow.touched) {
    errorMessage = <em>{formRow.errorMessage}</em>;
  }
  switch (formRow.element) {
    case "input":
      inputField = (
        <div>
          <div style={{ display: "block" }}>
            <label className={styles.name} htmlFor={formRow.id} id="name">
              Name:
            </label>
            <input
              id={formRow.id}
              className={styles.input}
              key={formRow.id}
              type={formRow.type}
              value={formRow.value}
              onChange={changed}
              onBlur={blur}
              onFocus={focus}
            />
            <em className={styles.errorMessage}>{errorMessage}</em>
          </div>
        </div>
      );
      break;
    case "typeAhead":
      inputField = (
        <>
          <div>
            <label
              style={{ textAlign: "left" }}
              className={styles.location}
              htmlFor={formRow.id}
            >
              Location:
            </label>
            <TypeAhead
              name={"Location"}
              onSelect={selectHandler}
              suggestions={locations}
              onChange={changed}
              onBlur={blur}
              onFocus={focus}
              formRow={formRow}
              errorMessage={errorMessage}
            />
            {/* <div className={styles.typeAhead}>
              
              <Autocomplete
                getItemValue={item => item}
                items={items || []}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item + "TA"}
                    style={
                      {
                        //background: isHighlighted ? "lightgray" : "white"
                      }
                    }
                    className="typeAheadComponent"
                  >
                    {item}
                  </div>
                )}
                value={formRow.value}
                onChange={changed}
                onSelect={selectHandler}
              />
            </div> 
            */}
          </div>
        </>
      );
      break;
    default:
      inputField = null;
  }

  return <div>{inputField}</div>;
};

export default FormRow;
