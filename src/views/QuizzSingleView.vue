<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import QuizzComponent from "../components/QuizzComponent.vue";
import Header from "../components/Header.vue";

const route = useRoute();
const quizId = computed(() => Number(route.params.id));
</script>

<template>
    <Header />
    <div class="quiz-page">
        <QuizzComponent :quizId="quizId" />
    </div>
</template>

<style scoped>
.quiz-page {
    padding: 20px;
    display: flex;
    justify-content: center;
}
</style>
