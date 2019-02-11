import * as React from "react";
import createHTMLMapMarker from "./HTMLMapMarker";

const { useEffect } = React;

interface IProps {
  position: { latitude: any; longitude: any };
  mapKey: any;
  weather: string | undefined;
  zoom: number;
  style: string | undefined;
}

const MapComponent: React.FunctionComponent<IProps> = ({
  position,
  mapKey,
  weather,
  zoom,
  style
}) => {
  //stops unneccesary and visable rerender on the maps when filling in the form
  //only render the map when the position or the weather is updated
  useEffect(
    () => {
      if (position && mapKey && weather) {
        initMap();
      }
    },
    [position.latitude, position.longitude, weather]
  );

  function initMap() {
    if (weather !== undefined) {
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
      // const markerOptions = {
      //   position: {
      //     lat: center.lat + zoom * 0.008, //puts the marker above the center
      //     lng: center.lng
      //   },

      //   map: map,
      //   label: {
      //     fontFamily: "'Font Awesome 5 Free'",
      //     fontSize: "3rem",
      //     fontWeight: "900"
      //     //...textAndColor
      //   },
      //   icon: {
      //     path: google.maps.SymbolPath.CIRCLE,
      //     scale: 0.1
      //   }
      // };

      // const marker = new google.maps.Marker(markerOptions);

      const latlng = new google.maps.LatLng(
        center.lat + zoom * 0.008,
        center.lng
      );

      const marker2 = createHTMLMapMarker({
        latlng: latlng,
        map: map,
        html: weatherSelecter(weather)
      });
    }
  }
  return weather !== undefined ? (
    <div id={mapKey} className={style} />
  ) : (
    <div className={style} />
  );
};

function weatherSelecter(weather: string | undefined) {
  if (weather == "Rain" || weather == "Drizzle")
    return `<i class="rain" /> <i class="person"/>`;
  else if (weather == "Clouds")
    return `<i class="clouds"/>  <i class="person"/>`;
  else if (weather == "Clear") return `<i class="sun"/>  <i class="person"/>`;
  return { text: "\uf053\uf441\uf054", color: "rgb(49, 89, 119)" };
}

export default MapComponent;

interface IHTMLMapMarker {
  div: any;
}

//@ts-ignore
