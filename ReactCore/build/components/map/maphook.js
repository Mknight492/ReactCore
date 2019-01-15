"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const { useEffect } = React;
const MapComponent = ({ position, mapKey, weather, zoom, style }) => {
    //stops unneccesary and visable rerender on the maps when filling in the form
    //only render the map when the position or the weather is updated
    useEffect(() => {
        if (position && mapKey && weather) {
            initMap();
        }
    }, [position.latitude, position.longitude, weather]);
    function initMap() {
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
                lat: center.lat + zoom * 0.008,
                lng: center.lng
            },
            map: map,
            label: Object.assign({ fontFamily: "'Font Awesome 5 Free'", fontSize: "3rem", fontWeight: "900" }, textAndColor),
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 0.1
            }
        };
        const marker = new google.maps.Marker(markerOptions);
    }
    return React.createElement("div", { id: mapKey, className: style });
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
exports.default = MapComponent;
//# sourceMappingURL=maphook.js.map