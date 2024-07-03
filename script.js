document.addEventListener('DOMContentLoaded', () => {
    const password = 'monMotDePasseSecret';  // Remplace 'monMotDePasseSecret' par le mot de passe souhaité
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const adminSection = document.getElementById('admin-section');
    const loginError = document.getElementById('login-error');
    const betForm = document.getElementById('bet-form');
    const betsList = document.getElementById('bets-list');
    let editIndex = null;

    // Fonction pour ajouter un nouveau pari
    const addBet = (match, bet, odds) => {
        const newBet = document.createElement('li');
        newBet.innerHTML = `<strong>Match :</strong> ${match}<br><strong>Paris :</strong> ${bet}<br><strong>Cote :</strong> ${odds}`;
        betsList.appendChild(newBet);
    };

    // Événement de soumission du formulaire de connexion
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const enteredPassword = document.getElementById('password').value;
        if (enteredPassword === password) {
            loginSection.style.display = 'none';
            adminSection.style.display = 'block';
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

        addBet(match, bet, odds);
        betForm.reset();
    });

    // Exemple de pari initial (à supprimer ou remplacer)
    addBet('Lloyd Harris VS Ben Shelton', 'Victoire de Ben Shelton', '1.751');
});
