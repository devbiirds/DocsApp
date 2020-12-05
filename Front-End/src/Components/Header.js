import React, { Component } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import logo from '../icons/logo.svg';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import Authorization from '../Pages/Authorization';
import Registration from '../Pages/Registration';
import Theatres from '../Pages/Theatres';
import AddTheatres from '../Pages/AddTheatres';
import SelectedTheatre from '../Pages/SelectedTheatre';
import { goToPage } from '../services/Location.js'

export default class Header extends Component {
    logOut = () => {
        localStorage.clear();
        goToPage('/');
    }

    render() {
        let isLogIn = false;
        if (localStorage.getItem('login')) {
            isLogIn = true;
        }
        return (
            <>
                <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
                    <Container className='fix-md'>
                        <Navbar.Brand href='/'>
                            <img
                                src={logo}
                                height='35'
                                width='35'
                                className='d-inline-block align-top'
                                alt='Logo'
                            />
                        </Navbar.Brand>
                        <Nav className='mr-10 fix-md'>
                            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                            <Navbar.Collapse id='responsive=navbar-nav'>
                                <Nav className='mr-auto'>
                                    <Nav.Link href='/'>Home</Nav.Link>
                                    <Nav.Link href='/theatres'>Theatres</Nav.Link>
                                    {localStorage.role == 1 && <Nav.Link href='/addtheatres'>Add Theatres</Nav.Link>}
                                </Nav>

                                <Nav className='mr-auto'>
                                    {
                                        isLogIn ?
                                            <>
                                                <Nav.Link >{localStorage.getItem('login')}</Nav.Link>
                                                <Nav.Link onClick={(e) => this.logOut()}>LogOut</Nav.Link>
                                            </> :
                                            <>
                                                    <Nav.Link href='/authorization'>Auth</Nav.Link>
                                                    <Nav.Link href='/Registration'>Registr</Nav.Link>
                                            </>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Nav>
                    </Container>
                </Navbar>

                <Router>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/Theatres' component={Theatres} />
                        <Route exact path='/selectedtheatre/**' component={SelectedTheatre} />
                        <Route exact path='/AddTheatres' component={AddTheatres} />
                        <Route exact path='/authorization' component={Authorization} />
                        <Route exact path='/Registration' component={Registration} />
                        <Route component={Home} />
                    </Switch>
                </Router>
            </>
        )
    }
}