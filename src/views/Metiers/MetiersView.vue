<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { supabase } from '@/supabase';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import { CurrencyEuroIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/vue/24/solid';

const metiers = ref([]);
const filteredMetiers = ref([]);
const router = useRouter();

// Filtres sélectionnés
const selectedNiveau = ref(null);
const selectedSalaireOrder = ref("asc");

// Récupérer les métiers depuis Supabase
const fetchMetiers = async () => {
    const { data, error } = await supabase.from('metiers').select('*');

    if (error) {
        console.error("Erreur de récupération des métiers :", error);
    } else {
        metiers.value = data;
        filteredMetiers.value = [...data]; // Copie initiale pour les filtres
    }
};

// Filtrer et trier les métiers
const filterMetiers = () => {
    let result = [...metiers.value];

    if (selectedNiveau.value) {
        result = result.filter(metier => metier.niveau_etude === selectedNiveau.value);
    }

    result.sort((a, b) => selectedSalaireOrder.value === "asc"
        ? a.salaire_min - b.salaire_min
        : b.salaire_min - a.salaire_min
    );

    filteredMetiers.value = result;
};

// Appliquer le filtrage au changement des filtres
watch([selectedNiveau, selectedSalaireOrder], filterMetiers);

// Rediriger vers la fiche du métier
const goToMetier = (id) => {
    router.push(`/metiers/${id}`);
};

onMounted(fetchMetiers);
</script>

<template>
    <Header />

    <div class="page-subtitle">
        <h1 class="section-title">Perspectives <span style="color: white;">d'avenir</span></h1>
        <h1 class="section-title2">Les métiers en <span style="color: #2f59f5;">cyber</span></h1>
    </div>

    <!-- Filtres -->
    <section class="filters">
        <div class="filter-group">
            <label for="niveau">Niveau d'étude</label>
            <select id="niveau" v-model="selectedNiveau">
                <option value="">Tous</option>
                <option value="BAC">BAC</option>
                <option value="BAC +3">BAC +3</option>
                <option value="BAC +5">BAC +5</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="salaire">Salaire minimum</label>
            <select id="salaire" v-model="selectedSalaireOrder">
                <option value="asc">Croissant</option>
                <option value="desc">Décroissant</option>
            </select>
        </div>
    </section>

    <!-- Grid des métiers -->
    <section class="metiers-section">
        <div v-if="filteredMetiers.length > 0" class="metiers-container">
            <div v-for="metier in filteredMetiers" :key="metier.id" class="metier-card">
                <div class="metier-image-wrapper">
                    <div class="metier-image-overlay"></div>
                    <img :src="metier.image" class="metier-image" />

                    <div class="metier-image-info">
                        <h3 class="metier-title">{{ metier.name }}</h3>
                    </div>
                </div>

                <div class="metier-info">
                    <p class="metier-description">{{ metier.description }}</p>

                    <div class="metier-details">
                        <span class="tag">
                            <CurrencyEuroIcon class="icon-tag" />
                            {{ metier.salaire_min }} - {{ metier.salaire_max }}k /an
                        </span>
                        <span class="tag">
                            <AcademicCapIcon class="icon-tag" />
                            {{ metier.niveau_etude }}
                        </span>
                        <span class="tag">
                            <BriefcaseIcon class="icon-tag" />
                            {{ metier.type ?? "Cybersécurité" }}
                        </span>
                    </div>

                    <button @click="goToMetier(metier.id)" class="button-metier">Voir les détails</button>
                </div>
            </div>
        </div>

    </section>
</template>

<style scoped>
/* ========== Section d'Introduction ========== */
.introduction-metier {
    position: relative;
    height: 500px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-size: cover;
}

.page-subtitle {
    background-color: #080e24;
}

/* Titre de la page */
.section-title {
    font-size: 5rem;
    text-align: start;
    margin-left: 20px;
    color: #2f59f5;
    margin-top: 0px;
    padding-top: 80px;
}

.section-title2 {
    font-size: 5rem;
    text-align: start;
    margin-left: 20px;
    margin-top: -5rem;
    padding-bottom: 80px;
    color: white;
}

.page-subtitle {
    font-size: 1.2rem;
    color: #b0b0b0;
    text-align: center;
    margin-bottom: 30px;
}

@media (max-width: 995px) {

    .section-title {
        font-size: 4rem;
        color: #2f59f5;
        margin-bottom: 0px;

    }

    .section-title2 {
        font-size: 4rem;
        margin-top: 10px;

    }
}

@media (max-width: 790px) {

    .section-title {
        font-size: 3rem;
        color: #2f59f5;
        margin-bottom: 0px;

    }

    .section-title2 {
        font-size: 3rem;
        margin-top: 10px;

    }
}

@media (max-width: 620px) {

    .section-title {
        font-size: 2.5rem;
        color: #2f59f5;
        margin-bottom: 0px;

    }

    .section-title2 {
        font-size: 2.5rem;
        margin-top: 10px;

    }
}


.parallax-metier {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background: url('/metiers/ImageMetiers.jpg');
    background-attachment: fixed;
}

.parallax-metier::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.intro-content-metier {
    text-align: center;
    z-index: 2;
    position: relative;
}

.intro-content-metier h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #f5fcff;
    width: 80%;
    margin: auto;
}

.intro-content-metier p {
    font-size: 1rem;
    margin: 40px auto;
    line-height: 1.8;
    width: 80%;
}

/* ========== Section des Métiers ========== */
.metiers-section {
    padding: 80px 20px;
    padding-top: 30px;
    background-color: #f9f9f9;
    font-family: "Roboto", sans-serif;
}

.metiers-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    padding: 10px;
}

.metier-card {
    position: relative;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease-in-out;
    height: 100%;
}

.metier-card:hover {
    transform: scale(1.03);
}

.metier-image-wrapper {
    width: 100%;
    height: 250px;
    overflow: hidden;
    position: relative;
}

.metier-image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
}

.metier-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.metier-image-info {
    position: absolute;
    bottom: 15px;
    left: 15px;
    color: white;
    z-index: 2;
}

.metier-title {
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
}

/* Informations du métier */
.metier-info {
    padding: 15px;
    background-color: #fff;
    color: #333;
}

.metier-description {
    color: #444;
    line-height: 1.6;
    margin-bottom: 15px;
}

/* Tags */
.metier-details {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 25px;
}

.tag {
    display: inline-flex;
    align-items: center;
    background-color: #ebf6ff;
    color: #333;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 0.9rem;
    font-weight: bold;
}

.icon-tag {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}

/* Bouton */
.button-metier {
    background-color: transparent;
    width: 100%;
    color: #080e24;
    border: 1px solid #080e24;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.button-metier:hover {
    background-color: #080e24;
    color: #f5fcff;
    border: none;
}



/* ========== Responsive ========== */
@media (max-width: 768px) {
    .metiers-container {
        grid-template-columns: 1fr;
    }

    .intro-content-metier h1 {
        font-size: 2rem;
    }

    .intro-content-metier p {
        font-size: 0.9rem;
    }
}

.filters {
    display: flex;
    gap: 40px;
    margin-top: 40px;
    padding: 30px;
    border-radius: 6px;
}

.filter-group {
    display: flex;
    flex-direction: column;
}

.filter-group label {
    font-weight: bold;
    color: #080e24;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 10px;
}

.filter-group select {
    padding: 10px;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
}

.filter-group select:focus {
    border-color: #080e24;
}

.no-results img {
    width: 300px;
    margin: auto;
    justify-content: center;
    text-align: center;
    display: block;
    margin-bottom: 80px;
}

.no-results p {
    text-align: center;
    font-size: 1.4rem;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 80px;
}

@media (max-width: 725px) {
    .filters {
        flex-direction: column;
    }

    .filter-group {
        width: 80%;
    }

    .intro-title h1 {
        font-size: 1.8rem;
        width: 95%;
    }

    .intro-title p {
        font-size: 0.9rem;
        width: 95%;
    }
}
</style>
