import React from "react";
import { Dimmer, Loader, Image } from "semantic-ui-react";

const LoadingComponent = ({ inverted }) => {
  return (
    <div>
      <Dimmer inverted={inverted} active={true}>
        <Loader content="Loading..." />
      </Dimmer>
      <Image src="/images/wireframe/short-paragraph.png" />
    </div>
  );
};

export default LoadingComponent;
