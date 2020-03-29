import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import PropTypes from 'prop-types';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from '@material-ui/icons/Add';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from "@material-ui/core/IconButton";
import ListIcon from '@material-ui/icons/List';

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export default class GroceryItem extends Component {
    static propTypes = {
        status: PropTypes.string,
        onChangeStatus: PropTypes.func,
        item: PropTypes.shape( {
            title: PropTypes.string,
        }),
    };
    onChangeStatus = (e, status) => {
        if (this.props.onChangeStatus) {
            this.props.onChangeStatus(e, this.props.item, this.props.status, status);
        }
    };

    render() {
        const bundleIcon = this.props.item.bundle ? `(${this.props.item.bundle.title})` : undefined;
        const isBundleIcon = this.props.item.items ? <ListIcon/> : undefined;
        switch (this.props.status) {
            case 'notNeeded':
                return (
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon
                                onClick={(e) => this.onChangeStatus(e, 'needed')}
                            />
                        </ListItemIcon>
                        {this.props.item.title} {isBundleIcon}{bundleIcon}
                        {/*    TODO delete from Not Needed */}
                    </ListItem>
                );
            case 'needed':
                return (
                    <ListItem button>
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
                        {this.props.item.title} {bundleIcon}
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
                        {this.props.item.title} {bundleIcon}
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
