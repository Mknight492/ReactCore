import * as React from "react";

//redux
import { connect } from "react-redux";

//styles
import * as styles from "components/friendForm/friendForm.module.scss";
import "./typeAhead.scss";
//models
import { Locations, formRow, formState } from "models";

//helpers
import { HookHelpers } from "customHooks";
import { HF, locationHelpers } from "helpers";
import useOnClickOutside from "use-onclickoutside";
import { relative } from "path";
import { debug } from "util";
import { identity, escapeRegExp } from "lodash-es";
import { countryCodeToCountry } from "helpers/countryCode";

interface OwnProps {
  name: string;
  suggestions: Locations[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (id: string) => void;
  onFocus: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  onSelect: (value: Locations) => void;
  formRow: formRow;
  errorMessage: string | "";
  formRef: React.MutableRefObject<any>;
  setFormState?: any;
}

interface DispatchProps {}
interface StateProps {
  loadingTA: boolean;
  noTAresultsFound: boolean;
}

type IProps = OwnProps & DispatchProps & StateProps;

const TypeAheadComponent: React.FunctionComponent<IProps> = ({
  suggestions,
  onChange,
  onBlur,
  onFocus,
  formRow,
  onSelect,
  errorMessage,
  name,
  loadingTA,
  noTAresultsFound,
  formRef,
  setFormState
}) => {
  //initialise variable
  let TypeAheadComponent;
  let suggestionsListComponent;

  type StringLocationsTuple = [[string, Locations | undefined], any];

  const [match, setMatch] = React.useState(false);
  const [
    taInlineSuggestion,
    setTaInlineSuggestion
  ]: StringLocationsTuple = React.useState([
    "" as string,
    undefined as Locations | undefined
  ] as [string, Locations | undefined]);

  //reCheck the typeAhead when new Locations are added
  React.useEffect(() => {
    determineTAInput("", true);
  }, [suggestions]);

  // Event fired when the input value is changed
  const [activeSuggestion, setActiveSuggestion] = React.useState(0);

  const [showSuggestions, setshowSuggestions] = React.useState(false);

  const ref = React.useRef(null as any);
  const setshowSuggestionsToFalse = () => {
    setshowSuggestions(false);
    setFormState((form: formState) => {
      form.formRows.Location.touched = true;
      return form;
    });
  };
  useOnClickOutside(ref, setshowSuggestionsToFalse);

  let filteredSuggestions = locationHelpers.uniqueLocationsList(suggestions);

  const onChange2 = e => {
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    setActiveSuggestion(0);

    setshowSuggestions(true);
  };

  // Event fired when the user clicks on a suggestion
  const onClick = e => {
    // Update the user input and reset the rest of the state
    setActiveSuggestion(0);

    setshowSuggestions(false);
  };

  //Event fired when user click on the input field
  const inputOnClick = () => {
    if (
      formRow.validation.minLength &&
      formRow.value.length >= formRow.validation.minLength
    ) {
      showSuggestions ? null : setshowSuggestions(true);
      determineTAInput("", true);
    }
  };

  // Event fired when the user presses a key down
  const onKeyDown = (e: React.KeyboardEvent) => {
    // User pressed the enter key, update the input and close the
    // suggestions
    determineTAInput("", true);
    if (e.keyCode === 13) {
      e.preventDefault();
      setActiveSuggestion(0);
      setshowSuggestions(false);
      onSelect(filteredSuggestions[activeSuggestion]);
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion >= filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
    //if backspace is pressed and the list is show in'st show erro message
    else if (e.keyCode === 8) {
      if (
        formRow.validation.minLength &&
        formRow.value.length < formRow.validation.minLength
      ) {
        setshowSuggestions(false);
        return;
      }
    }
    // if the tab key is pressed close the dropdown as per aria specs
    else if (e.keyCode === 9) {
      setshowSuggestions(false);
      return;
    }
    //the the right arrow key is pressed
    else if (e.keyCode === 39) {
      if (
        showSuggestions &&
        taInlineSuggestion &&
        match &&
        taInlineSuggestion[1]
      ) {
        onSelect(taInlineSuggestion[1]);
      }
      return;
    } else {
      setshowSuggestions(true);

      if (formRow.value.length < 1) {
        setshowSuggestions(false);
      }
    }
  };

  if (showSuggestions) {
    suggestionsListComponent = (
      <ul className={styles.typeAheadlist} ref={ref}>
        {loadingTA && (
          <li>
            <div className={styles.typeAheadlistItemLoading} data-testid={""}>
              <div className="lds-css ng-scope">
                <div className="lds-bars">
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </div>
          </li>
        )}
        {filteredSuggestions.map((suggestion, index) => {
          let className;

          // Flag the active suggestion with a class
          if (index === activeSuggestion) {
            className = styles.suggestionActive;
          }

          className =
            index === activeSuggestion
              ? styles.typeAheadlistItemactive
              : styles.typeAheadlistItem;
          let Name = suggestion.Name;
          let Match = Name.match(new RegExp(formRow.value, "gi"));
          let Filtered = Name.split(new RegExp(formRow.value, "gi"));

          let country = countryCodeToCountry(suggestion.CountryCode);
          return (
            <li
              className={className}
              key={suggestion.Geonameid}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                console.log("here");
                onClick(e);
                onSelect(suggestion);
                determineTAInput("", true);
              }}
              ref={formRef}
              onBlur={() => {}}
            >
              <div className={styles.typeAheadlistItem} data-testid={""}>
                {Filtered[0]}
                <span className={styles.matching}>{Match && Match[0]}</span>
                {Filtered[1]}
                <span className={styles.matching}>{Match && Match[1]}</span>
                {Filtered[2]}

                <div className={styles.countryCode}>{country}</div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  if (
    !noTAresultsFound &&
    !formRow.valid &&
    (!showSuggestions || suggestions.length == 0) &&
    formRow.touched
  ) {
    // display an error if no locations are found
    TypeAheadComponent = (
      <em className={styles.errorMessage}>{formRow.errorMessage} &nbsp;</em>
    );
  } else if (
    noTAresultsFound &&
    !formRow.valid &&
    !loadingTA &&
    formRow.touched
  ) {
    // display the error message if fromRom is invalid and there is no "no Locations error message"
    TypeAheadComponent = (
      <em className={styles.errorMessage}>
        No Locations with that name exist{" "}
      </em>
    );
  } else {
    //display a placeholder error container
    TypeAheadComponent = <em className={styles.errorMessage}> &nbsp; </em>;
  }

  function determineTAInput(currentKey = "", force = false) {
    if (
      (!noTAresultsFound &&
        !formRow.valid &&
        showSuggestions &&
        suggestions.length > 0 &&
        formRow.touched) ||
      force
    ) {
      const currentValue = formRow.value + currentKey;
      const re = new RegExp(`^${escapeRegExp(currentValue)}`, "i");
      let matchCount = 0;
      //go through each of the filtered suggestions
      //this is doen using a for loop so you can use "break;""
      for (let i = 0; i < filteredSuggestions.length; i++) {
        //format the location of the current index
        const currentSuggestion = HF.formatLocation(filteredSuggestions[i]);
        //determine if the start of the formated location matches the input value
        if (currentSuggestion.match(re)) {
          matchCount++;
          //let the new suggestion = the current value + the remained of the current suggestion
          const newSuggestion = currentValue + currentSuggestion.split(re)[1];
          //it must be the first match otherwise the state can infintely cycle
          //between two different matches
          if (newSuggestion != taInlineSuggestion[0] && matchCount === 1) {
            setTaInlineSuggestion([newSuggestion, filteredSuggestions[i]]);
            if (!match) {
              setMatch(true);
            }
            break;
          }
        }
        //if there are no matches and match is currently set to true- set to false
        if (matchCount === 0 && match) setMatch(false);
        if (matchCount !== 0 && !match) setMatch(true);
      }
    }
  }

  // taInlineSuggestion = match ? taInlineSuggestion : "";

  //determineTAInput("");

  return (
    <>
      <div className={styles.infrontOfLocationBlock}>
        <input
          className={styles.greySuggestion}
          value={match && showSuggestions ? taInlineSuggestion[0] : ""}
          readOnly
          autoComplete="off"
        />
        <input
          id={name}
          name={name}
          type="text"
          onChange={onChange}
          onKeyDown={e => {
            onKeyDown(e);

            if (e.keyCode !== 8) {
              determineTAInput(e.key, true);
            }
          }}
          value={formRow.value}
          className={styles.LocationInput}
          onFocus={inputOnClick}
          onBlur={() => {
            onBlur("Location");
          }}
          onClick={inputOnClick}
          //cannot use on blur as the dropdown is outside the list...
          list="suggestions"
          role="comboBox"
        />
      </div>
      <div className={styles.LocationInputContainer}>
        {/* display the list of results if there is at least 1 to display */}
        {(filteredSuggestions.length > 0 || loadingTA) &&
          suggestionsListComponent}
        {/* display the errotr message if fromRom is invalid and there is no "no Locations error message" */}{" "}
        {/* display the errotr message if fromRom is invalid and there is no "no Locations error message" */}
        {TypeAheadComponent}
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    loadingTA: state.friends.loadingTA,
    noTAresultsFound: state.friends.noTAresultsFound
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const connectedTypeAheadComponent = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps
)(TypeAheadComponent);

export default connectedTypeAheadComponent;

// function escapeRegExp(text) {
//   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// }
