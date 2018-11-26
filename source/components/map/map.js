import React from "react";
import PropTypes from "prop-types";

export default class MapComponent extends React.Component {
  constructor(...args) {
    super(...args);
  }

  initMap() {
    const { mapKey, position } = this.props;
    const center = {
      lat: position.latitude,
      lng: position.longitude
    };

    const options = {
      center: center,
      zoom: 14
    };
    let mapelement = document.getElementById(mapKey);

    const map = new google.maps.Map(mapelement, options);
    const marker = new google.maps.Marker({
      position: center,
      map: map
    });
  }

  componentDidMount() {
    const { mapKey, position } = this.props;
    if (position) {
      this.initMap();
    }
  }
  componentDidUpdate() {
    const { mapKey, position } = this.props;
    if (position) {
      this.initMap();
    }
  }

  render() {
    const { mapKey, style } = this.props;
    return <div id={mapKey} className={style} />;
  }
}

MapComponent.propTypes = {
  mapKey: PropTypes.any,
  position: PropTypes.object,
  style: PropTypes.string
};
