import React, { Component } from 'react';
import '../CSS/Authorization.css';
import { goToPage } from '../services/Location.js';
import hostURL from '../services/Location.js';

class Authorization extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Login: '',
            Password: '',
            Role: 0,
            isLoginValid: null,
            authLoginError: '',
            authPasswordError: '',
            isPasswordValid: null,
            msg: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    loginhandler = (event) => {
        this.setState({
            Login: event.target.value
        })
    }
    passwordhandler = (event) => {
        this.setState({
            Password: event.target.value
        })
    }

    storeUser(token, role, login) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('login', login);
        this.token = token;
        this.role = role;
    }
    handleSubmit = (event) => {
        this.checkPassword(this.state.Password);
        if (this.checkLogin(this.state.Login) && this.checkPassword(this.state.Password)) {
            fetch(`${hostURL}/api/auth`, {
                credentials: 'same-origin',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    login: this.state.Login,
                    password: this.state.Password
                }),
            }).then(
                (res) => res.json()
            ).then(jsonData => {
            console.log("🚀 ~ file: Authorization.js ~ line 57 ~ Authorization ~ jsonData", jsonData)
                console.log(jsonData.login)
                if (jsonData.status === 403) {
                    this.setState({
                        isPasswordValid: false,
                        authPasswordError: 'Uncorrect password or login!'
                    })
                } else {
                    this.setState({
                        Login: '',
                        Password: '',
                        Role: 0,
                        msg: 'Done!'
                    })
                    this.storeUser(jsonData.token, jsonData.role[0].authority, jsonData.login)
                    goToPage('/');
                }
            }).catch((err) => console.log(err));
            event.preventDefault()
            return false;
        }
        event.preventDefault()
    }

    checkLogin(login) {
        let regex = /^[a-zA-Z0-9]+$/;
        if (login.length < 4 || login.length > 12) {
            this.setState({
                isLoginValid: false,
                authLoginError: 'Login must be more than 4 and less than 12 symbols'
            })
            return false;
        } else if (!regex.test(login)) {
            this.setState({
                isLoginValid: false,
                authLoginError: 'Login must be with correct symbols (a-Z and 0-9)'
            })
            return false;
        }
        else {
            this.setState({
                isLoginValid: true,
            })
            return true;
        }
    }
    checkPassword(password) {
        let regex = /^[a-zA-Z0-9]+$/;
        if (password.length < 4 || password.length > 12) {
            this.setState({
                isPasswordValid: false,
                authPasswordError: 'Password must be more than 4 and less than 12 symbols'
            })
            return false;
        } else if (!regex.test(password)) {
            this.setState({
                isPasswordValid: false,
                authPasswordError: 'Password must be with correct symbols (a-Z and 0-9)'
            })
            return false;
        }
        else {
            this.setState({
                isPasswordValid: true,
            })
            return true;
        }
    }


    render() {
        return (
            <div>
                <h1>Authorization</h1>
                <div className='reg-form-container'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-row'>
                            <div className='col-md-6 mb-3 reg-fix'>
                                <h1>{this.state.msg ? this.state.msg : ''}</h1>
                                <label >Login</label>
                                <input type='text' className={`form-control 
                                  ${(this.state.isLoginValid === null) ? '' :
                                        (this.state.isLoginValid) ? 'is-valid' : 'is-invalid'}`}
                                    required value={this.state.login} onChange={this.loginhandler}
                                    placeholder='Login' />
                                <div className={`${(this.state.isLoginValid) ? 'valid-feedback' : 'invalid-feedback'}`}>
                                    {`${(this.state.isLoginValid) ? 'Good' : this.state.authLoginError}`}
                                </div>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='col-md-6 mb-3 reg-fix'>
                                <label >Password</label>
                                <input type='password' className={`form-control 
                                     ${(this.state.isPasswordValid === null) ? '' :
                                        (this.state.isPasswordValid) ? 'is-valid' : 'is-invalid'}`}
                                    required
                                    onChange={this.passwordhandler}
                                    placeholder='Password' />
                                <div className={`${(this.state.isPasswordValid) ? 'valid-feedback' : 'invalid-feedback'}`}>
                                    {`${(this.state.isPasswordValid) ? 'Good' : this.state.authPasswordError}`}
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-primary' type='submit'>Sign in</button>
                    </form >
                </div>
            </div>
        )
    }
}

export default Authorization
