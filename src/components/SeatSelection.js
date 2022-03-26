import styled from 'styled-components';
import {useState} from 'react';

import Seat from './Seat';

let array = [];

export default function SeatSelection(props) {

    const {seats, callback} = props;
    let countSelected = 0;

    function selectSeat(seatId, state) {

        if (state === false) {
            if (array.length > 0) {
                for (let i = 0; i < array.length; i++) {
                    if (seatId === array[i]) countSelected++;
                }
                if (countSelected === 0) {
                    array.push(seatId);
                    callback(array);
                } 
            } else {
                array.push(seatId);
                callback(array);
            }
        } else {
            for (let i = 0; i < array.length; i++) {
                if (seatId === array[i]) {
                    array.splice(i, 1);
                    callback(array);
                }
            }
        }
    }

    return (seats.map(seat => { 
        return (
        <Span key={seat.id} >
            <Seat seat={seat} callback={(id, state) => selectSeat(id, state)} disp={seat.isAvailable}/>
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

