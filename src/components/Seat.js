import {useState} from 'react';

export default function Seat(props) {

    const [selected, setSelected] = useState(false);
    let css;

    if (props.disp === false) css = 'unavailable'
    else if (props.disp === true && selected === false) css = 'available';
    else if (props.disp === true && selected === true) css = 'selected';

    function updateSeat() {
        setSelected(!selected);
        props.callback(props.seat.id, selected);
    }

    return (
        <p className={css} onClick={() => updateSeat()}>{parseInt(props.seat.name) < 10 ? `0${props.seat.name}` : `${props.seat.name}`}</p>
    )
}