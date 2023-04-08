const cardsContainer = document.querySelector(".cards-container");

fetch("./flashcards.json")
    .then((response) => response.json())
    .then((data) => {
        const flashcards = data.flashcards;

        for (let i = 0; i < flashcards.length; i++) {
            const flashcard = flashcards[i];
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.cardIndex = i;

            const question = document.createElement("div");
            question.classList.add("question");
            question.textContent = flashcard.question;

            const answer = document.createElement("div");
            answer.classList.add("answer");
            answer.textContent = flashcard.answer;

            card.appendChild(question);
            card.appendChild(answer);
            cardsContainer.appendChild(card);

            card.addEventListener("click", () => {
                card.classList.toggle("show-answer");
            });
        }
    })
    .catch((error) => {
        console.log(error);
    });
