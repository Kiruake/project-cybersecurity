<template>
    <main class="cards-container">
        <div class="card" v-for="(parcours, index) in parcoursList" :key="index">
            <!-- Ajout d'un fond transparent sur l'image -->
            <div class="image-overlay"></div>
            <img :src="parcours.image" :alt="parcours.title" />
            <div class="card-content">
                <h2>{{ parcours.title }}</h2>
                <p>{{ parcours.description }}</p>
                <button @click="goTo(parcours.id)" class="button">
                    En savoir plus
                </button>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';
import type { Diplome } from '../types';

const parcoursList = ref<Diplome[]>([]); // Variable pour stocker les diplômes

const router = useRouter();

// Fonction pour récupérer les diplômes depuis Supabase
const fetchDiplomes = async () => {
    const { data, error } = await supabase
        .from('diplomes') // Table des diplômes
        .select('*');

    if (error) {
        console.error('Erreur lors de la récupération des diplômes:', error);
    } else {
        parcoursList.value = data as Diplome[]; // Mettre à jour la liste avec les données récupérées
    }
};

// Fonction pour rediriger vers la page des écoles d'un diplôme
const goTo = (diplomeId: number) => {
    router.push(`/ecoles/${diplomeId}`); // Rediriger vers la page des écoles liées à ce diplôme
};

// Appeler la fonction pour récupérer les diplômes lors du montage du composant
onMounted(() => {
    fetchDiplomes();
});
</script>

<style scoped>
/* Conteneur principal */
.cards-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    padding: 80px 70px;
    padding-bottom: 0px;
}

/* Styles des cartes */
.card {
    width: 26rem;
    height: 32rem;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    color: rgb(240, 240, 240);
    box-shadow: 0 8px 25px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

/* Fond transparent ajouté sur l'image */
.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    /* Ajustez cette valeur pour la teinte de l'overlay */
    z-index: 1;
}

/* Image de la carte */
.card img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
    transition: opacity 0.15s ease-out;
    z-index: 0;
}

/* Contenu de la carte */
.card-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    z-index: 2;
}

/* Titre de la carte */
.card h2 {
    position: absolute;
    inset: auto auto 30px 30px;
    margin: 0;
    color: #f5fcff;
    font-family: "Orbitron", serif;
    font-weight: normal;
    text-transform: uppercase;
    z-index: 2;
}

/* Description de la carte */
.card p {
    position: absolute;
    color: #f5fcff;
    opacity: 0;
    max-width: 80%;
    inset: auto auto 80px 30px;
    transition: opacity 0.2s ease-out;
    z-index: 2;
    line-height: 1.6;
}

/* Bouton */
.card button {
    position: absolute;
    inset: auto auto 40px 30px;
    opacity: 0;
    background-color: #080e24;
    color: #f5fcff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Orbitron', serif;
    gap: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    z-index: 2;
}

.card button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

.card:hover h2 {
    inset: auto auto 220px 30px;
    transition: inset 0.2s ease-out;
}

.card:hover p,
.card:hover button {
    opacity: 1;
    transition: opacity 0.3s 0.1s ease-in;
}

.card:hover img {
    transition: opacity 0.2s ease-in;
    opacity: 1;
}
</style>
