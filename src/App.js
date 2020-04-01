import React, {Component} from 'react';
import './App.css';
import GroceryItem from "./GroceryItem";
import List from "@material-ui/core/List";
import AddIcon from '@material-ui/icons/Add';
import Modal from "@material-ui/core/Modal";
import CreateItemDialog from "./CreateItemDialog";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem("appState"));
        // this.state = null; // debug for resetting storage
        if (this.state == null) {
            this.state = {
                showAddModal: false,
                notNeeded: [
                    {
                        id: 11,
                        title: "Buffalo Dip",
                        items: [
                            {
                                id: 1,
                                title: "Cream Cheese Block 2x",
                            },
                            {
                                id: 2,
                                title: "Franks Red Hot",
                            },
                            {
                                id: 3,
                                title: "Ranch",
                            },
                        ],
                    },
                    {
                        id: 5,
                        title: "Bagels",
                    },
                ],
                needed: [
                    {
                        id: 4,
                        title: "Ground Beef",
                    },
                ],
                activeBundles: [],
                thisTrip: [],
            };
        }
    }

    changeStatus = (e, item, currentStatus, newStatus) => {
        if (newStatus === 'deleted') {
            if (window.confirm(`Are you sure you want to permanently delete ${item.title}`)) {
                this.setState({
                    notNeeded: this.state.notNeeded.filter(x => x !== item),
                });
            }
            return;
        }
        if ('items' in item) { //if bundle, remove the bundle and spread out items
            this.setState({
                [currentStatus]: this.state[currentStatus].filter(x => x !== item),
                [newStatus]: [...this.state[newStatus], ...item.items.map(x => {
                    return {...x, bundle: item};
                })],
                activeBundles: [...this.state.activeBundles, item],
            });
        } else {
            let newState = {
                ...this.state,
                [currentStatus]: this.state[currentStatus].filter(x => x !== item),
                [newStatus]: [...this.state[newStatus], item],
            };
            if (newStatus === 'notNeeded' && 'bundle' in item) {
                // if last bundle item is obtained, collapse items into single bundle card
                const bundle = item.bundle;
                if (newState.notNeeded.filter(x => x.bundle === bundle).length === bundle.items.length) {
                    newState = {
                        ...newState,
                        activeBundles: newState.activeBundles.filter(x => x !== bundle),
                        notNeeded: [...newState.notNeeded.filter(x => x.bundle !== bundle), bundle],
                    }
                }
            }
            this.setState(newState);
        }
    };

    onAdd = (e, newItem) => {
        this.setState({
            notNeeded: [...this.state.notNeeded, newItem],
        });
    };

    showInputModal = (e) => {
        this.setState({showAddModal: true})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem('appState', JSON.stringify(this.state));
    }

    render() {
        return (
            <div>
                <CreateItemDialog
                    open={this.state.showAddModal}
                    onClose={() => {
                        this.setState({showAddModal: false})
                    }}
                    onAdd={this.onAdd}
                >

                </CreateItemDialog>

                <h1>This Trip</h1>
                <List>
                    {
                        this.state.thisTrip.map((item) => {
                            return (
                                <GroceryItem key={item.id} item={item} status="thisTrip"
                                             onChangeStatus={this.changeStatus}/>
                            );
                        })
                    }
                </List>
                <h1>Needed</h1>
                <List>
                    {
                        this.state.needed.map((item) => {
                            return (
                                <GroceryItem key={item.id} item={item} status="needed"
                                             onChangeStatus={this.changeStatus}/>
                            );
                        })
                    }
                </List>
                <h1 className='category-header'>
                    Not Needed
                    <AddIcon onClick={this.showInputModal}/>
                </h1>
                <List>
                    {
                        this.state.notNeeded.map((item) => {
                            return (
                                <GroceryItem key={item.id} item={item} status="notNeeded"
                                             onChangeStatus={this.changeStatus}/>
                            );
                        })
                    }
                </List>
            </div>
        );
    }

}

export default App;
