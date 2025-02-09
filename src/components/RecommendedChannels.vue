<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase';


const chaines = ref([]);

// Récupérer les chaînes YouTube recommandées
const fetchChaines = async () => {
    const { data, error } = await supabase
        .from('chaines')
        .select('*');

    if (error) {
        console.error("Erreur lors de la récupération des chaînes :", error);
    } else {
        chaines.value = data;
    }
};

onMounted(fetchChaines);
</script>

<template>
    <div class="chaines-section">
        <div class="page-subtitle">
            <h1 class="section-title">Chaînes</h1>
            <h1 class="section-title3">Recommandées</h1>
        </div>
        <div class="chaines-grid">
            <a v-for="chaine in chaines" :key="chaine.id" :href="chaine.link" target="_blank" class="chaine-card">
                <img :src="chaine.image" class="chaine-thumbnail">
                <span class="chaine-name">{{ chaine.name }}</span>
            </a>
        </div>
    </div>

</template>

<style scoped>
.chaines-section {
    margin-top: 40px;
    text-align: center;
    background-color: #080e24;
}

.page-subtitle {
    background-color: #080e24;
}

.section-title {
    font-size: 5rem;
    text-align: start;
    margin-left: 20px;
    color: #2f59f5;
    margin-top: 0px;
    padding-top: 80px;
}

.section-title3 {
    font-size: 5rem;
    text-align: start;
    margin-left: 20px;
    margin-top: -5rem;
    color: white;
    padding-bottom: 40px;
}

.chaines-grid {
    display: flex;
    gap: 80px;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 80px;
}

/* Carte Chaîne */
.chaine-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: white
}

.chaine-thumbnail {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 2px solid #2f59f5;
}

.chaine-thumbnail:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
}

.chaine-name {
    margin-top: 30px;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    font-family: 'Orbitron', sans-serif;
}
</style>
