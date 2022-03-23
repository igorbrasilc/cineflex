import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../css/reset.css';
import '../css/style.scss';

import Movie from '../assets/movie-test.jpeg';

function App() {
    return (
        <>
        <header>
            CINEFLEX
        </header>
        <main className="main">
            <p>Selecione o filme</p>
            <div className="main__movies">
                <img src={Movie} alt="img-movie"/>
                <img src={Movie} alt="img-movie"/>
                <img src={Movie} alt="img-movie"/>
                <img src={Movie} alt="img-movie"/>
            </div>
        </main>
        </>
    )
}

export default App;