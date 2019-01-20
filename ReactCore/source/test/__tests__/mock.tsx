import * as React from "react";

import { HF } from "helpers";
import Axios from "axios";

let mockcomponent = () => {
  const [fetchData, setfetchData] = React.useState(undefined);

  React.useEffect(() => {
    loadAPI(setfetchData);
  }, []);

  return <div>{fetchData}</div>;
};

async function loadAPI(setData) {
  let result = await HF.AppAxios({ url: "test" });
  let resobj = result as any;
  console.log(result);
  setData(resobj.data);
}

export default mockcomponent;
