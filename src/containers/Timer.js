// @flow
import React, { Component } from 'react';
import styles from './Timer.css';

export type Clock = {
  ID: number,
  name: string,
  date: number,
  display: 'days' | 'hours',
};

type Props = {
  clock: Clock,
  deleteTimer: Function,
};

type State = {
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
};

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

class Timer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.clearTimer = setInterval(() => {
      this.calcTime();
    }, 1000);
  }
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
  calcTime = () => {
    const now = Date.now();
    const end = this.props.clock.date;
    const distance = end - now;
    this.setState({
      days: Math.floor(distance / day),
      hours: Math.floor((distance % day) / hour),
      minutes: Math.floor((distance % hour) / minute),
      seconds: Math.floor((distance % minute) / second),
    });
  }
  deleteTimer = () => {
    this.props.deleteTimer();
  }
  clearTimer: any;
  render() {
    return <div className={styles.Timer}>
      <span className={styles.Name}>{this.props.clock.name}</span>
      <button onClick={this.deleteTimer}>Delete</button>
      <div className={styles.Clock}>
        <span>{this.state.days} Days </span>
        <span>{this.state.hours} Hours </span>
        <span>{this.state.minutes} Minutes </span>
        <span>{this.state.seconds} Seconds</span>
      </div>
    </div>;
  }
}

export default Timer;

