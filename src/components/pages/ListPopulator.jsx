import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import ItemSettings from './ItemSettings';
import UpdateItem from './UpdateItem';
import DeleteItem from './DeleteItem';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
        backgroundColor: 'lightblue',
        color: 'white',
    },
    column: {
        flexBasis: '33.33%',

    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const ListPopulator = props => {
    const classes = useStyles();


    return (
        <div>
            {props.items.map((item, i) => {
                return (
                    <div key={i}>
                        <div>
                            <div className={classes.root}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1c-content"
                                        id="panel1c-header"
                                    >
                                        <div className={classes.column}>
                                            <Typography className={classes.heading}>Forget-fill: {item.listItem}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>Next Change: <Moment fromNow unit="days">{item.nextChanged}</Moment></Typography>
                                        </div>
                                    </ExpansionPanelSummary>

                                    <ExpansionPanelDetails className={classes.details}>
                                        <div className={classes.column} >
                                            Details: {item.itemDetails}
                                            <DeleteItem item={item} getItems={props.getItems} user={props.user} />
                                        </div>

                                        <div className={clsx(classes.column, classes.helper)}>
                                            Last Change: <Moment fromNow unit="days">{item.lastChanged}</Moment>
                                            {item.listItem}
                                            <UpdateItem item={item} getItems={props.getItems} user={props.user} />
                                        </div>
                                        <div className={clsx(classes.column, classes.helper)}>
                                            <Typography variant="caption">
                                                Need to Order?
                                                <br />
                                                <a href={"https://www.amazon.com/s?k=" + item.listItem} className={classes.link}>
                                                    Check it out on Amazon
                                                </a>
                                            </Typography>
                                        </div>
                                    </ExpansionPanelDetails>
                                    <Divider />
                                    <ExpansionPanelActions>
                                        <ItemSettings />
                                        <Button size="small">Cancel</Button>
                                        <Button size="small" color="primary">
                                            Save
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                            </div>
                            <br />
                        </div>
                    </div>
                )
            })}
        </div>
    )


}


export default ListPopulator