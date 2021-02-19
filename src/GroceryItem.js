import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import PropTypes from 'prop-types';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from '@material-ui/icons/Add';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from "@material-ui/core/IconButton";
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export default class GroceryItem extends Component {
    static propTypes = {
        status: PropTypes.string,
        onChangeStatus: PropTypes.func,
        onChangeItemTitle: PropTypes.func,
        item: PropTypes.shape({
            title: PropTypes.string,
        }),
    };

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

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

    editModeOn = (e) => {
        this.setState({editing: true});
    };

    onSetNotNeeded = (e) => {
        if (this.props.onChangeStatus) {
            this.props.onChangeStatus(e, this.props.item, this.props.status, 'notNeeded');
        }
    };

    onTitleEdited = (e) => {
        this.setState({editing: false});
        this.props.onChangeItemTitle && this.props.onChangeItemTitle(e, this.props.item, this.props.status, e.target.value);
    };

    render() {
        const bundleName = this.props.item.bundle ? `${this.props.item.bundle}` : undefined;
        const isBundleIcon = this.props.item.items ? <ListIcon/> : undefined;
        const addIcon = (
            <ListItemIcon>
                <AddIcon fontSize="large"
                    onClick={this.onUpgradeStatus}
                />
            </ListItemIcon>
        );

        // Anything can be downgraded, but only items not part of a bundle can be totally deleted
        const showRemoveIcon = ['needed', 'thisTrip'].includes(this.props.status) || !this.props.item.bundle;

        const checkIcon = (
            <ListItemIcon
                role="checkbox"
                aria-checked="false"
                onClick={this.onSetNotNeeded}
            >
                <RadioButtonUncheckedIcon
                />
            </ListItemIcon>
        );
        const secondaryActions = (
            <ListItemSecondaryAction >
                {this.state.editing ?
                <IconButton edge="end" aria-label="comments" onClick={() => {
                }}>
                    <CheckIcon/>
                </IconButton>
                :
                <IconButton edge="end" aria-label="comments" onClick={this.editModeOn}>
                    <EditIcon/>
                </IconButton>
                }
                {showRemoveIcon &&
                <IconButton edge="end" aria-label="comments" onClick={this.onDowngradeStatus}>
                    <ClearIcon/>
                </IconButton>
                }

            </ListItemSecondaryAction>
        );

        const editIcon = (
            <ListItemSecondaryAction onClick={this.editModeOn}>
                <IconButton edge="end" aria-label="comments">
                    <EditIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        );

        // use mousedown not click so that this event comes before the onTitleEdited event
        // and we can detect if editing mode is still on
        const onMouseDown = (e) => {
            if (this.props.status === 'notNeeded' && !this.state.editing)
                this.onUpgradeStatus(e);
        };

        let listItemContent;
        if (this.state.editing) {
            listItemContent = (
                <input
                    type="text"
                    defaultValue={this.props.item.title}
                    onBlur={this.onTitleEdited}
                    autoFocus
                />
            );
        } else {
            listItemContent = (
                <React.Fragment>
                    <div className="tripper-list-item-title">
                        {this.props.item.title} {isBundleIcon}
                    </div>
                    {bundleName &&
                    <div className="tripper-list-item-subtitle">- In&nbsp;
                        <span className="tripper-list-item-subtitle-bundle-name">{bundleName}</span>
                    </div>
                    }
                </React.Fragment>
            )
        }
        return (
            <ListItem disableGutters onMouseDown={onMouseDown}>
                {['notNeeded', 'needed'].includes(this.props.status) && addIcon}
                {['needed', 'thisTrip'].includes(this.props.status) && checkIcon}
                <div className="tripper-list-item-content">
                    {listItemContent}
                </div>
                {secondaryActions}
            </ListItem>
        );
    }
}
