export default function SeatLabels() {
    return (
        <article className="main__seat-labels">
            <div className="main__seat-labels__selected">
                <div></div>
                <label>Selecionado</label>
            </div>
            <div className="main__seat-labels__available">
                <div></div>
                <label>Disponível</label>
            </div>
            <div className="main__seat-labels__unavailable">
                <div></div>
                <label>Indisponível</label>
            </div>
        </article>
    )
}