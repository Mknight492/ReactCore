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

            result.body
              .getReader()
              .read()
              .then(r => {
                var hmm = Utf8ArrayToStr(r.value);
                console.log(hmm);
                //hmm.json().then(res => console.log(res));
                //var hmm2 = decodeURIComponent(escape(r.value));
                //console.log(r);
                //console.log(decodeURIComponent(r));
                //r.json().then(r2 => console.log(r2));
              });

            //result.body.json().then(re => console.log(re));
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
