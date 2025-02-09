<template>
    <div class="score-summary">
        <h2>Quiz terminé ! 🎯</h2>
        <div class="score-info">
            <p>
                Tu as obtenu <span class="score">{{ score }}</span> /
                <span class="total">{{ totalQuestions }}</span>
            </p>
            <p>Soit un score de {{ percentageScore }}%</p>
        </div>

        <div class="questions-summary">
            <h3>Récapitulatif des questions</h3>
            <ul>
                <li v-for="(item, index) in questions" :key="index" class="question-item">
                    <h4>Question {{ index + 1 }} : {{ item.question }}</h4>
                    <p class="correct">
                        <strong>Bonne réponse :</strong> {{ item.correctAnswer }}
                    </p>
                    <p class="user" :class="{
                        wrong: item.userAnswer !== item.correctAnswer,
                        right: item.userAnswer === item.correctAnswer
                    }">
                        <strong>Ta réponse :</strong>
                        {{ item.userAnswer || "Aucune réponse" }}
                    </p>
                </li>
            </ul>
        </div>

        <div class="buttons">
            <button @click="restartQuiz" class="btn restart">Recommencer</button>
            <router-link :to="courseLink" class="btn course">Voir le cours</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface QuestionResponse {
    question: string;
    correctAnswer: string;
    userAnswer: string;
}

const props = defineProps<{
    score: number;
    totalQuestions: number;
    questions: QuestionResponse[];
    courseSlug: string;
}>();

const emit = defineEmits(['restart']);

const restartQuiz = () => {
    emit('restart');
};

const percentageScore = computed(() => {
    return Math.round((props.score / props.totalQuestions) * 100);
});

const courseLink = computed(() => `/cours/${props.courseSlug}`);
</script>

<style scoped>
.score-summary {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.score-summary h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2f59f5;
}

.score-info p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
}

.score-info .score {
    color: #28a745;
    font-weight: bold;
}

.score-info .total {
    color: #ff4757;
    font-weight: bold;
}

.questions-summary {
    text-align: left;
    margin-top: 2rem;
}

.questions-summary h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #333;
}

.question-item {
    background: #f7f7f7;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    border-left: 4px solid #2f59f5;
}

.question-item h4 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
}

.question-item p {
    margin: 0.2rem 0;
}

.correct {
    color: #28a745;
}

.user.right {
    color: #28a745;
}

.user.wrong {
    color: #ff4757;
}

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
</style>