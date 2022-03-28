import styled from 'styled-components';
import {useState} from 'react';

import Seat from './Seat';

// let arrayGlobalId = [];
// let arrayLocalId = [];

export default function SeatSelection(props) {

    const [arrayGlobalId, setArrayGlobalId] = useState([]);
    const [arrayLocalId, setArrayLocalId] = useState([]);

    const {seats, callbackGlobal, callbackLocal, selectedGlobalSeats, selectedLocalSeats} = props;
    let countSelected = 0;

    function selectSeat(globalId, state, localId) {

        if (state === false) {
            if (arrayGlobalId.length > 0) {
                for (let i = 0; i < arrayGlobalId.length; i++) {
                    if (globalId === arrayGlobalId[i]) countSelected++;
                }
                if (countSelected === 0) {
                    setArrayGlobalId([...arrayGlobalId, globalId]);
                    setArrayLocalId([...arrayLocalId, localId]);
                    callbackLocal([...arrayLocalId, localId]);
                    callbackGlobal([...arrayGlobalId, globalId]);
                } 
            } else {
                setArrayGlobalId([...arrayGlobalId, globalId]);
                setArrayLocalId([...arrayLocalId, localId]);
                callbackLocal([...arrayLocalId, localId]);
                callbackGlobal([...arrayGlobalId, globalId]);
            }
        } else {
            for (let i = 0; i < arrayGlobalId.length; i++) {
                if (globalId === arrayGlobalId[i]) {
                    arrayGlobalId.splice(i, 1);
                    arrayLocalId.splice(i, 1);
                    callbackLocal(arrayLocalId);
                    callbackGlobal(arrayGlobalId);
                }
            }
        }
    }

    return (seats.map(seat => { 
        return (
        <Span key={seat.id} >
            <Seat seat={seat} callback={(globalId, state, localId) => selectSeat(globalId, state, localId)} disp={seat.isAvailable}/>
        </Span>
        )
        })
    )
}

const Span = styled.span`
p {
    padding: 5px;
    color: black;
    border-radius: 50%;
    font-size: 11px;
    letter-spacing: 4%;
    margin-right: 7px;
    margin-bottom: 18px;
    
        &:hover {
            cursor: pointer;
            box-shadow: 0 0 1px 1px var(--color-text-header-and-button);
        }
}
`;

