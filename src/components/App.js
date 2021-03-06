import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../css/reset.css';
import '../css/style.scss';

import Header from './Header';
import InitialScreen from './InitialScreen';
import SessionScreen from './SessionScreen';
import SeatScreen from './SeatScreen';
import ConfirmationScreen from './ConfirmationScreen';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<InitialScreen />} />
                <Route path={`/sessions/:idMovie`} element={<SessionScreen />} />
                <Route path={`/seats/:idSession`} element={<SeatScreen />} />
                <Route path={`/success`} element={<ConfirmationScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;