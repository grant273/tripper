import ListItem from "@material-ui/core/ListItem";
import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {unpack, reset, updateStatus, updateName} from "./reducers";
import CheckIcon from "@material-ui/icons/Check";


export default function TripperListItem({itemData, leftIcons, rightIcons, editable = true, setTravelItems, travelItems}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(itemData.name);

  function onSubmit() {
    setTravelItems(updateName(travelItems, itemData.id, editValue));
    setIsEditing(false);
  }
  
  function onChange(e) {
    setEditValue(e.target.value);
  }
  
  function onKeyDown(e) {
    if(e.key === 'Enter') {
      onSubmit();
    }
  }
  
  const editIcon = isEditing ?
      <IconButton edge="end" aria-label="comments" onClick={onSubmit}>
        <CheckIcon/>
      </IconButton> 
      :
      (
      <IconButton edge="end" aria-label="comments" onClick={() => setIsEditing(true)}>
        <EditIcon/>
      </IconButton>
  );

  const text = isEditing ? <input autoFocus onKeyDown={onKeyDown} value={editValue} onChange={onChange}></input> : itemData.name;
  return <ListItem key={itemData.id} disableGutters>{leftIcons}{text}{rightIcons}{editable && editIcon}</ListItem>;
}
