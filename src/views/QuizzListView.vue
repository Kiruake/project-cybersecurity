<script setup lang="ts">
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";

const router = useRouter();

const quizzList = [
    { id: 1, title: "Cybersecurity Basics", description: "Testez vos connaissances sur la cybersécurité.", image: "/quizz/IconQuizz1.png" },
    { id: 2, title: "Hacking Éthique", description: "Découvrez les techniques des hackers éthiques.", image: "/quizz/IconQuizz2.png" },
    { id: 3, title: "Attaques Réseau", description: "Apprenez à identifier les attaques réseau.", image: "/quizz/IconQuizz3.png" },
    { id: 4, title: "Protéger les Données", description: "Découvrez les meilleures pratiques de protégez vos données.", image: "/quizz/IconQuizz1.png" },
    { id: 5, title: "Vulnérabilités Web", description: "Testez vos connaissances sur les vulnérabilités web.", image: "/quizz/IconQuizz2.png" }
];

const goToQuiz = (id: number) => {
    router.push({ name: "quizz-single", params: { id } });
};
</script>

<template>
    <Header />
    <div class="quizz-page">
        <!-- Partie gauche : Image + texte -->
        <div class="quizz-image-section">
            <h1 class="title">📚 Sélectionne un quizz</h1>
            <img src="/quizz/QuizzShow.png" alt="Illustration Quizz" class="quizz-cover">
            <p class="quizz-description">Plongez dans l'univers de la cybersécurité et améliorez vos compétences grâce à
                nos quiz interactifs ! 🚀</p>
        </div>

        <!-- Partie droite : Liste des quizz -->
        <div class="quizz-list-container">
            <div class="quizz-list">
                <div v-for="quiz in quizzList" :key="quiz.id" class="quizz-card" @click="goToQuiz(quiz.id)">
                    <img :src="quiz.image" :alt="quiz.title" class="quizz-icon" />
                    <div class="quizz-info">
                        <h2>{{ quiz.title }}</h2>
                        <p>{{ quiz.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Conteneur principal : 2 parties */
.quizz-page {
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

/* Partie gauche - Image + titre + texte */
.quizz-image-section {
    width: 50%;
    background: #f5f5fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 30px;
}

/* Titre au-dessus de l'image */
.title {
    font-size: 28px;
    font-weight: bold;
    color: #080e24;
    margin-bottom: 20px;
}

/* Image réduite */
.quizz-cover {
    width: 100%;
    margin-top: -100px;
    max-width: 1000px;
    height: auto;
    object-fit: contain;
}

/* Texte sous l'image */
.quizz-description {
    font-size: 16px;
    color: #080e24;
    max-width: 80%;
    line-height: 1.4;
    margin-top: -50px;
}

/* Partie droite - Liste des quizz */
.quizz-list-container {
    width: 50%;
    padding: 40px;
    background: #f5f5fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}

/* Liste scrollable */
.quizz-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-height: calc(100vh - 40px);
    padding-right: 10px;
}

/* Design des cartes */
.quizz-card {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.quizz-card:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

/* Icône des quizz */
.quizz-icon {
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin-right: 15px;
}

/* Infos du quizz */
.quizz-info h2 {
    font-size: 18px;
    color: #333;
    margin-bottom: 5px;
}

.quizz-info p {
    font-size: 14px;
    color: #666;
}
</style>
