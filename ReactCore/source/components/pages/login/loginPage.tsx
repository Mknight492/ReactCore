import React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { userActions } from "redux/actions";

//form components
import { returnInitalFormState } from "components/UI/inputs/loginForm";
import FormRow from "components/UI/inputs/accountInputs";
import { formUtilityActions } from "components/UI/inputs/formUtility";

//styles
import * as styles from "./loginPage.module.scss";

interface IProps {
  dispatch: any;
  loggingIn: any;
  path: string;
}

const LoginPage: React.FunctionComponent<IProps> = ({
  dispatch,
  loggingIn
}) => {
  const ONLOAD = true;
  React.useEffect(() => {
    dispatch(userActions.logout());
  }, [ONLOAD]);

  const [form, setForm] = React.useState(returnInitalFormState());
  const [isFormValid, setIsFormValid] = React.useState(false);

  function validateFormAndUpdateState(id?: string) {
    //run the form through validation
    //if passed an id then make that element as touched
    //(i.e comming from an input field handler)
    if (id) {
      form.formRows[id].touched = true;
    }

    let updatedForm = formUtilityActions.executeFormValidationAndReturnForm(
      form
    );
    //update forms state
    setForm(updatedForm);

    //then check if form is valid and update tthe state to reflect this.
    const isFormValid = formUtilityActions.checkIfFormValid(updatedForm);
    setIsFormValid(isFormValid);
    return isFormValid;
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    //NB directly mutating nested state here
    //but by calling validate form and update state after this state is appropriatly updated
    form.formRows[id].touched = true;
    form.formRows[id].value = event.target.value;
    validateFormAndUpdateState();
  }

  function onClick(id: string) {
    form.formRows[id].touched = true;
    setForm(form);
  }
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.isValid) {
      const currentFormValues = formUtilityActions.convertStateToValuesObject(
        form
      );
      console.log(currentFormValues);
      dispatch(userActions.login(currentFormValues));
    }
  };
  return (
    <>
      <div className={styles.background} />

      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.title}>Account Login</h2>
        {/*takes the form obj from state and creates a series of labels/inputs/error messages,
    thus allowing the UI/from to refelct the current state */}
        {formUtilityActions
          .convertStateToArrayOfFormObjects(form)
          .map(formRow => {
            return (
              //map over the form state
              //pass the each row its props
              // including event handlers to pass state back to friendform component
              <FormRow
                key={formRow.id + "row"}
                formRow={formRow}
                changed={e => {
                  handleChange(e, formRow.id);
                }}
                blur={validateFormAndUpdateState}
                styles={styles}
                onClick={() => {
                  onClick(formRow.id);
                }}
              />
            );
          })}
        <div className={styles.buttonBlock}>
          <button className="btn btn--small btn-primary">Login</button>
          {loggingIn && (
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          )}
          <button className="btn btn--small btn--secondary">
            <Link to="/register" style={{ color: "white" }}>
              Register
            </Link>
          </button>
        </div>
      </form>
    </>
  );
};

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export default connectedLoginPage;
