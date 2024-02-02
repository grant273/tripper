import ListItemIcon from "@material-ui/core/ListItemIcon";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ClearIcon from "@material-ui/icons/Clear";
import ListItem from "@material-ui/core/ListItem";
import React from "react";


export default function TripperListItem({itemData, leftIcons, rightIcons}) {
  return <ListItem key={itemData.id} disableGutters>{leftIcons}{itemData.name}{rightIcons}</ListItem>;
}
