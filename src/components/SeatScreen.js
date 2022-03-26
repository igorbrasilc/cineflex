import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import SeatLabels from './SeatLabels';
import SeatSelection from './SeatSelection';

function SeatScreen() {

    const {idSession} = useParams();

    const [session, setSession] = useState({
        movie: {},
        day: {},
        seats: [],
        time: ''
    });

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promise.then(response => {
            setSession({...session, 
            movie: response.data.movie,
            day: response.data.day,
            seats: response.data.seats,
            time: response.data.name});
        });

        promise.catch(error => console.log(error));
    }, [])

    return (
        <>
            <main className="main">
                <p>Selecione o(s) assento(s)</p>
                <div className="main__seats">
                {session.seats.map(seat => { 
                return (
                <Span key={seat.id} seat={seat.isAvailable} >
                    <SeatSelection seat={seat} />
                </Span>
                )
                })}
                </div>
                <SeatLabels />
                <InputWrapper>
                    <p>Nome do comprador:</p>
                    <input placeholder="Digite seu nome..." ></input>
                </InputWrapper>
                <InputWrapper>
                    <p>CPF do comprador:</p>
                    <input placeholder="Digite seu CPF..." ></input>
                </InputWrapper>
                <div className="container-button">
                    <button>Reservar assento(s)</button>
                </div>
                <footer className ="footer">
                    <img src={session.movie.posterURL} alt={session.movie.title} />
                    <p>{session.movie.title}<br></br> <span>{session.day.weekday} - {session.time}</span></p>
                </footer> 
            </main>
        </>
    )
}

const InputWrapper = styled.div`
p {
    font-size: 18px;
    font-weight: 400;
    line-height: 18px;
    color: #293845;
    text-align: left;
    margin-left: -25px;
    margin-bottom: -30px;
}

input {
    width: 90vw;
    height: 51px;
    max-width: 600px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 3px;
    color: #AFAFAF;
    font-size: 18px;
    font-style: italic;
    border: 1px solid #D4D4D4;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 1px 1px var(--color-text-header-and-button);
    }
}
`;

const Span = styled.span`
padding: 5px;
background-color: ${props => {
    if (props.seat === true) return '#C3CFD9'
    else if (props.seat === false) return '#FBE192';
}};
color: black;
border-radius: 50%;
border: 1px solid ${props => {
    if (props.seat === true) return '#808F9D'
    else if (props.seat === false) return '#F7C52B';
}
};
font-size: 11px;
letter-spacing: 4%;
margin-right: 7px;
margin-bottom: 18px;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 1px 1px var(--color-text-header-and-button);
    }
`;

export default SeatScreen;