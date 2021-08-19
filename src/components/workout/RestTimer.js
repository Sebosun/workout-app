import React, { useEffect } from "react";

const RestTimer = ({ timer, timerHandler, disableRest, className }) => {
  if (timer === 0) {
    disableRest();
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      timerHandler();
    }, 1000);

    return () => clearTimeout(timer);
  }, [timer, timerHandler]);

  return (
    <div className={className}>
      <p>{timer}</p>
    </div>
  );
};

export default RestTimer;
