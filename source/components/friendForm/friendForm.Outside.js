import FriendFrom from "./friendForm.container";
import OutsideClick from "../../higherOrderComponents/OutsideClick";

export default OutsideClick(FriendFrom, function() {
  console.log("boo");
});
