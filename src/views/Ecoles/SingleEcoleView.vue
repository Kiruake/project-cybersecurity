<template>
    <section class="ecole-page">
        <h1>{{ ecole?.name }}</h1>

        <div class="ecole-details">
            <img :src="ecole?.image" alt="Ecole Image" class="ecole-image" />
            <div class="ecole-info">
                <h3>Description</h3>
                <p>{{ ecole?.description }}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../../supabase';
import type { Ecole } from '../../types';

const ecole = ref<Ecole | null>(null); // Variable pour stocker les informations de l'école
const route = useRoute(); // Utiliser les paramètres de la route

const ecoleId = route.params.ecoleId; // Récupérer l'ID de l'école à partir des paramètres de l'URL

// Fonction pour récupérer les détails de l'école depuis Supabase
const fetchEcole = async () => {
    const { data, error } = await supabase
        .from('ecoles')
        .select('*')
        .eq('id', ecoleId)
        .single(); // Récupérer un seul résultat

    if (error) {
        console.error('Erreur lors de la récupération de l\'école:', error);
    } else {
        ecole.value = data as Ecole; // Stocker les données dans la variable réactive
    }
};

// Appeler la fonction pour récupérer les détails de l'école au montage du composant
onMounted(() => {
    fetchEcole();
});
</script>

<style scoped>
.ecole-page {
    padding: 60px;
    background-color: #f5f5f5;
}

.ecole-details {
    display: flex;
    align-items: center;
    gap: 20px;
}

.ecole-image {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
}

.ecole-info {
    max-width: 600px;
}

h1 {
    font-size: 2.5rem;
    color: #080e24;
    font-weight: bold;
}

h3 {
    margin-top: 20px;
    font-size: 1.8rem;
    color: #333;
}

p {
    font-size: 1rem;
    color: #666;
}
</style>