<template>
    <div class="quiz-container" v-if="currentQuiz">
        <button class="quit-btn" @click="quitQuiz">❌</button>

        <h1 class="quizz-name">Quiz {{ currentQuiz.title }}</h1>

        <!-- Affichage des questions tant que le quiz n'est pas fini -->
        <div v-if="!isQuizFinished" class="question-card fade-in">
            <h2 class="question-title">Question {{ currentQuestionIndex + 1 }} : {{ currentQuestion?.question }}</h2>

            <img :src="currentQuestion?.image" alt="Illustration" class="question-image"
                v-if="currentQuestion?.image" />

            <div class="timer-container">
                <div class="timer-bar" :style="{ width: timerBarWidth + '%' }"></div>
            </div>

            <div class="options-grid">
                <button v-for="(option, index) in currentQuestion?.options" :key="index" @click="checkAnswer(option)"
                    :class="{ correct: isCorrect && selectedOption === option, wrong: isCorrect === false && selectedOption === option }"
                    :disabled="selectedOption !== null">
                    {{ option }}
                </button>
            </div>

            <p v-if="isCorrect !== null" class="feedback">
                {{ isCorrect ? "Bonne réponse ! 🎉" : `Mauvaise réponse 😕 (Réponse : ${currentQuestion?.answer})` }}
            </p>

            <button v-if="isCorrect !== null" @click="nextQuestion" class="next-btn fade-in">Suivant</button>
        </div>

        <!-- Affichage des résultats quand le quiz est terminé -->
        <ScoreComponent v-if="isQuizFinished" :score="score" :totalQuestions="currentQuiz.questions.length"
            @restart="restartQuiz" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, watch } from "vue";
import { useRouter } from "vue-router";
import ScoreComponent from "./ScoreComponent.vue";

const props = defineProps<{ quizId: number }>();

const router = useRouter();

const quizzData = [
    {
        id: 1,
        title: "Cybersecurity Basics",
        questions: [
            { question: "Que signifie HTTPS ?", options: ["Hyper Text Transfer Protocol Secure", "Hackers Trap Tracking Protocol Secure"], answer: "Hyper Text Transfer Protocol Secure", image: "/quizz/Question7.png" },
            { question: "Quel outil analyse le trafic réseau ?", options: ["Wireshark", "Spotify"], answer: "Wireshark", image: "/quizz/Question3.jpg" }
        ]
    },
    {
        id: 2,
        title: "Hacking Éthique",
        questions: [
            { question: "Qu'est-ce qu'un test d'intrusion ?", options: ["Une simulation d'attaque", "Un antivirus"], answer: "Une simulation d'attaque", image: "/quizz/hacking.jpg" },
            { question: "Qu'est-ce qu'un pentest ?", options: ["Un test de performance", "Un test de sécurité"], answer: "Un test de sécurité", image: "/quizz/pentest.jpg" }
        ]
    }
];

const currentQuiz = computed(() => quizzData.find(quiz => quiz.id === props.quizId));

const currentQuestionIndex = ref<number>(0);
const score = ref<number>(0);
const selectedOption = ref<string | null>(null);
const isCorrect = ref<boolean | null>(null);
const isQuizFinished = ref<boolean>(false);
const timerBarWidth = ref<number>(100);

const currentQuestion = computed(() => currentQuiz.value?.questions[currentQuestionIndex.value]);

const checkAnswer = (option: string): void => {
    selectedOption.value = option;
    isCorrect.value = option === currentQuestion.value?.answer;
    if (isCorrect.value) score.value++;
};

const nextQuestion = (): void => {
    if (currentQuestionIndex.value < (currentQuiz.value?.questions.length || 0) - 1) {
        currentQuestionIndex.value++;
        selectedOption.value = null;
        isCorrect.value = null;
    } else {
        isQuizFinished.value = true; // ✅ FIN DU QUIZ -> Affichage des scores
    }
};

const restartQuiz = (): void => {
    currentQuestionIndex.value = 0;
    score.value = 0;
    isQuizFinished.value = false;
};

const quitQuiz = (): void => {
    if (confirm("Es-tu sûr de vouloir quitter le quiz ?")) {
        router.push("/quizz"); // Redirige vers l'accueil
    }
};

watch(() => props.quizId, () => {
    currentQuestionIndex.value = 0;
    score.value = 0;
    isQuizFinished.value = false;
});
</script>


<style scoped>
/* Conteneur principal */
.quiz-container {
    width: 90%;
    margin: 20px auto;
    padding: 20px;
    text-align: center;
    background: #080e24;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    position: relative;
}

/* Bouton quitter */
.quit-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    background: none;
    color: white;
    border: none;
    padding: 8px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.3s;
}

.quit-btn:hover {
    background: none;
}

/* Titre du quiz */
.question-title {
    font-size: 24px;
    margin-top: -20px;
    color: white;
}

.quizz-name {
    color: white;
}

/* Question Card */
.question-card {
    padding: 20px;
    border-radius: 10px;
}

/* Image des questions */
.question-image {
    width: 100%;
    max-width: 500px;
    height: 300px;
    object-fit: cover;
    margin-bottom: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Timer bar au-dessus des réponses */
.timer-container {
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    height: 6px;
    margin: 15px 0;
    border-radius: 4px;
    overflow: hidden;
}

.timer-bar {
    height: 6px;
    background: #ff4757;
    transition: width 0.5s ease-in-out;
}

/* Disposition des réponses en 2x2 */
.options-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 15px;
}

button {
    background: white;
    color: #080e24;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background: #2f59f5;
    color: white;
}

button.correct {
    background: #28a745;
}

button.wrong {
    background: #dc3545;
}

/* Animation d'apparition */
.fade-in {
    animation: fadeIn 0.5s ease-in-out;
}

.feedback {
    font-size: 1rem;
    margin-top: 30px;
    margin-bottom: 30px;
    color: white;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
