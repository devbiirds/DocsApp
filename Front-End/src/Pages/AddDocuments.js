import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { goToPage } from '../services/Location.js';
import hostURL from '../services/Location.js';
import { saveImg } from '../services/SaveImg.js';
import '../CSS/Home.css';

export default class AddCar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            cost: null,
            description: null,
            time: '',
            genre: null,
            place: null,
            date: null,
            costError: '',
            isCostValid: null,
            msg: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    nameHandler = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    costHandler = (event) => {
        this.setState({
            cost: event.target.value
        })
    }
    descriptionHandler = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    timeHandler = (event) => {
        this.setState({
            time: event.target.value
        })
    }
    genreHandler = (event) => {
        this.setState({
            genre: event.target.value
        })
    }
    placeHandler = (event) => {
        this.setState({
            place: event.target.value
        })
    }
    dateHandler = (event) => {
        this.setState({
            date: event.target.value
        })
    }

    handleSubmit = (event) => {
        console.log(this.state.time)
        event.preventDefault();
        if (this.checkCost(this.state.cost)) {
            const endpoint = `${hostURL}/api/documents`;
            fetch(endpoint, {
                credentials: 'same-origin',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({
                    name: this.state.name,
                    cost: this.state.cost,
                    description: this.state.description,
                    time: this.state.time+':00',
                    genre: this.state.genre,
                    place: this.state.place,
                    date: this.state.date,
                }),
            }).then(
                (res) => res.json()
            ).then(jsonData => {
                if (!jsonData.success === true) {
                    this.setState({
                        msg: 'Error!'
                    })
                } else {
                    this.setState({
                        msg: 'Done!',
                        name: '',
                        cost: '',
                        description: '',
                        genre: '',
                        time: '',
                        place: '',
                        date: '',
                    })
                }
            }
            ).catch((err) => console.log(err));

        }
    }

    checkCost(cost) {
        let regex = /[0-9]/;
        if (!regex.test(cost)) {
            this.setState({
                isCostValid: false,
                costError: 'Cost must be with correct symbols (0-9)'
            })
            return false;
        }
        else {
            this.setState({
                isCostValid: true,
            })
            return true;
        }
    }

    render() {
        if (localStorage.token === undefined || localStorage.role === 0) {
            goToPage('/authorization')
        }
        return (
            <Container>
                <h3>There you can add the document</h3>
                <div className='reg-form-container'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-row'>
                            <div className='col-md-6 mb-3 reg-fix'>
                                <h1>{this.state.msg ? this.state.msg : ''}</h1>
                                <input type='text' className='form-control'
                                    required value={this.state.name} onChange={this.nameHandler}
                                    placeholder='Name' />

                                <input type='text' className={`form-control 
                                  ${(this.state.isCostValid === null) ? '' :
                                        (this.state.isCostValid) ? 'is-valid' : 'is-invalid'}`}
                                    required value={this.state.cost} onChange={this.costHandler}
                                    placeholder='Cost' />
                                <div className={`${(this.state.isCostValid) ? 'valid-feedback' : 'invalid-feedback'}`}>
                                    {`${(this.state.isCostValid) ? 'Good' : this.state.costError}`}
                                </div>

                                <input type='text' className='form-control'
                                    required value={this.state.description} onChange={this.descriptionHandler}
                                    placeholder='Description' />

                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='col-md-6 mb-3 reg-fix'>
                                <input type='date' className='form-control'
                                    required value={this.state.date} onChange={this.dateHandler}
                                    placeholder='date' />

                                <input type='time' className='form-control'
                                    required value={this.state.time} onChange={this.timeHandler}
                                    placeholder='time' />    

                                <input type='text' className='form-control'
                                    required value={this.state.place} onChange={this.placeHandler}
                                    placeholder='place' />

                                <input type='text' className='form-control'
                                    required value={this.state.genre} onChange={this.genreHandler}
                                    placeholder='genre' />

                            </div>
                        </div>
                        <button className='btn btn-primary' type='submit'>Create document</button>
                        <h1> </h1>
                    </form >
                </div>
            </Container>
        )
    }
}