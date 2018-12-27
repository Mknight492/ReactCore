import React from "react";
import PropTypes from "prop-types";

/**
 * Component that alerts if you click outside of it
 */

function OutsideAlerter(WrappedComponent, clickHandler) {
  return class OutsideAlerter extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
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
      //console.log(event.closest(this.myRef.current));
      if (this.myRef && !this.myRef.current.contains(event.target)) {
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
  };
}

export default OutsideAlerter;
