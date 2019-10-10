import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../../constants';
import NewItem from './NewItem';
import Moment from 'react-moment'


const List = props => {
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
    let results = itemsList.map((item, i) => {
    
        return (
            <div key={i}>
                <h2>Forgetfill: {item.listItem}</h2>
                <h3>Last Change: <Moment fromNow unit="days">{item.lastChanged}</Moment>
                    <br /></h3>
                <h3>Next Change: <Moment fromNow unit="days">{item.nextChanged}</Moment></h3>
                <p>Details: {item.itemDetails}</p>
            
            </div>
        )
    })


    return (
        <div>
            Here will be a list of stuffs
            <div>{results}</div>
            <NewItem getItems={getItems}/>

        </div>
    )
}

export default List
