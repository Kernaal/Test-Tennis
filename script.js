document.addEventListener('DOMContentLoaded', () => {
    const password = 'tonMotDePasse';  // Remplace 'tonMotDePasse' par le mot de passe souhaité
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const dailyBetsSection = document.getElementById('daily-bets');
    const loginError = document.getElementById('login-error');
    const betForm = document.getElementById('bet-form');
    const betsList = document.getElementById('bets-list');
    let editIndex = null;

    // Fonction pour ajouter un nouveau pari
    const addBet = (match, bet, odds) => {
        const newBet = document.createElement('li');
        newBet.innerHTML = `<strong>Match :</strong> ${match}<br><strong>Paris :</strong> ${bet}<br><strong>Cote :</strong> ${odds}
                            <br><button class="edit" style="display:none;">Modifier</button>
                            <button class="delete" style="display:none;">Supprimer</button>`;
        betsList.appendChild(newBet);

        // Ajouter des événements aux boutons
        newBet.querySelector('.edit').addEventListener('click', () => editBet(newBet, match, bet, odds));
        newBet.querySelector('.delete').addEventListener('click', () => deleteBet(newBet));
    };

    // Fonction pour éditer un pari existant
    const editBet = (betElement, match, bet, odds) => {
        document.getElementById('match').value = match;
        document.getElementById('bet').value = bet;
        document.getElementById('odds').value = odds;
        editIndex = Array.from(betsList.children).indexOf(betElement);
        betForm.querySelector('button').textContent = 'Modifier';
    };

    // Fonction pour supprimer un pari
    const deleteBet = (betElement) => {
        betsList.removeChild(betElement);
    };

    // Événement de soumission du formulaire de connexion
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const enteredPassword = document.getElementById('password').value;
        if (enteredPassword === password) {
            loginSection.style.display = 'none';
            dailyBetsSection.style.display = 'block';
            const editButtons = document.querySelectorAll('.edit');
            const deleteButtons = document.querySelectorAll('.delete');
            editButtons.forEach(button => button.style.display = 'inline');
            deleteButtons.forEach(button => button.style.display = 'inline');
        } else {
            loginError.style.display = 'block';
        }
    });

    // Événement de soumission du formulaire de paris
    betForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const match = document.getElementById('match').value;
        const bet = document.getElementById('bet').value;
        const odds = document.getElementById('odds').value;

        if (editIndex !== null) {
            const betElement = betsList.children[editIndex];
            betElement.innerHTML = `<strong>Match :</strong> ${match}<br><strong>Paris :</strong> ${bet}<br><strong>Cote :</strong> ${odds}
                                    <br><button class="edit">Modifier</button>
                                    <button class="delete">Supprimer</button>`;
            betElement.querySelector('.edit').addEventListener('click', () => editBet(betElement, match, bet, odds));
            betElement.querySelector('.delete').addEventListener('click', () => deleteBet(betElement));
            editIndex = null;
            betForm.querySelector('button').textContent = 'Ajouter';
        } else {
            addBet(match, bet, odds);
        }

        betForm.reset();
    });

    // Exemple de pari initial (à supprimer ou remplacer)
    addBet('Lloyd Harris VS Ben Shelton', 'Victoire de Ben Shelton', '1.751');
});
