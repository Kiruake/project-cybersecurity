<template>
    <section class="concepts-section">
        <h1 class="cards-title-concept">Avant de continuer, voici le minimum !</h1>

        <div class="concepts-container">
            <div v-for="(concept, index) in concepts" :key="index" class="concept-card">
                <img :src="concept.image" alt="Concept Image" class="concept-image" />
                <div class="concept-details">
                    <h3>{{ concept.title }}</h3>
                    <p>{{ concept.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase'; // Assurez-vous que supabase est bien configuré
import type { Concept } from '../types'; // Définir un type Concept

const concepts = ref<Concept[]>([]); // Variable réactive pour stocker les concepts récupérés

// Fonction pour récupérer les concepts depuis Supabase
const fetchConcepts = async () => {
    const { data, error } = await supabase
        .from('concepts') // Nom de la table dans Supabase
        .select('*'); // Sélectionner toutes les colonnes

    if (error) {
        console.error('Erreur lors de la récupération des concepts :', error);
    } else {
        concepts.value = data as Concept[]; // Caster les données pour correspondre au type Concept
    }
};

// Appeler la fonction pour récupérer les concepts au montage du composant
onMounted(() => {
    fetchConcepts();
});
</script>

<style scoped>
.concepts-section {
    padding: 80px 60px;
    background-color: #080e24;
    margin: 0 auto;
}

.cards-title-concept {
    color: #f5fcff;
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 80px;
    font-family: "Orbitron", serif;
}

h2 {
    font-size: 2.5rem;
    color: #080e24;
    margin-bottom: 40px;
}

.concepts-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
    gap: 30px;
    justify-items: center;
}

.concept-card {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #f5fcff;
    border-radius: 6px;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    height: 180px;
    width: 100%;
    max-width: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.concept-image {
    width: 40%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px 0 0 12px;
}

.concept-details {
    padding: 15px;
    flex: 1;
    text-align: left;
}

.concept-details h3 {
    font-size: 1.3rem;
    font-family: 'Orbitron', sans-serif;
    color: #080e24;
    margin-bottom: 10px;
}

.concept-details p {
    font-size: 13px;
    color: #333;
    line-height: 1.4;
}
</style>
