<script setup lang="ts">
import Challenge from '../components/Challenge.vue';
import Header from '../components/Header.vue';
</script>

<template>
    <Header />
    <div class="challenge-view">
        <div>
            <h1 class="title">🕵️‍♂️ Hacker Challenge</h1>
            <p class="description">Résous ces missions pour prouver tes compétences en cybersécurité !</p>
        </div>

        <Challenge />
    </div>
</template>

<style scoped>
/* Fond immersif style terminal hacker */
.challenge-view {
    margin: 0 auto;
    text-align: center;
    padding: 40px 20px;
}

/* Style du titre */
.title {
    font-size: 32px;
    font-weight: bold;
}

/* Style de la description */
.description {
    font-size: 18px;
    color: #333;
    margin-bottom: 30px;
}

/* Ajout d’un effet responsive */
@media (max-width: 768px) {
    .title {
        font-size: 26px;
    }

    .description {
        font-size: 14px;
    }

    .challenge-view {
        padding: 30px 15px;
    }
}
</style>
