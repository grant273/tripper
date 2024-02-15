import React, {Component, useState} from 'react';
import './App.css';
import GroceryItem from "./GroceryItem";
import List from "@material-ui/core/List";
import AddIcon from '@material-ui/icons/Add';
import Modal from "@material-ui/core/Modal";
import CreateItemDialog from "./CreateItemDialog";
import {rank} from "./utils";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TravelList from "./TravelList";
import ShoppingList from "./ShoppingList";


function App() {
  const [route, setRoute] = useState('shopping');
  let routeComponent;
  if (route === 'shopping') {
    routeComponent = <ShoppingList/>
  } else {
    routeComponent = <TravelList/>
  }
  return (
      <div>
        <div>
          <a href="#shopping" onClick={setRoute.bind(this, "shopping")}>Shopping</a>
          {' | '}
          <a href="#travel" onClick={setRoute.bind(this, "travel")}>Travel</a>
        </div>
        {routeComponent}
      </div>
  )
}

export default App;
