import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../../constants';
import NewItem from './NewItem';
import ListPopulator from './ListPopulator';

import Moment from 'react-moment'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100vw',
    },
}));


const List = props => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };
    //const classes = useStyles();
    const [itemsList, setItemsList] = React.useState([])
    const [dueBucket, setDueBucket] = React.useState([])
    const [soonBucket, setSoonBucket] = React.useState([])
    const [laterBucket, setLaterBucket] = React.useState([])
    const [farBucket, setFarBucket] = React.useState([])

    let token = localStorage.getItem('mernToken')

    useEffect(() => {
        getItems()
    }, [])


    const getItems = async () => {
        await axios.get(`${BASE_URL}/listItems`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                let items = []
                res.data.forEach(item => {
                    items.push(item)
                })
                // console.log('items: ', items)
                setItemsList(items)
                fillBuckets(items)
            })
    }
    const fillBuckets = items => {
        setDueBucket(items.filter(item => (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 <= 0))
        setSoonBucket(items.filter(item => (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 > 0 && (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 < 7))
        setLaterBucket(items.filter(item => (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 > 7 && (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 < 30))
        setFarBucket(items.filter(item => (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 > 30))

    }

    
    
    return (
        <div>
            <NewItem getItems={getItems} user={props.user}/>
        <br />
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label={`ALREADY DUE!(${dueBucket.length})`} {...a11yProps(0)} />
                        <Tab label={`Due within in the Week(${soonBucket.length})`} {...a11yProps(1)} />
                        <Tab label={`Due within 30 Days(${laterBucket.length})`} {...a11yProps(2)} />
                        <Tab label={`Dude, Fuhgeddaboudit...(${farBucket.length})`} {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <ListPopulator items={dueBucket} getItems={getItems} user={props.user}/>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <ListPopulator items={soonBucket} getItems={getItems} user={props.user}/>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <ListPopulator items={laterBucket} getItems={getItems} user={props.user}/>
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <ListPopulator items={farBucket} getItems={getItems} user={props.user}/>
                    </TabPanel>
                </SwipeableViews>
            </div>
            <br />
            <NewItem getItems={getItems} user={props.user}/>
        </div>
    )
}


export default List
