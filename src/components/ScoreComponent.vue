<script setup lang="ts">
import { computed } from 'vue';

interface QuestionResponse {
    question: string;
    correctAnswer: string;
    userAnswer: string | null;
}

const props = defineProps<{
    score: number;
    totalQuestions: number;
    questions: QuestionResponse[];
}>();

const emit = defineEmits(['restart']);

const restartQuiz = () => {
    emit('restart');
};

const percentageScore = computed(() => {
    return Math.round((props.score / props.totalQuestions) * 100);
});
</script>

<template>
    <div class="score-summary">
        <h2>Quiz terminé ! 🎯</h2>
        <div class="score-info">
            <p>
                Tu as obtenu <span class="score">{{ score }}</span> /
                <span class="total">{{ totalQuestions }}</span>
            </p>
            <p>Soit un score de <strong>{{ percentageScore }}%</strong></p>
        </div>

        <!-- Récapitulatif des réponses -->
        <div class="questions-summary">
            <h3>Récapitulatif des questions</h3>
            <ul>
                <li v-for="(item, index) in questions" :key="index" class="question-item">
                    <h4>Question {{ index + 1 }} : {{ item.question }}</h4>
                    <p class="correct">
                        ✅ <strong>Bonne réponse :</strong> {{ item.correctAnswer }}
                    </p>
                    <p class="user" :class="{
                        wrong: item.userAnswer !== item.correctAnswer,
                        right: item.userAnswer === item.correctAnswer
                    }">
                        <span v-if="item.userAnswer === item.correctAnswer">✅ </span>
                        <span v-else>❌ </span>
                        <strong>Ta réponse :</strong>
                        {{ item.userAnswer || "Aucune réponse" }}
                    </p>
                </li>
            </ul>
        </div>

        <!-- Boutons d'action -->
        <div class="buttons">
            <button @click="restartQuiz" class="btn restart">Recommencer</button>
            <router-link to="/quizz" class="btn back">Retour aux quizz</router-link>
        </div>
    </div>
</template>

<style scoped>
.score-summary {

    margin: 2rem auto;
    margin-bottom:100px;
    padding: 2rem;
    background: none;
    text-align: center;
}

.score-summary h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #080e24;
}

.score-info p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    color: #333;
}

.score-info .score {
    color: #28a745;
    font-weight: bold;
}

.score-info .total {
    color: #ff4757;
    font-weight: bold;
}

/* Récapitulatif des questions */
.questions-summary {
    text-align: left;
    margin-top: 2rem;
}

.questions-summary h3 {
    font-size: 1.8rem;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 2rem;
    color: #333;
}

.question-item {
    background: #f7f7f7;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 2rem;
    border-left: 4px solid #2f59f5;
}

.question-item h4 {
    margin: 0 0 0.5rem;
    color: #080e24;
}

.correct {
    color: #28a745;
    font-weight: bold;
}

.user.right {
    color: #28a745;
    font-weight: bold;
}

.user.wrong {
    color: #ff4757;
    font-weight: bold;
    margin-bottom: 0px;
}

/* Boutons */
.buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
}

.btn {
    background: #2f59f5;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-size: 1rem;
    font-family: 'Orbitron', sans-serif;
    cursor: pointer;
    transition: background 0.3s ease;
}

.btn:hover {
    background: #1a3ac0;
}

.btn.restart {
    background: #ff4757;
}

.btn.restart:hover {
    background: #e8413c;
}

.btn.back {
    background: #28a745;
}

.btn.back:hover {
    background: #239636;
}
</style>
