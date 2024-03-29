import React, {useEffect, useState} from 'react';
import './App.css';
import List from "@material-ui/core/List";
import AddIcon from '@material-ui/icons/Add';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ClearIcon from "@material-ui/icons/Clear";
import {H1} from "./H1";
import TripperListItem from "./TripperListItem";
import {unpack, reset, updateStatus, addItem, deleteItem} from "./reducers";


const defaultTravelItems = [
  {
    id: 1,
    name: "Tooth Brush",
    status: "unpacked",
  }, {
    id: 2,
    name: "Tooth Paste",
    status: "unpacked",
  }
]
export default function TravelList(props) {
  const [menuElem, setMenuElem] = useState();
  const [travelItems, setTravelItems] = useState(window.localStorage.getItem("travelItems") ? JSON.parse(window.localStorage.getItem("travelItems")) : defaultTravelItems);

  useEffect(() => {
    window.localStorage.setItem("travelItems", JSON.stringify(travelItems));
  }, [travelItems]);


  return <div style={{display: 'flex', flexDirection: 'column', alignItem: 'center'}}>
    <div style={{display: 'flex'}}>
      <H1 style={{flex: 1}}>Not Packed</H1>
      <IconButton
          aria-label="add"
          onClick={e => setTravelItems(addItem(travelItems))}
      >
        <AddIcon/>
      </IconButton>
      <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(e) => setMenuElem(e.currentTarget)}
      >
        <MoreVertIcon/>
      </IconButton>
      <Menu
          anchorEl={menuElem}
          keepMounted
          open={Boolean(menuElem)}
          onClose={() => setMenuElem(undefined)}
      >
        <MenuItem onClick={(e) => {
          setTravelItems(unpack(travelItems));
        }}
        >
          Unpack
        </MenuItem>
        <MenuItem onClick={() => setTravelItems(reset(travelItems))}>
          Reset All
        </MenuItem>
      </Menu>

    </div>
    <List>
      {travelItems.filter(x => x.status === "unpacked").map(x => {
        const checkIcon = (
            <ListItemIcon>
              <RadioButtonUncheckedIcon fontSize="large"
                                        onClick={e => setTravelItems(updateStatus(travelItems, x.id, "packed"))}
              />
            </ListItemIcon>
        );
        const clearIcon = (
            <ListItemIcon>
              <ClearIcon fontSize="large"
                         onClick={e => setTravelItems(updateStatus(travelItems, x.id, "notBringing"))}
              />
            </ListItemIcon>
        );
        const deleteIcon = (
            <ListItemIcon>
              <DeleteIcon fontSize="large"
                          onClick={e => {
                            if (window.confirm("Are you sure you want to delete this item permanently?")) {
                              setTravelItems(deleteItem(travelItems, x.id))
                            }
                          }}
              />
            </ListItemIcon>
        );
        return <TripperListItem travelItems={travelItems} setTravelItems={setTravelItems} key={x.id} itemData={x}
                                leftIcons={[checkIcon, clearIcon, deleteIcon]}></TripperListItem>;
      })}
    </List>
    <H1 style={{flexGrow: 1}}>Packed</H1>
    <List>
      {travelItems.filter(x => x.status === "packed").map(x => {
        const clearIcon = (
            <ListItemIcon>
              <ClearIcon fontSize="large"
                         onClick={e => setTravelItems(updateStatus(travelItems, x.id, "unpacked"))}
              />
            </ListItemIcon>
        );
        return <TripperListItem travelItems={travelItems} setTravelItems={setTravelItems} key={x.id} itemData={x}
                                leftIcons={[clearIcon]}/>;
      })}
    </List>
    <H1 style={{flexGrow: 1}}>Not Bringing</H1>
    <List>
      {travelItems.filter(x => x.status === "notBringing").map(x => {
        const addIcon = (
            <ListItemIcon>
              <AddIcon fontSize="large"
                       onClick={e => setTravelItems(updateStatus(travelItems, x.id, "unpacked"))}
              />
            </ListItemIcon>
        );
        return <TripperListItem travelItems={travelItems} setTravelItems={setTravelItems} key={x.id} itemData={x}
                                leftIcons={[addIcon]}/>
      })}

    </List>
  </div>
}
