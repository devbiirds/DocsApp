import React, { Component } from 'react';

import { Container, Form } from 'react-bootstrap';
import { goToPage } from '../../services/Location.js';

const validStyle = 'is-valid';
const inValidStyle = 'is-invalid';
const validFeedbackStyle = 'valid-feedback';
const inValidFeedbackStyle = 'invalid-feedback';
const successFontStyle = 'auth-font-success';
const errorFontStyle = 'auth-font-err';

export default class RegistrationComponent extends Component {
    state = {
        login: '',
        password: '',
        passwordConfirmation: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.regUser(this.state.login, this.state.password, this.state.passwordConfirmation);
    }

    loginHandler = (event) => {
        this.setState({
            login: event.target.value
        })
    }
    passwordHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    passwordConfirmationHandler = (event) => {
        this.setState({
            passwordConfirmation: event.target.value
        })
    }

    render() {
        const { isLoginValid, isPasswordValid, registerLoginError, registerPasswordError, msg } = this.props;
        const loginValidStyle = (isLoginValid === null) ? '' :
            (isLoginValid) ? validStyle : inValidStyle;
        const loginValidFeedBackStyle = (isLoginValid) ? `${validFeedbackStyle} ${successFontStyle}` :
            `${inValidFeedbackStyle} ${errorFontStyle}`;
        const passwordValidStyle = (isPasswordValid === null) ? '' :
            (isPasswordValid) ? validStyle : inValidStyle;
        const passwordValidFeedBackStyle = (isPasswordValid) ? `${validFeedbackStyle} ${successFontStyle}` :
            `${inValidFeedbackStyle} ${errorFontStyle}`;

        return (
            <Container>
                <h1 className='auth-header'>User registration</h1>
                <h1 className='auth-header'>{msg}</h1>
                <div className='reg-body' style={{ background_size: 'cover' }}>
                    <div className='reg-form-body'>
                        <div className='auth-form-box'>
                            <Form className='reg-form-group' onSubmit={this.handleSubmit}>
                                <Form.Group className='no-margin' controlId='formLogin'>
                                    <Form.Text className='auth-login-label'>Login:</Form.Text>
                                    <Form.Control type='text' placeholder='Your login' className={`auth-form-login ${loginValidStyle}`}
                                        required value={this.state.login} onChange={this.loginHandler} />
                                    <div className={loginValidFeedBackStyle}>
                                        {`${(isLoginValid) ? 'Good' : registerLoginError}`}
                                    </div>
                                </Form.Group>
                                <Form.Group className='no-margin' controlId='formPassword'>
                                    <Form.Text className='auth-login-label'>Password</Form.Text>
                                    <Form.Control placeholder='Your password' type='password' className={`auth-form-password ${passwordValidStyle}`}
                                        required value={this.state.password} onChange={this.passwordHandler} />
                                    <div className={passwordValidFeedBackStyle}>
                                        {`${(isPasswordValid) ? 'Good' : registerPasswordError}`}
                                    </div>
                                </Form.Group>
                                <Form.Group className='no-margin' controlId='formPasswordConfirmation'>
                                    <Form.Text className='auth-login-label'>Password</Form.Text>
                                    <Form.Control placeholder='Repeat password' type='password' className={`auth-form-login ${passwordValidStyle}`}
                                        required value={this.state.passwordConfirmation} onChange={this.passwordConfirmationHandler} />
                                    <div className={passwordValidFeedBackStyle}>
                                        {`${(isPasswordValid) ? 'Good' : registerPasswordError}`}
                                    </div>
                                </Form.Group>
                                <div className='reg-form-btns'>
                                    <button className='auth-btn-sign' type='button' onClick={() => goToPage('/authorization')}>Sign in</button>
                                    <button className='auth-btn-reg' onClick={this.handleSubmit} >Registration</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='reg-body-present'>
                        <div className='reg-present-box'>
                            <p>REGISTER</p>
                            <p>NOW</p>
                        </div>
                        <div className='reg-instruction'>
                            <p>Enter correct login</p>
                            <p>Correct symbols A-z. Example <span>Person323</span></p>
                            <p>Correct symbols is password: A-z, 0-9</p>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}