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
            items: [
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
                {
                    id: 3,
                    title: "Ranch",
                    status: "needed",
                }
            ],
        };
    }

    changeStatus = (e, item, status) => {
        this.setState({
            items: this.state.items.map((x) => {
                if (x === item) {
                    return {...x, status}
                }
                return x;
            }),
        });
    };

    render() {
        return (
            <div>
                <h1>This Trip</h1>
                <List>
                    {
                        this.state.items.filter(x => x.status === 'thisTrip').map((item) => {
                            return (
                                <GroceryItem item={item} onChangeStatus={this.changeStatus}/>
                            );
                        })
                    }
                </List>
                <h1>Needed</h1>
                <List>
                    {
                        this.state.items.filter(x => x.status === 'needed').map((item) => {
                            return (
                                <GroceryItem item={item} onChangeStatus={this.changeStatus}/>
                            );
                        })
                    }
                </List>
                <h1>Not Needed</h1>
                <List>
                    {
                        this.state.items.filter(x => x.status === 'notNeeded').map((item) => {
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
