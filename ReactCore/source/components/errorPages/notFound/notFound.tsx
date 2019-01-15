import * as React from "react";

interface IProps {
  path: string;
}

const FourZeroFourComponent: React.SFC<IProps> = () => {
  return (
    <div>
      <h2>Error 404: Page Not Found</h2>
    </div>
  );
};

export default FourZeroFourComponent;
