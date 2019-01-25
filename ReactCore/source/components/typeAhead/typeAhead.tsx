import * as React from "react";
import { Locations, formRow } from "models";
import * as styles from "./typeAhead.module.scss";

import { HF } from "helpers";

interface IProps {
  name: string;
  suggestions: Locations[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: ((e: React.ChangeEvent<HTMLInputElement>, value: string) => void);
  onFocus: ((e: React.ChangeEvent<HTMLInputElement>, value: string) => void);
  onSelect: (value: string) => void;
  formRow: formRow;
  showDropdown: any;
}

const Autocomplete: React.FunctionComponent<IProps> = ({
  suggestions,
  onChange,
  onBlur,
  onFocus,
  formRow,
  onSelect,
  name
}) => {
  // Event fired when the input value is changed
  const [activeSuggestion, setActiveSuggestion] = React.useState(0);
  const [filteredSuggestions, setfilteredSuggestions] = React.useState(
    suggestions
  );
  const [showSuggestions, setshowSuggestions] = React.useState(true);

  const onChange2 = e => {
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.Name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    setActiveSuggestion(0);
    setfilteredSuggestions(filteredSuggestions);
    setshowSuggestions(true);
  };

  // Event fired when the user clicks on a suggestion
  const onClick = e => {
    // Update the user input and reset the rest of the state
    setActiveSuggestion(0);
    setfilteredSuggestions(filteredSuggestions);
    setshowSuggestions(false);
  };

  // Event fired when the user presses a key down
  const onKeyDown = e => {
    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setshowSuggestions(false);
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
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    } else {
      setshowSuggestions(true);
    }
  };
  let suggestionsListComponent;
  //setshowSuggestions(true);
  //setuserInput(value);
  if (showSuggestions && formRow.value) {
    if (true) {
      suggestionsListComponent = (
        <ul className={styles.typeAheadlist}>
          {suggestions.map((suggestion, index) => {
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
              <>
                <li
                  className={className}
                  key={HF.formatLocation(suggestion) + Math.random()}
                  onClick={e => {
                    onClick(e);
                    onSelect(HF.formatLocation(suggestion));
                  }}
                >
                  <div className={styles.typeAheadlistItem} data-testid={""}>
                    {Filtered[0]}
                    <span className={styles.matching}>{Match && Match[0]}</span>
                    {Filtered[1]}
                    <span className={styles.matching}>{Match && Match[1]}</span>
                    {Filtered[2]}
                  </div>
                  <div>{suggestion.CountryCode}</div>
                </li>
              </>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className={styles.noSuggestions}>
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }
  return (
    <div className={styles.typeAhead}>
      <input
        id={name}
        name={name}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={formRow.value}
        className={styles.typeAheadinput}
      />
      {suggestionsListComponent}
    </div>
  );
};

export default Autocomplete;

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
