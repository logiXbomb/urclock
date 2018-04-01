// @flow
import React, { Component } from 'react';
import shortid from 'shortid';
import Timer from './Timer';
import AddTimer from './AddTimer';
import type { Clock } from './Timer';
import styles from './App.css';

type Props = {};
type State = {
  clocks: Array<Clock>,
};

// App are great
// ba ba ba

const clocks = {
  getAll: () => JSON.parse(localStorage.getItem('clocks') || '[]'),
  add: (timer, callback) => {
    const allTimers = clocks.getAll();
    allTimers.push({
      ...timer,
      ID: shortid.generate(),
    });
    localStorage.setItem('clocks', JSON.stringify(allTimers));
    callback(allTimers);
  },
  delete: (ID, callback) => {
    const allTimers = clocks.getAll().filter(c => c.ID !== ID);
    localStorage.setItem('clocks', JSON.stringify(allTimers));
    callback(allTimers);
  },
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      clocks: clocks.getAll(),
    };
  }
  addTimer = (timer: any) => {
    clocks.add(timer, updatedTimers => {
      this.setState({ clocks: updatedTimers });
    });
  }
  deleteTimer = (ID: number) => () => {
    clocks.delete(ID, updatedTimers => {
      this.setState({ clocks: updatedTimers });
    });
  }
  render() {
    return <div className={styles.App}>
      <div className={styles.Timers}>
        {this.state.clocks.map(c => <Timer
          key={c.ID}
          deleteTimer={this.deleteTimer(c.ID)}
          clock={c}
        />)}
      </div>
      <AddTimer addTimer={this.addTimer} />
    </div>;
  }
}

export default App;
