<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../../supabase";
import type { Ecole } from "../../types";
import Header from "../../components/Header.vue";

const ecolesList = ref<Ecole[]>([]);
const filteredEcoles = ref<Ecole[]>([]);
const villesDisponibles = ref<string[]>([]);
const route = useRoute();
const diplomeId = route.params.diplomeId;
const diplomaName = ref<string | null>(null);
const stats = ref<any[]>([]);

// Filtres sélectionnés
const selectedDiplome = ref<string | null>(null);
const selectedVille = ref<string | null>(null);
const selectedType = ref<string | null>(null);

const backgroundImage = computed(() => {
    switch (diplomeId) {
        case "1": return "/ecoles/ImageEcoles3.jpg";
        case "2": return "/ecoles/ImageEcoles2.jpg";
        case "3": return "/ecoles/ImageEcoles.jpg";
        default: return "/ecoles/ImageEcoles.jpg";
    }
});

// Récupération des données depuis Supabase
const fetchDiplomaAndSchoolsAndStats = async () => {
    const { data: diplomaData } = await supabase
        .from("diplomes")
        .select("title, stats")
        .eq("id", diplomeId)
        .single();

    if (diplomaData) {
        diplomaName.value = diplomaData.title || "Inconnu";
        stats.value = diplomaData.stats || [];
    }

    const { data: schoolsData } = await supabase
        .from("ecoles")
        .select("*")
        .eq("diplome_id", diplomeId);

    if (schoolsData) {
        // Traitement des diplômes NULL => BAC
        ecolesList.value = schoolsData.map(ecole => ({
            ...ecole,
            diplome_requis: ecole.diplome_requis === null ? "BAC" : `BAC +${ecole.diplome_requis}`
        }));

        filteredEcoles.value = ecolesList.value;

        // Extraire les villes uniques
        villesDisponibles.value = [...new Set(schoolsData.map(ecole => ecole.ville))].sort();
    }
};

// Fonction de filtrage dynamique
const filterEcoles = () => {
    filteredEcoles.value = ecolesList.value.filter(ecole => {
        const matchDiplome = selectedDiplome.value ? ecole.diplome_requis.toString() === selectedDiplome.value : true;
        const matchVille = selectedVille.value ? ecole.ville === selectedVille.value : true;
        const matchType = selectedType.value ? ecole.type === selectedType.value : true;
        return matchDiplome && matchVille && matchType;
    });
};

// Appliquer le filtrage lorsque les filtres changent
watch([selectedDiplome, selectedVille, selectedType], filterEcoles);

onMounted(fetchDiplomaAndSchoolsAndStats);
</script>

<template>
    <Header />

    <section class="introduction">
        <!-- On lie dynamiquement le style de la div parallax -->
        <div class="parallax" :style="{ backgroundImage: `url(${backgroundImage})` }">
            <div class="intro-content"
                style="display: flex; align-items: center; justify-content: center; height: 100%;">
                <div class="intro-title" style="text-align: center; z-index: 1000;">
                    <h1 class="fadeInAnimation">
                        Liste des {{ diplomaName }} en lien avec la
                        cybersécurité
                    </h1>
                    <p class="fadeInAnimation delay">
                        Marre des tutos YouTube et des forums remplis d'"hackers auto-proclamés" ?
                        Voici les écoles qui vont te donner un vrai diplôme et t’éviter de finir en script kiddie
                        à vie.
                        Cyberattaques, protection des données, hacking éthique…
                        Choisis bien, car c'est peut-être ici que ton futur boss te repérera 👀
                    </p>
                </div>
            </div>
        </div>
    </section>


    <!-- Section Filtres -->
    <section class="filters">
        <div class="filter-group">
            <label for="diplome">Diplôme requis</label>
            <select id="diplome" v-model="selectedDiplome">
                <option value="">Tous</option>
                <option value="BAC">BAC</option>
                <option value="BAC +3">BAC +3</option>
                <option value="BAC +2">BAC +2</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="ville">Ville</label>
            <select id="ville" v-model="selectedVille">
                <option value="">Toutes</option>
                <option v-for="ville in villesDisponibles" :key="ville" :value="ville">{{ ville }}</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="type">Type d'école</label>
            <select id="type" v-model="selectedType">
                <option value="">Tous</option>
                <option value="Public">Public</option>
                <option value="Privé">Privé</option>
            </select>
        </div>
    </section>

    <!-- Affichage des écoles -->
    <section id="ecoles-section" class="ecoles-section">
        <div v-if="filteredEcoles.length > 0" class="ecoles-container">
            <div v-for="(ecole, index) in filteredEcoles" :key="index" class="ecole-card">
                <div class="ecole-image-wrapper">
                    <div class="type-tag tag">{{ ecole.type }}</div>
                    <div class="ecole-image-overlay"></div>
                    <img :src="ecole.image" alt="Image de l'école" class="ecole-image" />
                    <div class="ecole-image-info">
                        <h3 class="ecole-title">{{ ecole.name }}</h3>
                        <p class="ecole-location">{{ ecole.lieu }}, {{ ecole.ville }}</p>
                    </div>
                </div>

                <div class="ecole-info">
                    <p class="ecole-description">{{ ecole.description }}</p>

                    <div class="ecole-parcours">
                        <span class="tag">
                            <img class="icon-tag" src="/icons/IconParcours.svg" alt="Parcours" />
                            {{ ecole.parcours.join(" / ") }}
                        </span>
                        <span class="tag">
                            <img class="icon-tag" src="/icons/IconPrix.svg" alt="Prix" />
                            {{ ecole.prix }} €/an
                        </span>
                        <span class="tag">
                            <img class="icon-tag" src="/icons/IconDiplome.svg" alt="Diplome" />
                            {{ ecole.diplome_requis ? `${ecole.diplome_requis}` : 'BAC' }}
                        </span>
                    </div>

                    <a :href="ecole.link" target="_blank" rel="noopener noreferrer" class="button">Voir l'école</a>
                </div>
            </div>
        </div>

        <!-- Message lorsqu'aucune école ne correspond aux filtres -->
        <div v-else class="no-results">
            <p>Aucune école ne correspond à vos critères... Essayez d'autres filtres !</p>
            <img src="/images/search.png" alt="Aucune école trouvée" class="no-results-img">
        </div>
    </section>
</template>

<style scoped>
/* Style global de la section d'introduction */
.introduction {
    position: relative;
    height: 500px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-size: cover;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.6);
}

/* Effet de Parallaxe */
.parallax {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-size: cover;
}

.parallax::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}

/* Texte central de l'introduction */
.intro-content {
    text-align: center;
    z-index: 2;
    position: relative;
}

.intro-title h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #f5fcff;
    width: 80%;
    z-index: 1000;
    margin: auto;
}

.intro-title p {
    font-size: 1rem;
    margin: 40px auto;
    line-height: 1.8;
    width: 80%;
}

@media (max-width: 768px) {
    .intro-title h1 {
        font-size: 2rem;
    }

    .intro-title p {
        font-size: 0.9rem;
        width: 90%;
    }
}

.button {
    background-color: #080e24;
    color: #f5fcff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    z-index: 2;
}

.button:hover {
    background-color: #1c44b5;
    transform: translateY(-5px);
}

.animateButton:hover {
    animation: pulse 1.2s infinite;
}

/* Animation de l'introduction */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

.stats-container {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    gap: 15px;
    z-index: 3;
}

.stat-card {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 10px;
    width: 200px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.stat-card h3 {
    font-size: 1.1rem;
    margin-bottom: 5px;
}

.stat-card p {
    font-size: 1.5rem;
    font-weight: bold;
}

/* Section des écoles */
.ecoles-section {
    padding: 80px 20px;
    padding-top: 30px;
    background-color: #f9f9f9;
    font-family: "Roboto", sans-serif;
}

.section-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 40px;
}

.ecoles-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    padding: 10px;
}

.ecole-card {
    position: relative;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.ecole-image-wrapper {
    width: 100%;
    height: 250px;
    overflow: hidden;
    position: relative;
}

/* Tag de type positionné en haut à gauche de l'image */
.type-tag {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 3;
}

/* Les styles communs pour les tags */
.tag {
    display: inline-flex;
    align-items: center;
    background-color: #ebf6ff;
    color: #333;
    border-radius: 6px;
    padding: 8px 12px;
    margin: 5px;
    margin-left: 0;
    font-size: 0.9rem;
}

.ecole-image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
}

.ecole-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ecole-image-info {
    position: absolute;
    bottom: 10px;
    left: 15px;
    color: white;
    z-index: 2;
}

.ecole-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: -10px;
}

.ecole-location {
    font-size: 1rem;
}

.ecole-info {
    padding: 15px;
    background-color: #fff;
    color: #333;
}

.ecole-description {
    color: #444;
    line-height: 1.6;
    margin-bottom: 15px;
}

.ecole-parcours {
    margin-bottom: 20px;
}

.icon-tag {
    width: 20px;
    margin-right: 6px;
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
}
</style>