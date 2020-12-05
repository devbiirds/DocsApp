import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import hostURL from '../services/Location.js'
import { goToPage } from '../services/Location.js';

export default class Theatres extends Component {
    state = {
        theatresList: [],
        theatresByPlace: [],
        theatresByGenre: [],
        theatresByName: [],
        page: 0,
        filter: null
    }

    componentDidMount() {
        fetch(`${hostURL}/theatres/page?page=${this.state.page}&size=3`).then(
            (res) => res.json()
        ).then(jsonData => {
            
            this.setState({ theatresList: jsonData });
        });
    }
    
    getMore = ()=> {

        fetch(`${hostURL}/theatres/page?page=${this.state.page+1}&size=3`).then(
            (res) => res.json()
        ).then(jsonData => {
            let newData = this.state.theatresList.concat(jsonData);
            this.setState({ theatresList: newData, page: this.state.page + 1 });
        });
       
    }

    getPage = (event) => {
        this.setState({
            page: event.target.value -1
        })
    }
    filterHandler = (event) => {
        this.setState({
            filter: event.target.value
        })
        this.getByFilter(event.target.value);
    }

    goToPage = () => {
        fetch(`${hostURL}/theatres/page?page=${this.state.page}&size=3`).then(
            (res) => res.json()
        ).then(jsonData => {
            this.setState({ theatresList: jsonData });
        });
    }
    
    getByFilter = (filter) => {
        fetch(`${hostURL}/theatres/place/${filter}`).then(
            (res) => res.json()
        ).then(jsonData => {
            this.setState({ theatresByPlace: jsonData, theatresList: [] });
        });
        fetch(`${hostURL}/theatres/name/${filter}`).then(
            (res) => res.json()
        ).then(jsonData => {
            this.setState({ theatresByName: jsonData });
        });
        fetch(`${hostURL}/theatres/genre/${filter}`).then(
            (res) => res.json()
        ).then(jsonData => {
            this.setState({ theatresByGenre: jsonData });
        });
      
    }

    goToTheatre = (id) => {
        goToPage(`/selectedtheatre/${id}`)
    }


    render() {
        const items = this.state.theatresList.concat(this.state.theatresByPlace).concat(this.state.theatresByName).concat(this.state.theatresByGenre);
        if (localStorage.token === undefined) {
            goToPage('/authorization')
        }
        return (
            <Container>
                   <h4>Theatres</h4>
                   <input onChange={this.filterHandler} type="text"/>
                {items.map((item) =>
                        <div>
                            ------------------------------------------
                            <button onClick={()=> this.goToTheatre(item.id)}>see</button>
                            <h5>Name: {item.name},</h5>
                            <h5>Description: {item.description},</h5>
                            <h5>Genre: {item.genre}</h5>
                            <h5>Time: {item.time}, Date: {item.date},</h5>
                            <h5>place: {item.place}</h5>
                        ------------------------------------------
                    </div>
                    )}
                <h2> </h2>
                 <button onClick={()=> this.getMore()}>Load more data</button>
                 <input onChange={this.getPage} type="number"/>
                 <button onClick={()=> this.goToPage()}>Go to page</button>
                
            </Container>
        )
    }
}