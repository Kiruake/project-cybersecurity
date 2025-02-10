<template>
    <section class="cards-container">
        <div class="card" v-for="(card, index) in cours" :key="index">
            <div class="icon-container">
                <img :src="card.icon" alt="Card Icon" class="card-icon" width="28" />
            </div>
            <div class="card-content">
                <h3>{{ card.title }}</h3>
                <p>{{ card.description }}</p>
                <router-link :to="`/cours/${card.slug}`" class="card-button">Voir le cours</router-link>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';
import type { Cours } from '../types';

// Définir une variable pour stocker les cours récupérés
const cours = ref<Cours[]>([]);

// Fonction pour récupérer les cours depuis Supabase
const fetchCourses = async () => {
    const { data, error } = await supabase
        .from('cours') // Nom de la table dans Supabase
        .select('*'); // Sélectionner toutes les colonnes

    if (error) {
        console.error('Erreur lors de la récupération des cours :', error);
    } else {
        cours.value = data as Cours[]; // Assurez-vous que les données correspondent au type Course
    }
};

// Appeler la fonction au montage du composant pour récupérer les données
onMounted(() => {
    fetchCourses();
});
</script>

<style scoped>
/* Vos styles restent inchangés */
.cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    padding: 70px;
    padding-bottom: 0px;
    justify-items: center;
}

.card {
    position: relative;
    width: 80%;
    max-width: 350px;
    height: auto;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.icon-container {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: #080e24;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.card-icon {
    fill: #080e24;
}

.card-content {
    margin-top: 60px;
}

.card-content h3 {
    font-size: 18px;
    font-family: "Orbitron", serif;
    font-weight: bold;
    color: #080e24;
    margin-bottom: 8px;
}

.card-content p {
    font-size: 14px;
    color: #333;
    line-height: 1.5;
    margin-bottom: 30px;
}

.card-button {
    background-color: transparent;
    color: #080e24;
    border: 1px solid #080e24;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    margin-top: 15px;
    font-family: "Orbitron", serif;
}

.card-button:hover {
    background-color: #080e24;
    color: white;
}

/* === Responsive Design === */

/* 📱 Tablette (768px - 1023px) */
@media (max-width: 1023px) {
    .cards-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        padding: 50px;
        padding-bottom: 0px;
    }

    .card {
        width: 100%;
        max-width: 280px;
        height: 280px;
        padding: 15px;
        bottom: 0;
    }

    .card-content h3 {
        font-size: 16px;
    }

    .card-content p {
        font-size: 13px;
    }

    .card-button {
        font-size: 11px;
        padding: 8px 15px;
    }

    .icon-container {
        width: 40px;
        height: 40px;
    }

    .card-icon {
        width: 22px;
    }
}

/* 📱 Mobile (≤768px) */
@media (max-width: 768px) {
    .cards-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        padding: 40px 30px;
    }

    .card {
        width: 100%;
        max-width: 260px;
        height: auto;
        padding: 15px;
    }

    .card-content h3 {
        font-size: 15px;
    }

    .card-content p {
        font-size: 12px;
    }

    .card-button {
        font-size: 10px;
        padding: 7px 12px;
    }
}

/* 📱 Petit Mobile (≤480px) */
@media (max-width: 670px) {
    .cards-container {
        grid-template-columns: 1fr;
        padding: 60px 15px;
        padding-bottom: 0px;
        gap: 40px;
    }

    .card {
        width: 100%;
        height: auto;
        max-width: 90%;
    }

    .card-content h3 {
        font-size: 16px;
    }

    .card-content {
        margin-top: 40px;
    }

    .card-content p {
        font-size: 12px;
    }

    .card-button {
        font-size: 12px;
        padding: 6px 10px;
    }

    .icon-container {
        width: 35px;
        height: 35px;
    }

    .card-icon {
        width: 20px;
    }
}
</style>
