import React, { Component } from 'react';
import { goToPage } from '../services/Location.js';

import { getUserByLoginService } from '../Components/AuthAndRegComponents/services/getUserByLoginService.js';
import { userRegistrationService } from '../Components/AuthAndRegComponents/services/userRegistrationService.js';
import RegistrationComponent from '../Components/AuthAndRegComponents/RegistrationComponent.js';
import { checkLogin } from '../Components/AuthAndRegComponents/services/checkLogin.js';
import { checkPassword } from '../Components/AuthAndRegComponents/services/checkPassword.js';

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoginValid: null,
            registerLoginError: '',
            registerPasswordError: '',
            isPasswordValid: null,
            msg: null
        }
        this.regUser = this.regUser.bind(this)
    }

    regUser = async (login, password, passwordConfirmation) => {
        let checkInfo = checkLogin(login);
        this.setState({
            isLoginValid: checkInfo.isLoginValid,
            registerLoginError: checkInfo.registerLoginError,
            registerPasswordError: '',
            isPasswordValid: null
        });
        if (checkInfo.isLoginValid) {
            let checkInfo = checkPassword(password, passwordConfirmation);
            this.setState({
                isLoginValid: null,
                registerLoginError: '',
                registerPasswordError: checkInfo.registerPasswordError,
                isPasswordValid: checkInfo.isPasswordValid
            });
            if (checkInfo.isPasswordValid) {
                    let data = userRegistrationService(login, password);
                    console.log(data);
                    if(data.status === 500){
                        this.setState({
                            isLoginValid: false,
                            registerLoginError: 'Login is used!'
                        })
                    } else {
                        this.setState({
                            msg: 'User was registered!'
                        })
                        //goToPage('/authorization');
                    }
                
            
                return false;
            }
        }
    }

    render() {
        if (localStorage.token !== undefined) {
            goToPage('/')
        }
        return (
            <RegistrationComponent
                isLoginValid={this.state.isLoginValid}
                isPasswordValid={this.state.isPasswordValid}
                registerLoginError={this.state.registerLoginError}
                registerPasswordError={this.state.registerPasswordError}
                msg={this.state.msg} regUser={this.regUser} />
        )
    }
}

export default Registration;