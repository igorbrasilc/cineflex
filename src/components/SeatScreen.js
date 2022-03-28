import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import SeatLabels from './SeatLabels';
import SeatSelection from './SeatSelection';

function SeatScreen() {

    const {idSession} = useParams();
    const navigate = useNavigate();

    const [session, setSession] = useState({
        movie: {},
        day: {},
        seats: [],
        time: ''
    });
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedLocalSeats, setSelectedLocalSeats] = useState([]);
    console.log(selectedSeats);
    console.log(selectedLocalSeats);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promise.then(response => {
            setSession({...session, 
            movie: response.data.movie,
            day: response.data.day,
            seats: response.data.seats,
            time: response.data.name});

            setCpf('');
            setName('');
            setSelectedSeats([]);
            setSelectedLocalSeats([]);
        });

        promise.catch(error => console.log(error));
    }, [])

    function verifyAndRequest(event) {
        event.preventDefault();

        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        const cpfResult = cpfRegex.test(cpf);

        if (cpfResult === false) alert('CPF está no formato errado, modelo: 123.456.789-00');
        else if(selectedSeats.length === 0) alert('Você deve selecionar pelo menos um assento, ou quer assistir na escada?')
        else {
            const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', {
                ids: [...selectedSeats],
                name: name,
                cpf: cpf
            });
            promise.then(() => 
            {  
            navigate('/success', {
                state: {
                    ids: [...selectedLocalSeats],
                    movie: session.movie.title,
                    time: session.time,
                    date: session.day.date,
                    name: name,
                    cpf: cpf
                }
            });
            }
            )
        }
    }

    return (
        <>
            <main className="main">
                <p>Selecione o(s) assento(s)</p>
                <div className="main__seats">
                    <SeatSelection seats={session.seats} callbackGlobal={ array => setSelectedSeats([...array])} 
                    callbackLocal={array => setSelectedLocalSeats([...array])} selectedGlobalSeats={selectedSeats}
                    selectedLocalSeats={selectedLocalSeats}/>
                </div>
                <SeatLabels />
                <form onSubmit={verifyAndRequest}>
                    <InputWrapper>
                        <p>Nome do comprador:</p>
                        <input placeholder="Digite seu nome..." type="text" value={name} onChange={e => setName(e.target.value)} required></input>
                    </InputWrapper>
                    <InputWrapper>
                        <p>CPF do comprador:</p>
                        <input placeholder="Digite seu CPF..." type="text" value={cpf} onChange={e => setCpf(e.target.value)}></input>
                    </InputWrapper>
                    <div className="container-button">
                        <button type="submit">Reservar assento(s)</button>
                    </div>
                </form>
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

export default SeatScreen;