import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import hostURL from '../services/Location.js'
import { goToPage } from '../services/Location.js';
import { saveImg } from '../services/SaveImg.js';

export default class SelectedTheatre extends Component {

    constructor(props) {
        super(props)
        this.state = {
            theatresList: {},
            commentList: [],
            img: '',
            text: '',
            tId: null,
            uId: null
        }
        this.fileInputImg = React.createRef();
    }
    componentDidMount() {
        const selectedId = document.location.pathname.substring(17);
        fetch(`${hostURL}/theatres/${selectedId}`).then(
            (res) => res.json()
        ).then(jsonData => {

            this.setState({ theatresList: jsonData });
        });
        
        fetch(`${hostURL}/comments`).then(
            (res) => res.json()
        ).then(async jsonData => {

            let comments =[]
            comments =  await Promise.all(jsonData.map(async (item) => {
                if(item.tId == selectedId){
                    
                    let userName =  await fetch(`${hostURL}/user/id/${item.uId}`);
                    userName = await userName.json();
                    item.userName = userName.login;
                    return item;
            }}));
            console.log("🚀 ~ file: SelectedTheatre.js ~ line 31 ~ SelectedTheatre ~ componentDidMount ~ comments", comments)
            this.setState({commentList: comments})
        });

        fetch(`${hostURL}/user/${localStorage.login}`).then(
            (res) => res.json()
        ).then(jsonData => {

            this.setState({ uId: jsonData.id, tId: document.location.pathname.substring(17) });
        });
    }

    dataUrlForImg = (dataUrl) => {
        this.setState({
            img: dataUrl
        })
    }

    textHandler = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    addComment = () => {
        fetch(`${hostURL}/comments`, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                image: this.state.img,
                text: this.state.text,
                tId: this.state.tId,
                uId: this.state.uId,
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
                    img: '',
                    text: '',
                    tId: '',
                    uId: '',
                })
            }
        }
        ).catch((err) => console.log(err));
    }
  


    render() {

        const item = this.state.theatresList;
        const comments = this.state.commentList;
        console.log("🚀 ~ file: SelectedTheatre.js ~ line 38 ~ SelectedTheatre ~ render ~ comments", comments)
        console.log(comments[0])
        if (localStorage.token === undefined) {
            goToPage('/authorization')
        }
        return (
            <Container>
                   <h4>Theatre</h4>
                        <div>
                            ------------------------------------------
                            <h5>Name: {item.name},</h5>
                            <h5>Description: {item.description},</h5>
                            <h5>Genre: {item.genre}</h5>
                            <h5>Time: {item.time}, Date: {item.date},</h5>
                            <h5>place: {item.place}</h5>
                        ------------------------------------------
                    </div>
                    


                    {comments[0] ? comments.map((item) =>
                        <div>
                            ------------------------------------------
                            <h5>Name: {item.userName}</h5>
                            <h5>Text: {item.text}</h5>
                            <img width='100%' height='auto'
                                            className='d-block w-100'
                                            src={item.image}
                                            alt='screen'
                                        />

                        ------------------------------------------
                    </div>
                    ) : <h2>no</h2>}
                <h2> </h2>
                
            </Container>
        )
    }
}