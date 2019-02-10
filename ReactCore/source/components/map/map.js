import React from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash-es";

export default class MapComponent extends React.Component {
  constructor(...args) {
    super(...args);
  }
  componentDidMount() {
    const { position } = this.props;
    if (position) {
      this.initMap();
    }
  }
  componentDidUpdate() {
    const { position } = this.props;
    if (position) {
      this.initMap();
    }
  }

  //stops unneccesary and visable rerender on the maps when filling in the form
  //only render the map when the position or the weather is updated
  //
  shouldComponentUpdate(nextProps, nextState) {
    const { mapKey, weather, position } = this.props;
    if (isEqual(position, nextProps.position) && weather == nextProps.weather) {
      return false;
    } else {
      return true;
    }
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
    let mapElement = document.getElementById(mapKey);
    const map = new google.maps.Map(mapElement, mapOptions);
    const textAndColor = weatherSelecter(weather);

    //map much be created before adding a marker
    const markerOptions = {
      position: {
        lat: center.lat + zoom * 0.008, //puts the marker above the center
        lng: center.lng
      },

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
  if (weather == "Rain" || weather == "Drizzle")
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
