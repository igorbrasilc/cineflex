import styled from 'styled-components';
import {useState} from 'react';

export default function SeatSelection(props) {

    return (                      
            <div>
                {parseInt(props.seat.name) < 10 ? `0${props.seat.name}` : `${props.seat.name}`}
            </div>
        )
}

