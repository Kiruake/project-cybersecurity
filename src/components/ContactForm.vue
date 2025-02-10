<script setup>
import { ref } from "vue";

const formData = ref({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
});

// Fonction pour gérer l'envoi du formulaire
const submitForm = () => {
    console.log("Formulaire soumis :", formData.value);
    // Ici, tu peux ajouter une requête API pour envoyer les données
};
</script>

<template>
    <div class="contact-container">
        <div class="contact-form">
            <h1 class="form-title">
                Une question ? Un projet ? <br> <span class="bold">Parlons-en.</span>
            </h1>

            <form @submit.prevent="submitForm">
                <div class="input-group">
                    <div class="input-field">
                        <label for="firstName">Prénom</label>
                        <input type="text" id="firstName" v-model="formData.firstName" required>
                    </div>
                    <div class="input-field">
                        <label for="lastName">Nom</label>
                        <input type="text" id="lastName" v-model="formData.lastName" required>
                    </div>
                </div>

                <div class="input-field">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="formData.email" required>
                </div>

                <div class="input-field">
                    <label for="message">Votre message</label>
                    <textarea id="message" v-model="formData.message" rows="4" required></textarea>
                </div>

                <button type="submit" class="submit-button">Envoyer</button>
            </form>
        </div>

        <div class="contact-info">
            <h2 class="info-title">Entreprises, écoles, étudiants... <br><span class="bold">On vous écoute !</span></h2>
            <p class="info-text">
                Vous êtes une école ou une entreprise et souhaitez parler d’un partenariat, d’une promotion ou d’un
                projet ? <br> <br>
                Vous êtes étudiant et vous avez des questions sur les formations, les métiers ou le domaine de la
                cybersécurité ?
                Peu importe, nous sommes là pour échanger avec vous et répondre à vos besoins !
            </p>
            <p class="info-text">
                Remplissez le formulaire et on revient vers vous aussi vite qu’un hacker face à une faille de sécurité.
                😉
            </p>
        </div>
    </div>
</template>

---

<style>
.contact-container {
    display: flex;
    max-width: 1250px;
    margin: auto;
    margin-top: 20px;
    padding: 50px 20px;
    align-items: center;
    gap: 60px;
    margin-bottom: 100px;
}

.contact-form {
    flex: 1;
}

.form-title {
    font-size: 2.3rem;
    font-weight: 300;
    margin-bottom: 30px;
}

.bold {
    font-weight: bold;
    color: #234ada;
}

.input-group {
    display: flex;
    gap: 20px;
}

.input-field {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-family: monospace;
}

.input-field label {
    font-size: 1rem;
    color: #666;
    margin-bottom: 5px;
    font-family: monospace;
}

.input-field input,
.input-field textarea {
    border: none;
    border-bottom: 2px solid #ccc;
    font-size: 1rem;
    padding: 5px;
    outline: none;
    background: none;
    color: #333;
    transition: 0.3s;
}

.input-field input:focus,
.input-field textarea:focus {
    border-bottom: 2px solid #080e24;
}

.submit-button {
    background: #234ada;
    font-family: 'Orbitron', sans-serif;
    margin-top: 30px;
    color: white;
    padding: 12px 20px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: 0.3s;
}

.submit-button:hover {
    background: #1c41c9;
}

/* Section Info */
.contact-info {
    flex: 1;
    padding-left: 60px;
    border-left: 1px solid #ccc;
}

.info-title {
    font-size: 2rem;
    font-weight: 600;
}

.info-text {
    font-size: 0.9rem;
    color: #666;
    margin: 20px 0;
    line-height: 1.6;
}

/* Responsive */
@media (max-width: 900px) {
    .contact-container {
        flex-direction: column;
        text-align: center;
    }

    .contact-info {
        border-left: none;
        padding-left: 0;
    }
}
</style>