import ListItem from "@material-ui/core/ListItem";
import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {updateName} from "./reducers";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";


export default function TripperListItem({
                                          itemData,
                                          leftIcons,
                                          rightIcons,
                                          editable = true,
                                          setTravelItems,
                                          travelItems
                                        }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(itemData.name);

  function onSubmit() {
    setTravelItems(updateName(travelItems, itemData.id, editValue));
    setIsEditing(false);
  }

  function onCancel() {
    setIsEditing(false);
    setEditValue(itemData.name);
  }

  function onChange(e) {
    setEditValue(e.target.value);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      onSubmit();
    }
  }

  const submitChangeIcon = (
      <IconButton edge="end" aria-label="comments" onClick={onSubmit} className={`submit-btn-${itemData.id}`}>
        <CheckIcon/>
      </IconButton>
  );

  const editIcon = (
      <IconButton aria-label="comments" onClick={() => {
        setIsEditing(true);
      }}>
        <EditIcon/>
      </IconButton>
  );

  const cancelEditIcon = (
      <IconButton edge="end" aria-label="comments" onClick={onCancel}>
        <ClearIcon/>
      </IconButton>
  );

  const editInput = (
      <input style={{width: '90%', fontSize: 19.2}}
             autoFocus
             onBlur={(e) => {
               if (!e.relatedTarget || !e.relatedTarget.classList.contains(`submit-btn-${itemData.id}`)) {
                 onCancel();
               }
             }}
             onFocus={(e) => e.target.select()}
             onKeyDown={onKeyDown}
             value={editValue}
             onChange={onChange}>
      </input>
  );
  const text = isEditing ? editInput : itemData.name;
  return <ListItem key={itemData.id} disableGutters>
    {leftIcons}
    <span style={{flexGrow: 1}}>{text}</span>
    {rightIcons}{editable && !isEditing && editIcon}{editable && isEditing && submitChangeIcon}{editable && isEditing && cancelEditIcon}
  </ListItem>;
}
