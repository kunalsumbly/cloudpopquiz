import { useState, useEffect } from 'react';

function Flashcards() {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
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

    function handleNextCard() {
        setCurrentIndex((currentIndex + 1) % cards.length);
    }

    function handlePrevCard() {
        setCurrentIndex((currentIndex + cards.length - 1) % cards.length);
    }

    return (
        <div className="flashcards-container">
            {cards.length > 0 ? (
                <div className="flashcard">
                    <div
                        className={`flashcard-inner ${
                            flipped[currentIndex] ? 'flipped' : ''
                        }`}
                        onClick={() => handleFlip(currentIndex)}
                    >
                        <div className="flashcard-front">
                            <div className="flashcard-text">{cards[currentIndex].question}</div>
                        </div>
                        <div className="flashcard-back">
                            <div className="flashcard-text">{cards[currentIndex].answer}</div>
                        </div>
                    </div>

                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Flashcards;
