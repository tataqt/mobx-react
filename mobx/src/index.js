import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { observable, computed, configure, action, decorate, when, autorun } from 'mobx'
import { observer } from 'mobx-react';
import * as serviceWorker from './serviceWorker';

configure({ enforceActions: 'observed' });

/////////////////////////////////////////////Mobx
const nickName = observable({
    firstname: 'tata',
    age: 21,

    get nickName() {
        console.log('Generate nick');
        return `${this.firstname}  ${this.age}`
    },

    increment() { this.age++ },
    decrement() { this.age-- }
}, {
    increment: action('Plus one'),
    decrement: action('Minus one')
}, {
    name: 'nickNameObservableObject'
});

when(
    () => nickName.age > 25,
    () => { alert('Count value is more than 5') }
)

autorun(() => {
    alert(`Count value is: ${nickName.age}`)
}, {
    name: 'Custom autorun',
    delay: 3000
})

const todos = observable([
    { text: 'Learn React' },
    { text: 'Learn Mobx' }
]);

@observer class Counter extends Component {

    handleIncrement = () => { this.props.store.increment() }
    handleDecrement = () => { this.props.store.decrement() }

    render() {
        return (
            <div className="App">
                <renderTable />
                <hr />
                <h1>{this.props.store.firstname}</h1>
                <h3>{this.props.store.age}</h3>
                <button onClick={this.handleDecrement}>-1</button>
                <button onClick={this.handleIncrement}>+1</button>
                <ul>
                    {todos.map(({ text }, index) => <li key={index}>{text}</li>)}
                </ul>
            </div>
        );
    }
}

todos.push({ text: 'Learn Redux' })

/////////////////////////////////////////////Decorate
// class Store {
//     devList = [
//         { name: 'Jack', sp: 12 },
//         { name: 'Max', sp: 10 },
//         { name: 'Leo', sp: 8 }
//     ];
//     filter: '';

//     get totalSum() {
//         return this.devList.reduce((sum, { sp }) => sum += sp, 0);
//     };

//     get topPerformer() {
//         const maxSp = Math.max(...this.devList.map(({ sp }) => sp));
//         return this.devList.find(({ sp, name }) => {
//             if (maxSp === sp) {
//                 return name;
//             }
//         })
//     };

//     get filterDevelopers() {
//         const matchesFilter = new RegExp(this.filter, 'i');

//         return this.devList.filter(({ name }) => !this.filter || matchesFilter.test(name));
//     }

//     clearList() {
//         this.devList = [];
//     };

//     addDeveloper(dev) {
//         this.devList.push(dev);
//     };

//     updateFilter(value) {
//         this.filter = value;
//     }
// }

// decorate(Store, {
//     devList: observable,
//     filter: observable,
//     totalSum: computed,
//     topPerformer: computed,
//     filterDevelopers: computed,
//     clearList: action,
//     addDeveloper: action,
//     updateFilter: action
// })
// const appStore = new Store();

// const Row = ({ data: { name, sp } }) => {
//     return (
//         <tr>
//             <td>{name}</td>
//             <td>{sp}</td>
//         </tr>
//     );
// }

// @observer class Table extends Component {
//     render() {
//         const { store } = this.props;

//         return (
//             <table>
//                 <thead>
//                     <tr>
//                         <td>Name:</td>
//                         <td>Sp:</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {store.filterDevelopers.map((dev, i) => <Row key={i} data={dev} />)}
//                 </tbody>
//                 <tfoot>
//                     <tr>
//                         <td>Team Sp:</td>
//                         <td>{store.totalSum}</td>
//                     </tr>
//                     <tr>
//                         <td>Top Performer</td>
//                         <td>{store.topPerformer ? store.topPerformer.name : ''}</td>
//                     </tr>
//                 </tfoot>
//             </table>
//         );
//     }
// }

// @observer class Controls extends Component {
//     addDeveloper = () => {
//         const name = prompt('The name');
//         const sp = parseInt(prompt('The story points:'), 10);
//         this.props.store.addDeveloper({ name, sp });
//     }

//     clearList = () => { this.props.store.clearList(); }

//     filterDevelopers = ({ target: { value } }) => {
//         this.props.store.updateFilter(value);
//     }

//     render() {
//         return (
//             <div className='controls'>
//                 <button onClick={this.clearList}>Clear table</button>
//                 <button onClick={this.addDeveloper}>Add record</button>
//                 <input value={this.props.store.filter} onChange={this.filterDevelopers} type="text" />
//             </div>
//         )
//     }
// }

// class App extends Component {
//     render() {
//         return (
//             <div>
//                 <h1>Sprint Board:</h1>
//                 <Controls store={appStore} />
//                 <Table store={appStore} />
//             </div>
//         )
//     }
// }

/////////////////////////////////////////////Async request

// class Store {
//     user: null;

//     getUser() {
//         fetch('https://randomuser.me/api/')
//             .then(res => res.json())
//             .then(json => {
//                 if (json.results) {
//                     this.setUser(json.results)
//                 }

//             })
//     }

//     setUser(results) {
//         this.user = results[0];
//     }
// };

// decorate(Store, {
//     user: observable,
//     getUser: action.bound,
//     setUser: action
// })

// const appStore = new Store()

// @observer class App extends Component {
//     render() {
//         const { store } = this.props;

//         return (
//             <div>
//                 <button onClick={store.getUser}>Get user</button>
//                 <h1>{store.user ? store.user.login.username : 'Default name'}</h1>
//             </div>
//         )
//     }
// }

ReactDOM.render(<Counter store={nickName} />, document.getElementById('root'));
// ReactDOM.render(<App store={Store} />, document.getElementById('root'));
//ReactDOM.render(<App store={appStore} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
