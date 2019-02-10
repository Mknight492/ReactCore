import * as React from "react";

//components
import DatePicker from "react-datepicker";
import Autocomplete from "react-autocomplete";
import TypeAhead from "components/typeAhead/typeAhead";

//css imports
import * as styles from "../../friendForm/friendForm.module.scss";
import { FormGroup, Col, FormControl } from "react-bootstrap";

//helper functions
import { HF } from "helpers";

//models
import { formRow, Locations } from "models";
import { isNull } from "util";

interface IProps {
  formRow: formRow;
  changed: (event: React.ChangeEvent<HTMLInputElement>) => void;
  blur: (id: string) => void;
  items: any[];
  selectHandler: (value: Locations) => void;
  locations: Locations[];
  formRef: React.MutableRefObject<any>;
  setFormState?: any;
}

export interface myAutocomplete extends Autocomplete {}

const FormRow: React.FunctionComponent<IProps> = ({
  formRow,
  changed,
  blur,
  items = [],
  selectHandler,
  locations,
  formRef,
  setFormState
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
        <div className={styles.inputBlock}>
          <label className={styles.inputLabel} htmlFor={formRow.id} id="name">
            Name:
          </label>
          <input
            id={formRow.id}
            className={styles.inputField}
            key={formRow.id}
            type={formRow.type}
            value={formRow.value}
            onChange={changed}
            onBlur={() => {
              blur(formRow.id);
            }}
            onFocus={focus}
          />
          <em className={styles.errorMessage}>{errorMessage} &nbsp; </em>
        </div>
      );
      break;
    case "typeAhead":
      inputField = (
        <div className={styles.locationBlock}>
          <label
            style={{ textAlign: "left" }}
            className={styles.locationLabel}
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
            formRef={formRef}
            setFormState={setFormState}
          />
        </div>
      );
      break;
    default:
      inputField = null;
  }

  return <div>{inputField}</div>;
};

export default FormRow;
