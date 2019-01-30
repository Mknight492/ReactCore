import * as React from "react";

//redux
import { connect } from "react-redux";

//styles
import * as styles from "./typeAhead.module.scss";
import "./typeAhead.scss";
//models
import { Locations, formRow } from "models";

//helpers
import { HookHelpers } from "customHooks";
import { HF, locationHelpers } from "helpers";

interface OwnProps {
  name: string;
  suggestions: Locations[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: ((e: React.ChangeEvent<HTMLInputElement>, value: string) => void);
  onFocus: ((e: React.ChangeEvent<HTMLInputElement>, value: string) => void);
  onSelect: (value: Locations) => void;
  formRow: formRow;
  errorMessage: string | "";
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
  noTAresultsFound
}) => {
  // Event fired when the input value is changed
  const [activeSuggestion, setActiveSuggestion] = React.useState(0);

  const [showSuggestions, setshowSuggestions] = React.useState(false);

  const typeAheadRef = React.useRef(null as any);
  HookHelpers.useOutSideClick(typeAheadRef, setshowSuggestions);

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

  // Event fired when the user presses a key down
  const onKeyDown = (e: React.KeyboardEvent) => {
    // User pressed the enter key, update the input and close the
    // suggestions

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
      if (activeSuggestion + 1 >= filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    } else if (e.keyCode === 8) {
      if (formRow.value.length <= 3) {
        setshowSuggestions(false);
        return;
      }
    } else {
      setshowSuggestions(true);
    }

    if (formRow.value.length <= 1) {
      setshowSuggestions(false);
    }
  };
  let suggestionsListComponent;

  if (showSuggestions) {
    suggestionsListComponent = (
      <ul className={styles.typeAheadlist}>
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

          return (
            <li
              className={className}
              key={suggestion.Geonameid}
              onClick={e => {
                onClick(e);
                onSelect(suggestion);
              }}
            >
              <div className={styles.typeAheadlistItem} data-testid={""}>
                {Filtered[0]}
                <span className={styles.matching}>{Match && Match[0]}</span>
                {Filtered[1]}
                <span className={styles.matching}>{Match && Match[1]}</span>
                {Filtered[2]}

                <div className={styles.countryCode}>
                  {suggestion.CountryCode}
                </div>
              </div>
            </li>
          );
        })}
        {loadingTA && (
          <li>
            <div
              className={styles.typeAheadlistItem + " spinner"}
              data-testid={""}
            >
              Loading...
            </div>
          </li>
        )}
      </ul>
    );
  }

  return (
    <div className={styles.typeAhead} ref={typeAheadRef}>
      <input
        id={name}
        name={name}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={formRow.value}
        className={styles.typeAheadinput}
        onFocus={() => {
          setshowSuggestions(true);
        }}
      />
      {filteredSuggestions.length > 0 && suggestionsListComponent}
      {!showSuggestions && !noTAresultsFound && (
        <em className={styles.errorMessage}>{errorMessage}</em>
      )}
      {noTAresultsFound && <div>No Locations with that name exist </div>}
    </div>
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

function doTheHighlight(value, term) {
  // Escape any regexy type characters so they don't bugger up the other reg ex
  term = term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1");

  // Join the terms with a pipe as an 'OR'
  term = term.split(" ").join("|");

  return value.replace(
    new RegExp(
      "(?![^&;]+;)(?!<[^<>]*)(" + term + ")(?![^<>]*>)(?![^&;]+;)",
      "gi"
    ),
    "<strong>$1</strong>"
  );
}
