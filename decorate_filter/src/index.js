import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { observable, computed, configure, action, decorate } from 'mobx'
import { observer } from 'mobx-react';
import * as serviceWorker from './serviceWorker';

configure({ enforceActions: 'observed' });

class Store {
    devList = [
        { name: 'Jack', sp: 12 },
        { name: 'Max', sp: 10 },
        { name: 'Leo', sp: 8 }
    ];
    filter: '';

    get totalSum() {
        return this.devList.reduce((sum, { sp }) => sum += sp, 0);
    };

    get topPerformer() {
        const maxSp = Math.max(...this.devList.map(({ sp }) => sp));
        return this.devList.find(({ sp, name }) => {
            if (maxSp === sp) {
                return name;
            }
        })
    };

    get filterDevelopers() {
        const matchesFilter = new RegExp(this.filter, 'i');

        return this.devList.filter(({ name }) => !this.filter || matchesFilter.test(name));
    }

    clearList() {
        this.devList = [];
    };

    addDeveloper(dev) {
        this.devList.push(dev);
    };

    updateFilter(value) {
        this.filter = value;
    }
}

decorate(Store, {
    devList: observable,
    filter: observable,
    totalSum: computed,
    topPerformer: computed,
    filterDevelopers: computed,
    clearList: action,
    addDeveloper: action,
    updateFilter: action
})
const appStore = new Store();

const Row = ({ data: { name, sp } }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{sp}</td>
        </tr>
    );
}

@observer class Table extends Component {
    render() {
        const { store } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        <td>Name:</td>
                        <td>Sp:</td>
                    </tr>
                </thead>
                <tbody>
                    {store.filterDevelopers.map((dev, i) => <Row key={i} data={dev} />)}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Team Sp:</td>
                        <td>{store.totalSum}</td>
                    </tr>
                    <tr>
                        <td>Top Performer</td>
                        <td>{store.topPerformer ? store.topPerformer.name : ''}</td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}

@observer class Controls extends Component {
    addDeveloper = () => {
        const name = prompt('The name');
        const sp = parseInt(prompt('The story points:'), 10);
        this.props.store.addDeveloper({ name, sp });
    }

    clearList = () => { this.props.store.clearList(); }

    filterDevelopers = ({ target: { value } }) => {
        this.props.store.updateFilter(value);
    }

    render() {
        return (
            <div className='controls'>
                <button onClick={this.clearList}>Clear table</button>
                <button onClick={this.addDeveloper}>Add record</button>
                <input value={this.props.store.filter} onChange={this.filterDevelopers} type="text" />
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <h1>Sprint Board:</h1>
                <Controls store={appStore} />
                <Table store={appStore} />
            </div>
        )
    }
}
ReactDOM.render(<App store={Store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
