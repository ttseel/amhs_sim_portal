import React from 'react';

const Hello = name => {
  if (!name) {
    return;
  }
  return <div>Hello {name}</div>;
};

const Practice = () => {
  return (
    <div>
      Welcome
      <Hello name="Citron" />
    </div>
  );
};

export default Practice;
