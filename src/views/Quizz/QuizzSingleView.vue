<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from "vue";
import { supabase } from "@/supabase";
import ScoreComponent from "@/components/ScoreComponent.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import Header from "@/components/Header.vue";

const route = useRoute();
const quizId = computed(() => Number(route.params.id));

const currentQuiz = ref<any>(null);
const currentQuestionIndex = ref<number>(0);
const score = ref<number>(0);
const selectedOption = ref<string | null>(null);
const isCorrect = ref<boolean | null>(null);
const feedbackMessage = ref<string>("");
const isQuizFinished = ref<boolean>(false);

// Timer : progress en pourcentage (0 à 100) sur 8 secondes
const progress = ref(0);
let timerInterval: number | null = null;
const TIMER_DURATION = 8000; // en millisecondes
const TIMER_UPDATE_INTERVAL = 50; // intervalle d'update en ms

// Tableau des lettres pour les options
const optionLetters = ['A', 'B', 'C', 'D'];

const currentQuestion = computed(() => {
    return currentQuiz.value?.questions_quizz?.[currentQuestionIndex.value];
});

// Variable pour stocker les options mélangées
const shuffledOptions = ref<string[]>([]);

// Fonction de mélange (Fisher–Yates)
function shuffleArray<T>(array: T[]): T[] {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Lorsque la question change, on mélange les options
watch(currentQuestion, (newQuestion) => {
    if (newQuestion) {
        shuffledOptions.value = shuffleArray(newQuestion.options);
        // Redémarrer le timer pour la nouvelle question
        startTimer();
    }
});

// Chargement du quiz depuis Supabase
const fetchQuiz = async () => {
    if (!quizId.value) {
        console.error("quizId is missing");
        return;
    }
    const { data, error } = await supabase
        .from("quizz")
        .select("*, questions_quizz(*)")
        .eq("id", quizId.value)
        .single();

    if (error) {
        console.error("Erreur lors de la récupération du quiz:", error);
    } else {
        currentQuiz.value = data;
    }
};

watch(() => quizId.value, fetchQuiz, { immediate: true });

// Démarre ou redémarre le timer pour une nouvelle question
const startTimer = () => {
    progress.value = 0;
    if (timerInterval) clearInterval(timerInterval);
    const step = 100 / (TIMER_DURATION / TIMER_UPDATE_INTERVAL);
    timerInterval = setInterval(() => {
        progress.value += step;
        if (progress.value >= 100) {
            progress.value = 100;
            clearInterval(timerInterval as number);
            // Si l'utilisateur n'a pas répondu dans le temps, on considère la réponse comme fausse
            if (selectedOption.value === null) {
                checkAnswer("");
            }
        }
    }, TIMER_UPDATE_INTERVAL) as unknown as number;
};

// Annule le timer si une réponse est donnée
const stopTimer = () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
};

// Vérification de la réponse
const checkAnswer = (option: string): void => {
    if (selectedOption.value !== null) return; // Empêche la réponse multiple
    selectedOption.value = option;
    stopTimer();
    if (option === currentQuestion.value?.answer) {
        isCorrect.value = true;
        feedbackMessage.value = "Bonne réponse ! 🎉";
        score.value++;
    } else {
        isCorrect.value = false;
        feedbackMessage.value = "Mauvaise réponse 😕";
    }
};

// Passage à la question suivante
const nextQuestion = (): void => {
    if (currentQuestionIndex.value < (currentQuiz.value?.questions_quizz.length || 0) - 1) {
        currentQuestionIndex.value++;
        selectedOption.value = null;
        isCorrect.value = null;
        feedbackMessage.value = "";
    } else {
        isQuizFinished.value = true;
    }
};

// Redémarrage du quiz
const restartQuiz = (): void => {
    currentQuestionIndex.value = 0;
    score.value = 0;
    isQuizFinished.value = false;
    selectedOption.value = null;
    isCorrect.value = null;
    feedbackMessage.value = "";
};

// Quitter le quiz
const quitQuiz = (): void => {
    if (confirm("Es-tu sûr de vouloir quitter le quiz ?")) {
        router.push("/quizz");
    }
};

// Pour nettoyer le timer lors de la destruction du composant
onBeforeUnmount(() => {
    stopTimer();
});
</script>

<template>
    <Header />
    <div class="quiz-container" v-if="currentQuiz">
        <!-- Bouton quitter -->
        <button class="quit-btn" @click="quitQuiz">❌</button>

        <div v-if="!isQuizFinished" class="question-card">
            <!-- Zone d'image avec overlay -->
            <div v-if="currentQuestion?.image" class="question-image-wrapper">
                <img :src="currentQuestion.image" alt="Illustration de la question" class="question-image" />
                <div class="image-overlay">
                    <div class="question-counter">
                        Question {{ currentQuestionIndex + 1 }} / {{ currentQuiz.questions_quizz.length }}
                    </div>
                    <h2 class="question-title">{{ currentQuestion.question }}</h2>
                    <!-- Bouton "Question suivante" positionné en bas à gauche de l'image, visible dès qu'une réponse est donnée -->
                    <button v-if="selectedOption !== null" class="next-btn-overlay" @click="nextQuestion">
                        Question suivante
                    </button>
                </div>
            </div>
            <!-- En l'absence d'image -->
            <div v-else class="question-no-image">
                <div class="question-counter">
                    Question {{ currentQuestionIndex + 1 }} / {{ currentQuiz.questions_quizz.length }}
                </div>
                <h2 class="question-title">{{ currentQuestion.question }}</h2>
            </div>

            <!-- Barre de timer positionnée au-dessus des options -->
            <div class="timer-bar-wrapper">
                <div class="timer-bar" :style="{ width: progress + '%' }"></div>
            </div>

            <!-- Grille des propositions en 2x2 -->
            <div class="options-grid">
                <button v-for="(option, index) in shuffledOptions" :key="index" @click="checkAnswer(option)" :class="{
                    correct: selectedOption !== null && option === currentQuestion.answer,
                    wrong: selectedOption !== null && option === selectedOption && option !== currentQuestion.answer
                }">
                    <div class="option-content">
                        <span class="option-letter">{{ optionLetters[index] }}</span>
                        <span class="option-text">{{ option }}</span>
                    </div>
                </button>
            </div>

            <!-- En l'absence d'image, le bouton "Question suivante" est placé sous les options -->
            <div v-if="!currentQuestion?.image && selectedOption !== null" class="feedback">
                <button class="next-btn" @click="nextQuestion">Question suivante</button>
            </div>
        </div>

        <!-- Affichage du score en fin de quiz -->
        <ScoreComponent v-if="isQuizFinished" :score="score" :totalQuestions="currentQuiz.questions_quizz.length"
            @restart="restartQuiz" />
    </div>
</template>

<style scoped>
/* Conteneur principal */
.quiz-container {
    max-width: 95%;
    margin: 40px auto;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    position: relative;
    color: white;
}

/* En-tête principal */
.quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.quiz-title {
    font-size: 28px;
    margin: 0;
    color: #080e24;
}

/* Bouton quitter */
.quit-btn {
    background: transparent;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
    transition: transform 0.3s;
    position: absolute;
    z-index: 100;
    top: 10px;
    right: 10px;
}

.quit-btn:hover {
    transform: scale(1.1);
}

/* Carte de la question */
.question-card {
    margin-top: 20px;
}

/* Zone d'image et overlay */
.question-image-wrapper {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.question-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.question-counter {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.6);
    padding: 10px 20px;
    border-radius: 4px;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2rem;
}

.question-title {
    font-size: 1.8rem;
    line-height: 1.2;
    margin: 0;
    color: white;
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

/* Bouton "Question suivante" sur l'image (bas à gauche) */
.next-btn-overlay {
    position: absolute;
    bottom: 20px;
    left: 50px;
    background: #28a745;
    border: 1px solid white;
    color: white;
    border: none;
    padding: 8px 16px;
    font-family: 'Orbitron', sans-serif;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s;
}

.next-btn-overlay:hover {
    background: rgb(54, 154, 77);
}

/* Zone sans image */
.question-no-image {
    text-align: center;
    margin-bottom: 20px;
    padding: 20px;
    background: #222;
    border-radius: 10px;
}

/* Barre de timer */
.timer-bar-wrapper {
    background: #ccc;
    height: 10px;
    border-radius: 5px;
    margin: 20px 50px 0 50px;
}

.timer-bar {
    height: 100%;
    background: #dc3545;
    transition: width 0.05s linear;
    border-radius: 6px;
}

/* Grille des options en 2x2 */
.options-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    padding: 30px 50px 30px 50px;
    margin-bottom: 20px;
}

/* Boutons d'option */
.options-grid button {
    background: #2f59f5;
    border: none;
    color: white;
    padding: 12px;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
}

.options-grid button:hover {
    background: #2148d4;
}

.options-grid button.correct {
    background: #28a745;
    color: white;
}

.options-grid button.wrong {
    background: #dc3545;
    color: white;
}

/* Contenu interne de l'option */
.option-content {
    display: flex;
    align-items: center;
    width: 100%;
}

.option-letter {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: white;
    color: #2f59f5;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin-right: 10px;
    font-weight: bold;
}

.option-text {
    flex: 1;
    text-align: left;
    font-family: monospace;
    font-size: 14px;
}

/* Feedback et bouton "Suivant" en l'absence d'image */
.feedback {
    text-align: center;
}

.feedback p {
    font-size: 18px;
    margin-bottom: 10px;
}

.feedback .success {
    color: #28a745;
}

.feedback .error {
    color: #dc3545;
}

.next-btn {
    background: #080e24;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    border: 1px solid white;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
    transition: background 0.3s;
}

.next-btn:hover {
    background: #0056b3;
}
</style>
