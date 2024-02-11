"use strict";
const inputs = document.querySelectorAll("input[type='text'],input[type='password'] ");
console.log(inputs);
const form = document.querySelector('form');
const progressBar = document.getElementById("progress-bar");
let pseudo, email, password, confirmPass;
// Une fonction génerale qu'on va utiliser pour chaque input
const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector(`.${tag}-container`);
    const span = document.querySelector(`.${tag}-container > span `);
    if (!valid) {
        container.classList.add('error');
        span.textContent = message;
    }
    else {
        container.classList.remove('error');
        span.textContent = message;
    }
};
const pseudoChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay("pseudo", "le pseudo doit faire entre 3 et 20 carractères", false);
        pseudo = null;
    }
    else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay("pseudo", "le pseudo ne doit pas contenir de caractères spéciaux", false);
        pseudo = null;
    }
    else {
        errorDisplay('pseudo', "", true);
        pseudo = value;
    }
};
const emailChecker = (value) => {
    if (!value.match(/^[\w-_]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "L'adresse email n'est pas valide", false);
        email = null;
    }
    else {
        errorDisplay('email', "", true);
        email = value;
    }
};
const passwordChecker = (value) => {
    progressBar.classList = "";
    if (!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)) {
        errorDisplay("password", "Minimum 8 caractères, une majuscule, un chiffre et un caractère spécial", false);
        progressBar.classList.add('progressRed');
        // progressBar?.classList.remove('progressBlue');
        password = null;
    }
    else if (value.length < 12) {
        progressBar.classList.add('progressBlue');
        //   progressBar?.classList.remove('progressGreen');
        // progressBar?.classList.remove('progressRed');
        errorDisplay('password', " ", true);
        password = value;
    }
    else {
        // progressBar?.classList.remove('progressBlue');
        progressBar.classList.add('progressGreen');
        errorDisplay('password', " ", true);
        password = value;
    }
    // si confirm pass = a true alors rejoue la fonction confirmpass pour checker en temps relle pour voir si l'utilisateur n' pas ajouté ou retiré une lettre 
    if (confirmPass)
        confirmChecker(confirmPass);
};
const confirmChecker = (value) => {
    if (value !== password) {
        errorDisplay("confirm", "les password ne correspondent pas ", false);
        confirmPass = false;
    }
    else {
        errorDisplay('confirm', " ", true);
        console.log('bravo');
        confirmPass = true;
    }
};
inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        console.log(e);
        switch (e.target.id) {
            case "pseudo":
                pseudoChecker(e.target.value);
                break;
            case "email":
                emailChecker(e.target.value);
                break;
            case "password":
                passwordChecker(e.target.value);
                break;
            case "confirm":
                confirmChecker(e.target.value);
                break;
            default: null;
        }
    });
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (pseudo && email && password && confirmPass) {
        let data = {
            pseudo: pseudo,
            email: email,
            password: password,
            confirmPass: confirmPass
        };
        console.log(data);
        alert("Inscription validé");
        pseudo = null;
        email = null;
        password = null;
        confirmPass = null;
        progressBar.classList = '';
        inputs.forEach((input) => {
            input.value = "";
        });
    }
    else {
        alert('Veuillez remplir tous les champs');
        return false;
    }
});
