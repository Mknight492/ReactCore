import * as React from "react";

//components
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
  styles: any;
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow: React.FunctionComponent<IProps> = ({
  formRow,
  changed,
  blur,
  styles,
  onClick
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
        <>
          <label className={styles.label} htmlFor={formRow.id}>
            {formRow.label}
          </label>
          <input
            id={formRow.id}
            className={styles.input}
            key={formRow.id}
            type={formRow.type}
            value={formRow.value}
            onChange={changed}
            onBlur={() => {
              blur(formRow.id);
            }}
            onFocus={onClick}
          />
          <em className={styles.errorMessage}>{errorMessage} &nbsp; </em>
        </>
      );
      break;
    default:
      inputField = null;
  }

  return inputField;
};

export default FormRow;
