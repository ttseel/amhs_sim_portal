import React, { useState } from "react";
import PropTypes from "prop-types";

const TestComponent = ({ myProp }) => {
  const [prop, setProp] = useState(myProp);

  const changeProp = () => {
    setProp("banana");
  };

  return (
    <div style={{ fontSize: 15 }}>
      <div>Change citron to banana</div>
      <button onClick={changeProp}>change</button>
      <div>{prop}</div>
    </div>
  );
};

TestComponent.propTypes = {
  myProp: PropTypes.string.isRequired,
};

export default TestComponent;
