import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react';


const nickName = new class userNickName {
    @observable firstname = 'tata';
    @observable age = 21;

    @computed get nickName() {
        console.log('Generate nick');
        return `${this.firstname}  ${this.age}`
    }
}

nickName.Increment = function () {
    this.age++
}

nickName.Decrement = function () {
    this.age--
}

@observer class Counter extends Component {

    handleIncrement = () => { this.props.store.Increment() }
    handleDecrement = () => { this.props.store.Decrement() }

    render() {
        return (
            <div className="App">
                <h1>{this.props.store.nickName}</h1>
                <h1>{this.props.store.age}</h1>
                <button onClick={this.handleDecrement}>-1</button>
                <button onClick={this.handleIncrement}>+1</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter store={nickName} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
