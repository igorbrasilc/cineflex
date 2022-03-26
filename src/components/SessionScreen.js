import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

function SessionScreen() {

    const {idMovie} = useParams();
    const [sessions, setSession] = useState([]);
    const [movie, setMovie] = useState({});

    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`);
        promise.then(response => {
            setSession(response.data.days);
            setMovie(response.data);
        });
    }, []); 

    return (
        <main className="main">
            <p>Selecione o horário</p>
            <div className="main__session-screen">
                <>
                {sessions.map(day => {
                    return (
                    <>
                    <p key={day.id}>{day.weekday} - {day.date}</p>
                    {day.showtimes.map(time => {
                        return (
                        <Link to={`/seats/${time.id}`}>
                            <button key={time.id}>{time.name}</button>
                        </Link>
                        )
                    })}
                    </>
                    )
                })}
                </>
            </div>
            <footer className ="footer">
                <img src={movie.posterURL} alt={movie.title} />
                <p>{movie.title}</p>
            </footer>    
        </main>
    )
}

export default SessionScreen;