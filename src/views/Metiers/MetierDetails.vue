<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '@/supabase';
import Header from '@/components/Header.vue';
import { ArrowLeftIcon, CurrencyDollarIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/vue/24/solid';

const route = useRoute();
const router = useRouter();
const metier = ref(null);

// Récupérer les détails du métier
const fetchMetier = async () => {
    const { data, error } = await supabase
        .from('metiers')
        .select('*')
        .eq('id', route.params.id)
        .single();

    if (error) {
        console.error("Erreur de récupération :", error);
    } else {
        metier.value = data;
    }
};

// Retour à la liste
const goBack = () => {
    router.push('/metiers');
};

onMounted(fetchMetier);
</script>

<template>
    <Header />
    <div v-if="metier" class="metier-container">
        <!-- Image en Parallaxe avec le titre du métier -->
        <div class="metier-banner">
            <div class="parallax-metier" :style="{ backgroundImage: `url('${metier.image}')` }"></div>
            <h1 class="metier-title">{{ metier.name }}</h1>
            <!-- Bouton Retour en haut à gauche -->
            <button class="back-button" @click="goBack">
                <ArrowLeftIcon class="icon-back" /> Retour
            </button>
        </div>

        <div class="metier-content">
            <!-- Informations principales -->
            <div class="metier-summary">
                <div class="info-card">
                    <CurrencyDollarIcon class="icon-info" />
                    <p><strong class="salaire">Salaire :</strong> {{ metier.salaire }}k€ / an</p>
                </div>
                <div class="info-card border-left">
                    <AcademicCapIcon class="icon-info" />
                    <p><strong class="niveau-etude">Niveau d'étude :</strong> {{ metier.niveau_etude }}</p>
                </div>
                <div class="info-card border-left">
                    <BriefcaseIcon class="icon-info" />
                    <p><strong class="type-metier">Type de métier :</strong> {{ metier.type ?? "Cybersécurité" }}</p>
                </div>
            </div>

            <!-- Missions principales -->
            <div class="metier-section">
                <h2 class="section-title">🚀 Missions principales</h2>
                <p class="mission-list">{{ metier.missions }}</p>
            </div>

            <!-- Compétences requises -->
            <div class="metier-section">
                <h2 class="section-title">🔧 Compétences requises</h2>
                <p class="competence-list">{{ metier.competences }}</p>
            </div>

            <!-- Lien vers la fiche ROM -->
            <div class="fiche-rome-container">
                <a :href="metier.fiche_rome" target="_blank" class="fiche-rome">Voir la fiche ROME</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.metier-container {
    overflow: hidden;
}

/* Image en bannière avec effet parallaxe */
.metier-banner {
    position: relative;
    height: 400px;
    overflow: hidden;
}

.parallax-metier {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-attachment: fixed;
    filter: brightness(0.5);
}

.metier-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2.8rem;
    font-weight: bold;
    text-align: center;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
}

/* Bouton Retour en haut à gauche */
.back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    background: #234ada;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 0.9rem;
    font-family: 'Orbitron', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: 0.3s;
}

.back-button:hover {
    background: rgba(0, 0, 0, 0.8);
}

.icon-back {
    width: 20px;
}

/* Contenu */
.metier-content {
    padding: 30px;
    color: #333;
}

/* Bloc Informations principales */
.metier-summary {
    display: flex;
    justify-content: space-around;
    background: #080e24;
    border-radius: 8px;
    font-size: 0.9rem;
    margin-bottom: 60px;
    text-align: left;
}

/* Séparation verticale entre chaque info-card */
.info-card {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    padding: 5px 20px;
}

/* Ajout d'une séparation verticale entre chaque élément */
.border-left {
    border-left: 2px solid rgba(255, 255, 255, 0.3);
}

/* Icônes */
.icon-info {
    width: 25px;
    height: 25px;
    color: #F4BB46;
}

/* Sections */
.section-title {
    font-size: 1.6rem;
    color: #080e24;
    margin-bottom: 30px;
    font-weight: bold;
}

.metier-section {
    margin-bottom: 20px;
    line-height: 1.6;
}

.type-metier,
.niveau-etude,
.salaire {
    color: white;
}

.mission-list,
.competence-list {
    font-size: 1rem;
    margin-bottom: 20px;
}

/* Bouton fiche ROM */
.fiche-rome-container {
    margin-top: 60px;
    margin-bottom: 40px;
}

.fiche-rome {
    display: inline-block;
    background: #234ada;
    color: white;
    font-family: 'Orbitron', sans-serif;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1rem;
    text-decoration: none;
    transition: 0.3s;
}

.fiche-rome:hover {
    background: #1d3a9b;
}

/* Responsive */
@media (max-width: 768px) {
    .metier-title {
        font-size: 2rem;
    }

    .metier-summary {
        flex-direction: column;
        text-align: left;
        align-items: center;
    }

    /* Suppression des bordures sur mobile */
    .border-left {
        border-left: none;
    }

    .info-card {
        width: 100%;
        justify-content: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        padding-bottom: 15px;
    }

    .back-button {
        top: 10px;
        left: 10px;
        font-size: 0.9rem;
        padding: 8px 12px;
    }
}
</style>
