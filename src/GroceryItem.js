import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from '@material-ui/icons/Add';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export default class GroceryItem extends Component {
    onChangeStatus = (e, status) => {
        if (this.props.onChangeStatus) {
            this.props.onChangeStatus(e, this.props.item, status);
        }
    };

    render() {
        switch (this.props.item.status) {
            case 'notNeeded':
                return (
                    <ListItem dense button>
                        <ListItemIcon>
                            <AddIcon
                                onClick={(e) => this.onChangeStatus(e, 'needed')}
                            />
                        </ListItemIcon>
                        {this.props.item.title}
                        {/*    TODO delete from Not Needed */}
                    </ListItem>
                );
            case 'needed':
                return (
                    <ListItem dense button>
                        <ListItemIcon>
                            <AddIcon
                                onClick={(e) => this.onChangeStatus(e, 'thisTrip')}
                            />
                        </ListItemIcon>
                        <ListItemIcon>
                            <RadioButtonUncheckedIcon
                                onClick={(e) => this.onChangeStatus(e, 'notNeeded')}
                            />
                        </ListItemIcon>
                        {this.props.item.title}
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <ClearIcon
                                    onClick={(e) => this.onChangeStatus(e, 'notNeeded')}
                                />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            case 'thisTrip':
                return (
                    <ListItem>
                        <ListItemIcon>
                            <RadioButtonUncheckedIcon
                                onClick={(e) => this.onChangeStatus(e, 'notNeeded')}
                            />
                        </ListItemIcon>
                        {this.props.item.title}
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <ClearIcon
                                    onClick={(e) => this.onChangeStatus(e, 'needed')}
                                />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            default:
                throw new Error("Invalid item status type");
        }
    }
}
