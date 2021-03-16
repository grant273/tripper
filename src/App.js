import React, {Component} from 'react';
import './App.css';
import GroceryItem from "./GroceryItem";
import List from "@material-ui/core/List";
import AddIcon from '@material-ui/icons/Add';
import Modal from "@material-ui/core/Modal";
import CreateItemDialog from "./CreateItemDialog";
import {rank} from "./utils";

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
                        title: "Buffalo Dip",
                        items: [
                            {
                                title: "Cream Cheese Block 2x",
                            },
                            {
                                title: "Franks Red Hot",
                            },
                            {
                                title: "Ranch",
                            },
                        ],
                    },
                    {
                        title: "Bagels",
                    },
                ],
                needed: [
                    {
                        title: "Ground Beef",
                    },
                ],
                activeBundles: [],
                thisTrip: [],
            };
        }
    }

    changeItemTitle = (e, item, status, newTitle) => {
        const updatedItemList = this.state[status].map((x) => {
            if (x === item) {
                x.title = newTitle;
                return x;
            } else {
                return x;
            }
        });
        this.setState({[status]: updatedItemList});
    };

    changeStatus = (e, item, currentStatus, newStatus) => {
        if (newStatus === 'deleted') {
            if (window.confirm(`Are you sure you want to permanently delete ${item.title}`)) {
                this.setState({
                    notNeeded: this.state.notNeeded.filter(x => x !== item),
                });
            }
            return;
        }
        if ('items' in item) { //if bundle being added, remove the bundle and spread out items
            this.setState({
                [currentStatus]: this.state[currentStatus].filter(x => x !== item),
                [newStatus]: [...this.state[newStatus], ...item.items.map(x => {
                    return {...x, bundle: item.title};
                })],
                activeBundles: [...this.state.activeBundles, {title: item.title, length:item.items.length}],
            });
        } else {
            let newState = {
                ...this.state,
                [currentStatus]: this.state[currentStatus].filter(x => x !== item),
            };
            if (rank(newStatus) < rank(currentStatus)) {
                newState[newStatus] = [item, ...this.state[newStatus]];
            } else {
                newState[newStatus] = [...this.state[newStatus], item];
            }

            if (newStatus === 'notNeeded' && 'bundle' in item) {
                // if last bundle item is obtained, collapse items into single bundle card
                const bundle = this.state.activeBundles.find(x => x.title === item.bundle);
                if (newState.notNeeded.filter(x => x.bundle === bundle.title).length === bundle.length) {
                    const bundleItems = newState.notNeeded.filter(x => x.bundle === bundle.title);
                    const bundleItem = {title: bundle.title, items: bundleItems};
                    newState = {
                        ...newState,
                        activeBundles: newState.activeBundles.filter(x => x !== bundle),
                        notNeeded: [bundleItem, ...newState.notNeeded.filter(x => x.bundle !== bundle.title)],
                    }
                }
            }
            if (newStatus === 'notNeeded') {
                newState[newStatus].sort((x, y) => x.title > y.title ? 1 : -1);
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
                <List className="ul-this-trip">
                    {
                        this.state.thisTrip.map((item) => {
                            return (
                                <GroceryItem key={item.title + item.bundle} item={item} status="thisTrip"
                                             onChangeStatus={this.changeStatus}
                                             onChangeItemTitle={this.changeItemTitle}
                                />
                            );
                        })
                    }
                </List>
                <h1>Needed</h1>
                <List className="ul-needed">
                    {
                        this.state.needed.map((item) => {
                            return (
                                <GroceryItem key={item.title + item.bundle} item={item} status="needed"
                                             onChangeStatus={this.changeStatus}
                                             onChangeItemTitle={this.changeItemTitle}
                                />
                            );
                        })
                    }
                </List>
                <h1 className='category-header'>
                    Not Needed
                    <AddIcon onClick={this.showInputModal} className="add-btn" role="button"/>
                </h1>
                <List className="ul-not-needed">
                    {
                        this.state.notNeeded.map((item) => {
                            return (
                                <GroceryItem key={item.title + item.bundle} item={item} status="notNeeded"
                                             onChangeStatus={this.changeStatus}
                                             onChangeItemTitle={this.changeItemTitle}
                                />
                            );
                        })
                    }
                </List>
            </div>
        );
    }

}

export default App;
