import React from "react";
import PropTypes from "prop-types";

import styles from "./weather-page.module.scss";
import MapComponent from "../../map/map";
import Friends from "../../friends/friends.container";
import FriendForm from "../../friendForm/friendForm.container";
import { HF } from "../../../helpers";

export default function WeatherPage() {
  return (
    <div>
      <button onClick={() => HF.Appfetch("api/Authenticate/Throw500")}>
        throw500
      </button>
      <button
        onClick={() =>
          HF.AFfetch("api/Authenticate/Throw400").then(result => {
            console.log(result.body);
            console.log(
              result.body
                .getReader()
                .read()
                .then(r => {
                  var hmm = Utf8ArrayToStr(r.value);
                  hmm.json().then(res => console.log(res));
                  var hmm2 = decodeURIComponent(escape(r.value));
                  console.log(r);
                  console.log(decodeURIComponent(r));
                  r.json().then(r2 => console.log(r2));
                })
            );
            result.body.json().then(re => console.log(re));
          })
        }
      >
        throw400
      </button>
      <Friends />
    </div>
  );
}

WeatherPage.propTypes = {
  position: PropTypes.object,
  dispatchUpdatedPosition: PropTypes.func.isRequired,
  locationWeather: PropTypes.object
};

function Utf8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
        );
        break;
    }
  }

  return out;
}
