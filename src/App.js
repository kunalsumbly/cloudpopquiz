import { useState, useEffect } from 'react';

function Flashcards() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);

    useEffect(() => {
        fetch('/flashcards.json')
            .then((response) => response.json())
            .then((data) => {
                setCards(data);
                setFlipped(Array(data.length).fill(false));
            });
    }, []);

    function handleFlip(index) {
        setFlipped((prevState) => {
            const flippedCards = [...prevState];
            flippedCards[index] = !flippedCards[index];
            return flippedCards;
        });
    }

    return (
        <div className="flashcards-container">
            {cards.length > 0 ? (
                cards.map((card, index) => (
                    <div key={index} className="flashcard">
                        <div
                            className={`flashcard-inner ${
                                flipped[index] ? 'flipped' : ''
                            }`}
                            onClick={() => handleFlip(index)}
                        >
                            <div className="flashcard-front">
                                <div className="flashcard-text">{card.question}</div>
                            </div>
                            <div className="flashcard-back">
                                <div className="flashcard-text">{card.answer}</div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Flashcards;
