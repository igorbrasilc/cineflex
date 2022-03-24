import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function InitialScreen() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response => {
            setMovies(response.data);
        });
        promise.catch(error => console.log(error));
    }, []);

    return (
        <main className="main">
            <p>Selecione o filme</p>
            <div className="main__movies">
                {movies.map(movie => {
                    return (
                    <Link to={`/sessions/${movie.id}`}>       
                        <img src={movie.posterURL} alt={movie.title} />
                    </Link> )
                })}
            </div>
        </main>
    )
}