import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../../constants';
import NewItem from './NewItem';
import ListPopulator from './ListPopulator';


const List = props => {
    //const classes = useStyles();
    const [itemsList, setItemsList] = React.useState([])
    // const itemsList = []

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
                console.log('res: ', res)
                res.data.forEach(item => {
                    items.push(item)
                })
                // console.log('items: ', items)
                setItemsList(items)
            })
    }
    
        
        
    return (
        <div>
            <NewItem getItems={getItems} />
            {/* <div>{results}</div> */}
            <ListPopulator items={itemsList} />
            <NewItem getItems={getItems} />
        </div>
    )
}
    

export default List
