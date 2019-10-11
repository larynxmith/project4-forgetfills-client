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
        width: 500,
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

    let token = localStorage.getItem('mernToken')

    useEffect(() => {
        getItems()
        console.log('itemsList1: ', itemsList)
    }, [])


    const getItems = async () => {
        await axios.get(`${BASE_URL}/listItems`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                let items = []
                console.log('res: ', res)
                res.data.forEach(item => {
                    items.push(item)
                })
                // console.log('items: ', items)
                setItemsList(items)
                fillBuckets(items)
            })
    }
    let dueBucket = []
    let soonBucket = []
    let laterBucket = []
    let farBucket = []
    const fillBuckets = items => {
        dueBucket = items.filter(item => (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 <= 0)
        console.log('die: ', dueBucket)
        soonBucket = items.filter(item => (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 > 0 && (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 < 7)
        console.log('soon: ', soonBucket)
        laterBucket = items.filter(item => (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 > 7 && (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 < 30)
        console.log('later: ', laterBucket)
        farBucket = items.filter(item => (new Date(item.nextChanged).getTime() - new Date().getTime()) / 8.64e7 > 30)
        console.log('far: ', farBucket)
        
    }
    
        
        
    return (
        <div>
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
                        <Tab label="DUE!" {...a11yProps(0)} />
                        <Tab label="Due in a Week" {...a11yProps(1)} />
                        <Tab label="Due in 30 Days" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <ListPopulator items={dueBucket} />
                        
        </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <ListPopulator items={soonBucket} />
        </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <ListPopulator items={laterBucket} />
        </TabPanel>
                </SwipeableViews>
            </div>
            <NewItem getItems={getItems} />
            <ListPopulator items={itemsList} />
            <NewItem getItems={getItems} />
        </div>
    )
}
    

export default List
