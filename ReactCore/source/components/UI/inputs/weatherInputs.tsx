import * as React from "react";

//components
import DatePicker from "react-datepicker";
import * as Autocomplete from "react-autocomplete";

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
  selectHandler: (value: string) => void;
}

const FormRow: React.FunctionComponent<IProps> = ({
  formRow,
  changed,
  blur,
  items = [],
  selectHandler
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
            <label className={styles.name} htmlFor="name" id="name">
              Name:
            </label>
            <input
              className={styles.input}
              key={formRow.id}
              type={formRow.type}
              value={formRow.value}
              onChange={changed}
              onBlur={blur}
            />
            <em className={styles.errorMessage}>{errorMessage}</em>
          </div>
        </div>
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
              getItemValue={item => item}
              items={items || []}
              renderItem={(item, isHighlighted) => (
                <div
                  key={item}
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
          <em className={styles.errorMessage}>{errorMessage}</em>
        </div>
      );
      break;
    default:
      inputField = null;
  }

  return <div>{inputField}</div>;
};

export default FormRow;
