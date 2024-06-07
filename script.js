document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("participantForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const participantName = document.getElementById("participantInput").value.trim();
        if (participantName) {
            addParticipant(participantName);
            document.getElementById("participantInput").value = "";
        }
    });

    document.getElementById("challengeForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const challenge = document.getElementById("challengeInput").value.trim();
        const challengeType = document.getElementById("challengeType").value; // Récupérez le type de challenge
        const maxChallenges = parseInt(document.getElementById("maxChallenges").value);
        if (challenge) {
            if (validateMaxChallenges(maxChallenges)) {
                addChallenge(challenge, challengeType); // Ajoutez le type du challenge
                document.getElementById("challengeInput").value = "";
            } else {
                alert("Vous avez atteint le nombre maximum d'éléments !");
            }
        }
    });

    document.getElementById("resetChallenges").addEventListener("click", function() {
        localStorage.removeItem("challenges");
        alert("Nombre d'éléments réinitialisé !");
    });

    document.getElementById("drawChallenge").addEventListener("click", drawRandomChallenge);

    function addParticipant(name) {
        const participantsList = document.getElementById("participants");
        const li = document.createElement("li");
        li.textContent = name;
        participantsList.appendChild(li);
    }

    function addChallenge(challenge, type) {
        let challenges = JSON.parse(localStorage.getItem("challenges")) || [];
        challenges.push({ type: type, text: challenge }); // Ajoutez le type du challenge
        localStorage.setItem("challenges", JSON.stringify(challenges));
    }

    function drawRandomChallenge() {
        const challenges = JSON.parse(localStorage.getItem("challenges")) || [];
        if (challenges.length > 0) {
            const randomIndex = Math.floor(Math.random() * challenges.length);
            const randomChallenge = challenges[randomIndex];
            displayRandomChallenge(randomChallenge);
        } else {
            document.getElementById("randomChallenge").textContent = "Aucun défi, anecdote ou question n'a été ajouté.";
        }
    }

    function displayRandomChallenge(challenge) {
        const randomChallengeElement = document.getElementById("randomChallenge");
        const challengeType = challenge.type; // Supposons que le type soit stocké dans la propriété "type" de l'objet challenge

        // Ajoutez le type de challenge avant le texte du challenge
        randomChallengeElement.innerHTML = `<p>${challengeType}: ${challenge.text}</p>`;
        randomChallengeElement.classList.add("visible");
    }

    function validateMaxChallenges(maxChallenges) {
        const currentChallenges = JSON.parse(localStorage.getItem("challenges")) || [];
        return currentChallenges.length < maxChallenges;
    }
});
