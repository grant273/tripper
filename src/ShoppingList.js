import React, {Component} from 'react';
import './App.css';
import GroceryItem from "./GroceryItem";
import List from "@material-ui/core/List";
import AddIcon from '@material-ui/icons/Add';
import CreateItemDialog from "./CreateItemDialog";
import {rank} from "./utils";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';

let _nextId = 1;

function getNextId() {
  return _nextId++;
}

function ensureIds(state) {
  let maxId = 0;
  ['thisTrip', 'needed', 'notNeeded'].forEach(key => {
    (state[key] || []).forEach(item => {
      if (item.id > maxId) maxId = item.id;
      if (item.items) {
        item.items.forEach(sub => {
          if (sub.id > maxId) maxId = sub.id;
        });
      }
    });
  });
  (state.activeBundles || []).forEach(b => {
    if (b.id > maxId) maxId = b.id;
  });

  let nextId = maxId + 1;
  ['thisTrip', 'needed', 'notNeeded'].forEach(key => {
    (state[key] || []).forEach(item => {
      if (!item.id) item.id = nextId++;
      if (item.items) {
        item.items.forEach(sub => {
          if (!sub.id) sub.id = nextId++;
        });
      }
    });
  });
  (state.activeBundles || []).forEach(b => {
    if (!b.id) b.id = nextId++;
  });

  ['thisTrip', 'needed', 'notNeeded'].forEach(key => {
    (state[key] || []).forEach(item => {
      if (item.bundle && !item.bundleId) {
        const ab = (state.activeBundles || []).find(b => b.title === item.bundle);
        if (ab) item.bundleId = ab.id;
      }
    });
  });

  _nextId = nextId;
  return state;
}

function loadState() {
  try {
    const raw = localStorage.getItem("appState");
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // corrupted localStorage — fall through to default
  }
  return null;
}

export default class ShoppingList extends Component {

  constructor(props) {
    super(props);
    this.state = loadState();
    if (this.state == null) {
      this.state = {
        showAddModal: false,
        menuElem: null,
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
    this.state = {
      ...this.state,
      thisTrip: this.state.thisTrip || [],
      needed: this.state.needed || [],
      notNeeded: this.state.notNeeded || [],
      activeBundles: this.state.activeBundles || [],
    };
    ensureIds(this.state);
  }

  changeItemTitle = (e, item, status, newTitle) => {
    this.setState(prev => ({
      [status]: prev[status].map(x =>
        x.id === item.id ? {...x, title: newTitle} : x
      ),
    }));
  };

  changeStatus = (e, item, currentStatus, newStatus) => {
    if (newStatus === 'deleted') {
      if (window.confirm(`Are you sure you want to permanently delete ${item.title}`)) {
        this.setState(prev => ({
          notNeeded: prev.notNeeded.filter(x => x.id !== item.id),
        }));
      }
      return;
    }
    if ('items' in item) {
      const bundleId = item.id;
      this.setState(prev => ({
        [currentStatus]: prev[currentStatus].filter(x => x.id !== item.id),
        [newStatus]: [...prev[newStatus], ...item.items.map(x => ({
          ...x,
          id: x.id || getNextId(),
          bundle: item.title,
          bundleId: bundleId,
        }))],
        activeBundles: [...prev.activeBundles, {id: bundleId, title: item.title, length: item.items.length}],
      }));
    } else {
      this.setState(prev => {
        let newState = {
          ...prev,
          [currentStatus]: prev[currentStatus].filter(x => x.id !== item.id),
        };
        if (rank(newStatus) < rank(currentStatus)) {
          newState[newStatus] = [item, ...prev[newStatus]];
        } else {
          newState[newStatus] = [...prev[newStatus], item];
        }

        if (newStatus === 'notNeeded' && (item.bundleId || item.bundle)) {
          const bundle = prev.activeBundles.find(x =>
            item.bundleId ? x.id === item.bundleId : x.title === item.bundle
          );
          if (bundle && newState.notNeeded.filter(x =>
            item.bundleId ? x.bundleId === bundle.id : x.bundle === bundle.title
          ).length === bundle.length) {
            const bundleItems = newState.notNeeded.filter(x =>
              item.bundleId ? x.bundleId === bundle.id : x.bundle === bundle.title
            );
            const bundleItem = {id: bundle.id, title: bundle.title, items: bundleItems};
            newState = {
              ...newState,
              activeBundles: newState.activeBundles.filter(x => x.id !== bundle.id),
              notNeeded: [bundleItem, ...newState.notNeeded.filter(x =>
                item.bundleId ? x.bundleId !== bundle.id : x.bundle !== bundle.title
              )],
            };
          }
        }
        if (newStatus === 'notNeeded') {
          newState[newStatus].sort((x, y) => x.title > y.title ? 1 : -1);
        }

        return newState;
      });
    }
  };

  onAdd = (e, newItem) => {
    newItem.id = getNextId();
    if (newItem.items) {
      newItem.items = newItem.items.map(sub => ({...sub, id: getNextId()}));
    }
    this.setState(prev => ({
      notNeeded: [...prev.notNeeded, newItem],
    }));
  };

  showInputModal = (e) => {
    this.setState({showAddModal: true})
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    localStorage.setItem('appState', JSON.stringify(this.getShoppingData()));
  };

  getShoppingData = () => {
    const appState = {};
    ['thisTrip', 'needed', 'notNeeded', 'activeBundles'].forEach((x) => {
      appState[x] = this.state[x];
    });
    return appState;
  };

  setShoppingData = (data) => {
    const appState = {};
    ['thisTrip', 'needed', 'notNeeded', 'activeBundles'].forEach((x) => {
      appState[x] = data[x] || [];
    });
    ensureIds(appState);
    this.setState(appState);
  };

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

          {this.state.editDataMode &&
              <div>
                        <textarea
                            style={{width: '100%', height: '600px'}}
                            defaultValue={JSON.stringify(this.getShoppingData(), null, 2)}
                            onBlur={e => {
                              this.setShoppingData(JSON.parse(e.target.value));
                              this.setState({editDataMode: false});
                            }}
                        >
                        </textarea>
              </div>
          }
          <div style={{display: 'flex'}}>
            <h1 style={{flexGrow: 1}}>This Trip</h1>
            <div>
              <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(e) => this.setState({menuElem: e.currentTarget})}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                  id="simple-menu"
                  anchorEl={this.state.menuElem}
                  keepMounted
                  open={Boolean(this.state.menuElem)}
                  onClose={() => this.setState({menuElem: null})}
              >
                <MenuItem onClick={(e) => {
                  this.setState({editDataMode: !this.state.editDataMode});
                }}
                >
                  Edit Data
                </MenuItem>
              </Menu>
            </div>
          </div>
          <List className="ul-this-trip">
            {
              this.state.thisTrip.map((item) => {
                return (
                    <GroceryItem key={item.id} item={item} status="thisTrip"
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
                    <GroceryItem key={item.id} item={item} status="needed"
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
                    <GroceryItem key={item.id} item={item} status="notNeeded"
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
