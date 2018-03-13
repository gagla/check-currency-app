import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Clock extends React.Component {
    state = {
        time: ''
    }

    componentDidMount() {
        this.clock = setInterval(() => this.tick(),
            1000
        );
    }
    //unmounting not necessary - clock ticks all the time ;)

    // componentWillUnmount() {
    //   clearInterval(this.clock);
    // }

    tick() {
        const time = new Date().toLocaleTimeString()
        this.setState({ time });
        // console.log('Actual time: ', this.state.time);
    }

    render() {
        return (
            <h4 className="text-center">current time:  {this.state.time} </h4>
        );
    }
}

export default Clock;