<template>
    <Header />

    <!-- Introduction avec Parallax et Animation de Texte -->
    <section class="introduction">
        <!-- On lie dynamiquement le style de la div parallax -->
        <div class="parallax" :style="{ backgroundImage: `url('${backgroundImage}')` }">
            <div class="intro-content"
                style="display: flex; align-items: center; justify-content: center; height: 100%;">
                <div class="intro-title" style="text-align: center; z-index: 1000;">
                    <h1 class="fadeInAnimation">
                        {{ `Les écoles proposant ${diplomeId === '2' ? 'une' : 'un'} ${diplomaName} en lien avec la
                        cybersécurité` }}
                    </h1>
                    <p class="fadeInAnimation delay">
                        Découvrez une sélection d'écoles en cybersécurité et plus encore, prêtes à vous former pour
                        l'avenir numérique.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="ecoles-section" class="ecoles-section">
        <div class="ecoles-container">
            <div v-for="(ecole, index) in ecolesList" :key="index" class="ecole-card">
                <div class="ecole-image-wrapper">
                    <!-- Tag indiquant le type de l'école positionné en haut à gauche -->
                    <div class="type-tag tag">
                        {{ ecole.type }}
                    </div>
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
                            BAC{{ ecole.diplome_requis ? ' +' + ecole.diplome_requis : '' }}
                        </span>
                    </div>

                    <router-link :to="`/ecole/${ecole.id}`" class="button">Voir les détails</router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../../supabase";
import type { Ecole } from "../../types";
import Header from "../../components/Header.vue";

const ecolesList = ref<Ecole[]>([]);
const route = useRoute();
const diplomeId = route.params.diplomeId; // Récupérer l'id du diplôme depuis l'URL
const diplomaName = ref<string | null>(null);
const stats = ref<any[]>([]);

// Propriété calculée pour définir l'image de fond en fonction de l'id du diplôme
const backgroundImage = computed(() => {
    // Exemple : adapter ces cas selon vos IDs et chemins d'images
    switch (diplomeId) {
        case "1":
            return "/ecoles/ImageEcoles3.jpg";
        case "2":
            return "/ecoles/ImageEcoles2.jpg";
        case "3":
            return "/ecoles/ImageEcoles.jpg";
        default:
            return "/ecoles/ImageEcoles.jpg"; // Image par défaut
    }
});

// Fonction pour récupérer les données du diplôme, des écoles et des statistiques
const fetchDiplomaAndSchoolsAndStats = async () => {
    // Récupérer les détails du diplôme
    const { data: diplomaData, error: diplomaError } = await supabase
        .from("diplomes")
        .select("title, stats")
        .eq("id", diplomeId)
        .single();

    if (diplomaError) {
        console.error("Erreur lors de la récupération du diplôme:", diplomaError);
    } else {
        diplomaName.value = diplomaData?.title || "Inconnu";
        stats.value = diplomaData?.stats || [];
    }

    // Récupérer les écoles liées au diplôme
    const { data: schoolsData, error: schoolsError } = await supabase
        .from("ecoles")
        .select("*")
        .eq("diplome_id", diplomeId);

    if (schoolsError) {
        console.error("Erreur lors de la récupération des écoles:", schoolsError);
    } else {
        ecolesList.value = schoolsData as Ecole[];
    }
};

onMounted(() => {
    fetchDiplomaAndSchoolsAndStats();
});
</script>

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
    z-index: 1;
}

/* Texte central de l'introduction */
.intro-content {
    text-align: center;
    z-index: 2;
    font-family: 'Roboto', sans-serif;
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
    font-size: 1.3rem;
    margin: 40px auto;
    width: 70%;
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
    cursor: pointer;
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
</style>