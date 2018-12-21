import React from "react";
import PropTypes from "prop-types";

export default class MapComponent extends React.Component {
  constructor(...args) {
    super(...args);
  }

  initMap() {
    const { mapKey, position, zoom, weather } = this.props;

    const center = {
      lat: position.latitude,
      lng: position.longitude
    };

    const mapOptions = {
      center: center,
      zoom: zoom || 14,
      disableDefaultUI: true
    };
    let mapelement = document.getElementById(mapKey);
    const map = new google.maps.Map(mapelement, mapOptions);
    const textAndColor = weatherSelecter(weather);

    const markerOptions = {
      position: center,
      map: map,
      label: {
        fontFamily: "'Font Awesome 5 Free'",
        fontSize: "3rem",
        fontWeight: "900",
        ...textAndColor
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 0.1
      }
    };

    const marker = new google.maps.Marker(markerOptions);
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

function weatherSelecter(weather) {
  if (weather == "Rain")
    return {
      text: "\uf73d",
      color: "rgb(49, 89, 119)"
    };
  else if (weather == "Clouds")
    return { text: "\uf0c2", color: "rgb(129, 129, 129)" };
  else if (weather == "Clear")
    return {
      text: "\uf185",
      color: "#f5d311"
    };
  return { text: "\uf053\uf441\uf054", color: "rgb(49, 89, 119)" };
}
