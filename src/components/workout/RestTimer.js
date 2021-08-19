import React, { useEffect, useState } from "react";

const RestTimer = ({ timer, timerHandler, disableRest }) => {
  if (timer === 0) {
    disableRest();
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      timerHandler();
    }, 1000);

    return () => clearTimeout(timer);
  }, [timer, timerHandler]);

  return <p>{timer}</p>;
};

export default RestTimer;
