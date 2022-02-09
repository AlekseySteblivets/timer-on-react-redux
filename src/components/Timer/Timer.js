import React, { Component } from "react";
import styles from './Timer.module.css';

class Timer extends Component {
    state = {
        hours: 0,
        min: 0,
        sec: 0,
        interval: null,
        timer: '00:00:00',
    }


    timerView = () => {
        let hoursString = this.state.hours < 10 ? '0' + this.state.hours : this.state.hours;
        let minString = this.state.min < 10 ? '0' + this.state.min : this.state.min;
        let secString = this.state.sec < 10 ? '0' + this.state.sec : this.state.sec;
        let timer = hoursString + ':' + minString + ':' + secString;
        this.setState({ timer: timer, });
    }

    calculateNextTimerValues = () => {
        this.setState(prevState => ({
            sec: prevState.sec + 1
        }))
        if (this.state.sec > 59) {
            this.setState({ sec: 0 })

            this.setState(prevState => ({
                min: prevState.min + 1
            }))
        }
        if (this.state.min > 59) {
            this.setState({ min: 0 })
            this.setState(prevState => ({
                hours: prevState.hours + 1
            }))
        }
    }

    onSecondChange = () => {
        this.calculateNextTimerValues();
        this.timerView();
    };

    onClickPause = () => {
        clearInterval(this.state.interval);

    }

    onClickStart = () => {
        this.setState({ interval: setInterval(this.onSecondChange, 1000) })

    }

    onClickStop = () => {
        clearInterval(this.state.interval);
        this.setState({ timer: '00:00:00' });
        this.setState({ hours: 0 });
        this.setState({ min: 0 });
        this.setState({ sec: 0 });
    }


    render() {
        return (
            <div>
                <h1>test-task "TIMER ON REACT"</h1>
                <div className={styles.timer}>
                    <p data-value="timer-view"> {this.state.timer} </p>
                </div>
                <div>
                    <button id="start" onClick={this.onClickStart}><span className={styles.textBtn}>Start</span></button>
                    <button id="pause" onClick={this.onClickPause} ><span className={styles.textBtn}>Pause</span></button>
                    <button id="stop" onClick={this.onClickStop}><span className={styles.textBtn}>Stop</span></button>
                </div>
            </div>
        )
    }

}

export default Timer;