import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import GroceryItem from "./GroceryItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notNeeded: [
                {
                    id: 1,
                    title: "Cream Cheese Block 2x",
                    status: "notNeeded",
                },
                {
                    id: 2,
                    title: "Franks Red Hot",
                    status: "notNeeded",
                },
            ],
            needed: [
                {
                    id: 3,
                    title: "Ranch",
                    status: "needed",
                },
            ],
            thisTrip: [],

        };
    }

    changeStatus = (e, item, newStatus) => {
        const currentStatus = item.status;
        this.setState({
            [currentStatus]: this.state[currentStatus].filter(x => x !== item),
            [newStatus]: [...this.state[newStatus], {...item, status: newStatus}],
        });
    };

    render() {
        return (
            <div>
                <h1>This Trip</h1>
                <List>
                    {
                        this.state.thisTrip.map((item) => {
                            return (
                                <GroceryItem item={item} onChangeStatus={this.changeStatus}/>
                            );
                        })
                    }
                </List>
                <h1>Needed</h1>
                <List>
                    {
                        this.state.needed.map((item) => {
                            return (
                                <GroceryItem item={item} onChangeStatus={this.changeStatus}/>
                            );
                        })
                    }
                </List>
                <h1>Not Needed</h1>
                <List>
                    {
                        this.state.notNeeded.map((item) => {
                            return (
                                <GroceryItem key={item} item={item} onChangeStatus={this.changeStatus}/>
                            );
                        })
                    }
                </List>
            </div>
        );
    }

}

export default App;
