import React from 'react';
import moduleCss from './Reservation.module.css';

const ScenarioName = ({name, visible}) => {
  if (visible) {
    return (
      <article className={moduleCss.simulator_button_container}>
        <h4>Scenario</h4>
        {name}
      </article>
    );
  } else {
    return <div />;
  }
};

export default ScenarioName;
