import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BASE_URL from '../../constants';


const List = props => {
    const [itemsList, setItemsList] = React.useState([])
    // const itemsList = []

    let token = localStorage.getItem('mernToken')

    useEffect(() => {
        itemCall()
    }, [])


    const itemCall = async () => {
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
            Here will be a list of stuffs
            <h2>Item: {itemsList.length ? itemsList[1].listItem : 'nothin yet'}</h2>
        </div>
    )
}

export default List
