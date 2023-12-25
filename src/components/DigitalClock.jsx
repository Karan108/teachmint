import React, { useState, useEffect } from "react";

const DigitalClock = ({ isRunning = true }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pausedTime, setPausedTime] = useState(null);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  const getTimeDifference = () => {
    if (pausedTime) {
      const difference = Math.floor((new Date() - pausedTime) / 1000);
      return new Date(currentTime.getTime() - difference * 1000);
    }
    return currentTime;
  };

  const hours = formatTimeUnit(getTimeDifference().getHours());
  const minutes = formatTimeUnit(getTimeDifference().getMinutes());
  const seconds = formatTimeUnit(getTimeDifference().getSeconds());

  return (
    <div className="p-2 text-blue-200 bg-black">
      <div className="font-bold">
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
};

export default DigitalClock;
