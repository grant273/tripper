import React, {useState} from 'react';
import './App.css';
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
        <div style={{marginBottom: 5}}>
          <a href="#shopping" onClick={setRoute.bind(this, "shopping")}>Shopping</a>
          {' | '}
          <a href="#travel" onClick={setRoute.bind(this, "travel")}>Travel</a>
        </div>
        {routeComponent}
      </div>
  )
}

export default App;
