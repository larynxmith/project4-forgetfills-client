//required
import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import SERVER_URL from '../../constants'

class  Signup extends React.Component {
state ={
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    profileUrl: ''
}

storeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value, message: ''})
}

    handleSubmit = (e) => {
        e.preventDefault()
        // send user signup data to server
        axios.post(`${SERVER_URL}/auth/signup`, this.state)
        .then(response => {
            // store Token in localStorage
            localStorage.setItem('mernToken', response.data.token)
            // update app with user info
            this.props.updateUser()
        })
        .catch(err => {
            this.setState({
                message: `${err.response.status}: ${err.response.data.message}`
            })
        })
    }
    render() {
        if (this.props.user) {
            return <Redirect to="/profile" />
        }
        return (
            <div>
                <h2>Signup</h2>
                <span className="red">{this.state.message}</span>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input name="firstname" placeholder="Your First Name" onChange={this.storeInput} />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input name="lastname" placeholder="Your Last Name" onChange={this.storeInput} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input name="email" placeholder="Your Email" onChange={this.storeInput} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" placeholder="Your Password" onChange={this.storeInput} />
                    </div>
                    <div>
                        <label>Profile Pic URL:</label>
                        <input type="url" name="profileUrl" onChange={this.storeInput}/>
                    </div>

                    <button type="submit">SIgn ME Up!</button>
                </form>
            </div>
        )
    }
}

export default Signup