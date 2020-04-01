import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

export default class CreateItemDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'grocery',
            title: '',
            items: [],
        };
        this.titleRef = React.createRef();
        this.addBtnRef = React.createRef();

    }

    onChangeSubItem = (e, i) => {
        if (this.state.items.length === 0) {
            this.setState({
                items: [{title: e.target.value}],
            });
        } else if (i === this.state.items.length) {
            this.setState({
                items: [...this.state.items, {title: e.target.value}]
            });
        } else {
            this.setState({
                items: this.state.items.map((item, j) => {
                    if (i === j) {
                        return {title: e.target.value}
                    }
                    return item;
                }),
            });
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        const item = Object.assign({}, this.state);
        this.setState({title: ''});
        if (item.type === 'grocery') {
            delete item.items;
        } else {
            item.items = item.items.filter(x => x.title);
        }
        delete item.type;
        this.setState({
            title: '',
            items: [],
        });
        this.props.onAdd(e, item);
        this.setState({popOverAnchorEl: this.addBtnRef.current}, () => {
            setTimeout(() => this.setState({popOverAnchorEl:null}), 500);
            this.titleRef.current.focus();
        });
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <form onSubmit={this.onSubmit}>
                    <DialogTitle id="form-dialog-title">Add a New Item</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            inputRef={this.titleRef}
                            margin="dense"
                            id="name"
                            value={this.state.title}
                            onChange={(e) => {
                                this.setState({title: e.target.value})
                            }}
                            label="Item Name"
                            type="text"
                            fullWidth
                        />
                        <FormControl>
                            <RadioGroup row aria-label="position" name="position"
                                        onChange={(e) => this.setState({type: e.target.value})}
                                        defaultValue="grocery">

                                <FormControlLabel value="grocery" control={<Radio color="primary"/>} label="Grocery"/>
                                <FormControlLabel value="bundle" control={<Radio color="primary"/>} label="Bundle"/>
                            </RadioGroup>
                        </FormControl>
                        {this.state.type === 'bundle' &&
                        [...this.state.items, {title: ''}].map((item, i) => {
                            return (
                                <TextField
                                    key={i}
                                    required={i === 0}
                                    margin="dense"
                                    id="name"
                                    value={item.title}
                                    onChange={(e) => this.onChangeSubItem(e, i)}
                                    label={ i === 0 ? 'First Bundle Item' : `Next Item (optional)`}
                                    fullWidth
                                />
                            )
                        })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary">
                            Done
                        </Button>
                        <Button ref={this.addBtnRef} type="submit" color="primary">
                            Add
                        </Button>
                        <Popover
                            open = {Boolean(this.state.popOverAnchorEl)}
                            anchorEl= {this.state.popOverAnchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <Typography className="addItemPopover">Added! Click Done when finished</Typography>
                        </Popover>
                    </DialogActions>
                </form>

            </Dialog>
        );
    }
}
CreateItemDialog.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
    })),
};
