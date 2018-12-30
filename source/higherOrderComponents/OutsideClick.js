import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { friendActions } from "../redux/actions";
import { curry } from "lodash";
/**
 * Component that alerts if you click outside of it
 */

const OutsideAlerterCurried = curry(function OutsideAlerter(
  WrappedComponent,
  clickHandler
) {
  class OutsideAlert extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
      document.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener("click", this.handleClickOutside);
    }

    componentDidUpdate() {
      //console.log(this.myRef.current);
    }
    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
      this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
      if (
        this.myRef &&
        !this.myRef.current.contains(event.target) &&
        event.target.className != "typeAheadComponent"
      ) {
        console.log(event.target);
        //console.log(this.myRef.current);
        clickHandler();
      }
    }

    render() {
      return (
        <div ref={this.myRef}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
  function mapStateToProps(state) {
    return {};
  }

  function mapDispatchToProps(dispatch) {
    return {};
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(OutsideAlert);
});

export default OutsideAlerterCurried;
