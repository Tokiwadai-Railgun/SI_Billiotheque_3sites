document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche la soumission classique du formulaire

    // Récupérer les informations du formulaire
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérification si les champs sont remplis
    if (!username || !password) {
        alert("Username and Password are required.");
        return;
    }

    // Créer un objet de données à envoyer
    const loginData = {
        name: username,
        password: password
    };

    try {
        // Envoi de la requête POST au serveur
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        // Vérifier si le login a réussi
        if (response.status === 201) {
            alert("Login successful");
            // Rediriger l'utilisateur ou stocker des informations de session
            // Par exemple, stocker un cookie de rôle ou un token si nécessaire
            document.cookie = `role=${data.username}`;
            window.location.href = '/SI_Billiotheque_3sites/index.html'; // Redirection vers une page protégée après la connexion
        } else {
            // Afficher un message d'erreur
            alert(data.message || "Login failed");
        }

    } catch (error) {
        console.error("Error during login", error);
        alert("An error occurred while logging in. Please try again.");
    }
});
