// @flow
import React, { Component } from 'react';
import styles from './AddTimer.css';

type Props = {
  addTimer: (any) => void,
};

type State = {
  add: boolean,
  newTimer: {
    name: string,
    date: number,
  },
};

class AddTimer extends Component<Props, State> {
  state = {
    add: false,
    newTimer: {
      name: '',
      date: 0,
    },
  }
  showAdd = () => {
    this.setState({ add: true });
  }
  handleUpdate = (event: any) => {
    this.state.newTimer[event.target.name] = event.target.name === 'date' ? new Date(event.target.value).valueOf() : event.target.value;
    this.setState(this.state);
  }
  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.addTimer(this.state.newTimer);
    this.setState({
      add: false,
      newTimer: {
        name: '',
        date: 0,
      },
    });
  }
  render() {
    return <div className={styles.AddTimer}>
      {
        this.state.add ? <form className={styles.AddTimerForm} onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Name
            <input type="text" id="name" name="name" onInput={this.handleUpdate} value={this.state.newTimer.name} />
          </label>
          <label htmlFor="date">
            Date
            <input type="date" id="date" name="date" onChange={this.handleUpdate} />
          </label>
          <button type="submit">Add</button>
        </form> : <button onClick={this.showAdd}>New Timer</button>}
    </div>;
  }
}

export default AddTimer;

