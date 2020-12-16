import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const TimerWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Timer = ({ duration }) => {
  return (
    <TimerWrapper>
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
      ></CountdownCircleTimer>
    </TimerWrapper>
  );
};

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
};

export default Timer;
