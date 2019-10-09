// required
import axios from 'axios'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'


import './App.css';
import Content from './components/Content'
import Header from './components/nav/Header'
import Nav from './components/nav/Nav'
import SERVER_URL from './constants'

class App extends React.Component {
    state = {
        user: null
    }

    componentDidMount() {
        // go look for a token
        this.getUser()
    }

    getUser = () => {
        // see if there is a token 
        let token = localStorage.getItem('mernToken')

        // if ther is a token, try to use it to get the user info
        if (token) {
            console.log('token was', token)
            axios.get(`${SERVER_URL}/auth/current/user`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(response => {
                    console.log('SUCCESS', response)
                    this.setState({ user: response.data.user })
                })
                .catch(err => {
                    console.log('Error with token', err)
                })
        }
        else {
            this.setState({ user: null })
        }
    }


    render() {
        return (
            <Router>
                <div className="App">
                    <Nav updateUser={this.getUser} user={this.state.user} />
                    <Header />
                    <Content updateUser={this.getUser} user={this.state.user} />
                </div>
            </Router>
        );
    }
}

export default App;
