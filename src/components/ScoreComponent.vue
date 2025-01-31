<template>
    <div class="score-container">
        <h2>Quiz terminé ! 🎯</h2>
        <p>Tu as obtenu <span class="score">{{ score }}</span> / <span class="total">{{ totalQuestions }}</span></p>
        <button @click="restartQuiz">Recommencer</button>
    </div>
</template>

<script setup lang="ts">
defineProps<{ score: number; totalQuestions: number }>();

const emit = defineEmits(["restart"]);

const restartQuiz = () => {
    emit("restart");
};
</script>

<style scoped>
.score-container {
    text-align: center;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: auto;
}

h2 {
    font-size: 24px;
    color: #2f59f5;
}

p {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
}

.score {
    color: #28a745;
}

.total {
    color: #ff4757;
}

button {
    background: #2f59f5;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background: #1d3bb8;
}
</style>
