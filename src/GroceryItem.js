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
        item: PropTypes.shape({
            title: PropTypes.string,
        }),
    };

    onUpgradeStatus = (e) => {
        let newStatus;
        switch (this.props.status) {
            case 'notNeeded':
                newStatus = 'needed';
                break;
            case 'needed':
                newStatus = 'thisTrip';
                break;
            default:
                throw new Error("Cannot upgrade status of item");
        }
        if (this.props.onChangeStatus) {
            this.props.onChangeStatus(e, this.props.item, this.props.status, newStatus);
        }
    };
    onDowngradeStatus = (e) => {
        let newStatus;
        switch (this.props.status) {
            case 'thisTrip':
                newStatus = 'needed';
                break;
            case 'needed':
                newStatus = 'notNeeded';
                break;
            case 'notNeeded':
                newStatus = 'deleted';
                break;
            default:
                throw new Error("Cannot downgrade status of item");
        }
        if (this.props.onChangeStatus) {
            this.props.onChangeStatus(e, this.props.item, this.props.status, newStatus);
        }
    };

    onSetNotNeeded = (e) => {
        if (this.props.onChangeStatus) {
            this.props.onChangeStatus(e, this.props.item, this.props.status, 'notNeeded');
        }
    };

    render() {
        const inBundleIcon = this.props.item.bundle ? `(${this.props.item.bundle.title})` : undefined;
        const isBundleIcon = this.props.item.items ? <ListIcon/> : undefined;

        const addIcon = (
            <ListItemIcon>
                <AddIcon fontSize="large"
                    onClick={this.onUpgradeStatus}
                />
            </ListItemIcon>
        );
        const checkIcon = (
            <ListItemIcon>
                <RadioButtonUncheckedIcon
                    onClick={this.onSetNotNeeded}
                />
            </ListItemIcon>
        );
        const removeIcon = (
            <ListItemSecondaryAction onClick={this.onDowngradeStatus}>
                <IconButton edge="end" aria-label="comments">
                    <ClearIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        );

        const onNotNeededClick = (e) => {
            if (this.props.status === 'notNeeded')
                this.onUpgradeStatus(e);
        };

        // Anything can be downgraded, but only items not part of a bundle can be totally deleted
        const showRemoveIcon = ['needed', 'thisTrip'].includes(this.props.status) || !this.props.item.bundle;

        return (
            <ListItem onClick={onNotNeededClick}>
                {['notNeeded', 'needed'].includes(this.props.status) && addIcon}
                {['needed', 'thisTrip'].includes(this.props.status) && checkIcon}
                {this.props.item.title} {inBundleIcon} {isBundleIcon}
                {showRemoveIcon && removeIcon}
            </ListItem>
        );
    }
}
