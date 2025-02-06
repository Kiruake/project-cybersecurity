<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { supabase } from "@/supabase";
import ScoreComponent from "@/components/ScoreComponent.vue"; // Si vous avez un composant de score
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();
const quizId = computed(() => Number(route.params.id)); // Récupère l'ID du quiz depuis la route

const currentQuiz = ref<any>(null); // Quiz actuel
const currentQuestionIndex = ref<number>(0); // Index de la question actuelle
const score = ref<number>(0); // Score du quiz
const selectedOption = ref<string | null>(null); // Option sélectionnée
const isCorrect = ref<boolean | null>(null); // Si la réponse est correcte
const feedbackMessage = ref<string>(""); // Message de feedback sur la réponse
const isQuizFinished = ref<boolean>(false); // Si le quiz est terminé

// Calculer la question actuelle en fonction de l'index
const currentQuestion = computed(() => {
    return currentQuiz.value?.questions_quizz?.[currentQuestionIndex.value];
});

// Charger le quiz et ses questions depuis Supabase
const fetchQuiz = async () => {
    if (!quizId.value) {
        console.error("quizId is missing");
        return;
    }

    const { data, error } = await supabase
        .from("quizz")
        .select("*, questions_quizz(*)") // Sélectionner le quiz et ses questions
        .eq("id", quizId.value)
        .single(); // Assurez-vous de n'obtenir qu'un seul quiz

    if (error) {
        console.error("Erreur lors de la récupération du quiz:", error);
    } else {
        currentQuiz.value = data; // Assignez le quiz récupéré à currentQuiz
    }
};

// Lorsque l'ID du quiz change, relancez la récupération des données
watch(() => quizId.value, fetchQuiz, { immediate: true });

// Fonction pour vérifier la réponse
const checkAnswer = (option: string): void => {
    selectedOption.value = option;
    if (option === currentQuestion.value?.answer) {
        isCorrect.value = true;
        feedbackMessage.value = "Bonne réponse ! 🎉";
        score.value++;
    } else {
        isCorrect.value = false;
        feedbackMessage.value = `Mauvaise réponse 😕. La bonne réponse est: ${currentQuestion.value?.answer}.`;
    }
};

// Fonction pour passer à la question suivante
const nextQuestion = (): void => {
    if (currentQuestionIndex.value < (currentQuiz.value?.questions_quizz.length || 0) - 1) {
        currentQuestionIndex.value++;
        selectedOption.value = null;
        isCorrect.value = null;
        feedbackMessage.value = ""; // Réinitialiser le message de feedback
    } else {
        isQuizFinished.value = true; // Fin du quiz
    }
};

// Fonction pour redémarrer le quiz
const restartQuiz = (): void => {
    currentQuestionIndex.value = 0;
    score.value = 0;
    isQuizFinished.value = false;
};

// Fonction pour quitter le quiz
const quitQuiz = (): void => {
    if (confirm("Es-tu sûr de vouloir quitter le quiz ?")) {
        router.push("/quizz"); // Redirige vers l'accueil
    }
};
</script>

<template>
    <div class="quiz-container" v-if="currentQuiz">
        <button class="quit-btn" @click="quitQuiz">❌</button>

        <h1 class="quizz-name">{{ currentQuiz.title }}</h1>

        <div v-if="!isQuizFinished" class="question-card fade-in">
            <h2 class="question-title">
                Question {{ currentQuestionIndex + 1 }} : {{ currentQuestion?.question }}
            </h2>

            <img :src="currentQuestion?.image" alt="Illustration" class="question-image"
                v-if="currentQuestion?.image" />

            <div class="options-grid">
                <button v-for="(option, index) in currentQuestion?.options" :key="index" @click="checkAnswer(option)">
                    {{ option }}
                </button>
            </div>

            <!-- Afficher le feedback sous les choix -->
            <div v-if="selectedOption !== null" class="feedback">
                <p :class="{ 'correct': isCorrect, 'wrong': !isCorrect }">{{ feedbackMessage }}</p>
            </div>

            <button v-if="isCorrect !== null" @click="nextQuestion" class="next-btn">Suivant</button>
        </div>

        <ScoreComponent v-if="isQuizFinished" :score="score" :totalQuestions="currentQuiz.questions_quizz.length"
            @restart="restartQuiz" />
    </div>
</template>

<style scoped>
/* Style pour les questions et les réponses */
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

.feedback.correct {
    color: #28a745;
    /* Vert pour la bonne réponse */
}

.feedback.wrong {
    color: #dc3545;
    /* Rouge pour la mauvaise réponse */
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
