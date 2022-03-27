import styled from 'styled-components';
import {useLocation, Link} from 'react-router-dom';

export default function ConfirmationScreen() {

    const {state} = useLocation();

    return (
        <ConfirmationScreenWrapper>
            <h1>Pedido feito com sucesso!</h1>
            <h2>Filme e sessão</h2>
            <h3>{state.movie} <br></br>{state.date} - {state.time}</h3>
            <h2>Ingressos</h2>
            {state.ids.map(id => {
                return (<h3>Assento {id}</h3>)
            })}
            <h2>Comprador</h2>
            <h3>Nome: {state.name}<br></br> CPF: {state.cpf}</h3>
            <div className="container-button">
                <Link to={'/'}>
                    <button>Voltar pra Home</button>
                </Link>
            </div>
        </ConfirmationScreenWrapper>
    )
}

const ConfirmationScreenWrapper = styled.main`
margin-top: var(--height-header);
h1 {
    text-align: center;
    padding: 40px;
    font-size: 24px;
    letter-spacing: 0.04em;
    color: #247A6B;
    font-weight: 700;
}

h2 {
    font-size: 24px;
    letter-spacing: 0.04em;
    color: #293845;
    font-weight: 700;
    margin-left: 29px;
    margin-bottom: 5px;
    margin-top: 25px;
}

h3 {
    font-size: 20px;
    letter-spacing: 0.04em;
    color: #293845;
    font-weight: 400;
    margin-left: 29px;
    line-height: 28px;
}
`;