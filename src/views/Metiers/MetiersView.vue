<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import { CurrencyEuroIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/vue/24/solid';

const metiers = ref([]);
const router = useRouter();

// Récupérer les métiers depuis Supabase
const fetchMetiers = async () => {
    const { data, error } = await supabase
        .from('metiers')
        .select('*');

    if (error) {
        console.error("Erreur de récupération des métiers :", error);
    } else {
        metiers.value = data;
    }
};

// Rediriger vers la fiche du métier
const goToMetier = (id) => {
    router.push(`/metiers/${id}`);
};

onMounted(fetchMetiers);
</script>

<template>
    <Header />

    <!-- Parallax d’introduction -->
    <section class="introduction">
        <div class="parallax">
            <div class="intro-content">
                <h1 class="fadeInAnimation">Les métiers de la cybersécurité</h1>
                <p class="fadeInAnimation delay">
                    Hackers éthiques, experts en sécurité, analystes SOC... La cyber te tend les bras !
                    Voici les jobs qui recrutent (et qui payent bien 💸). À toi de choisir le tien ! 🚀
                </p>
            </div>
        </div>
    </section>

    <!-- Grid des métiers -->
    <section class="metiers-section">
        <div class="metiers-container">
            <div v-for="metier in metiers" :key="metier.id" class="metier-card">
                <div class="metier-image-wrapper">
                    <!-- Overlay -->
                    <div class="metier-image-overlay"></div>
                    <img :src="metier.image" class="metier-image" />

                    <!-- Nom du métier -->
                    <div class="metier-image-info">
                        <h3 class="metier-title">{{ metier.name }}</h3>
                    </div>
                </div>

                <div class="metier-info">
                    <p class="metier-description">{{ metier.description }}</p>

                    <div class="metier-details">
                        <span class="tag">
                            <CurrencyEuroIcon class="icon-tag" />
                            {{ metier.salaire }}k /an
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
.introduction {
    position: relative;
    height: 500px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-size: cover;
}

.parallax {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/metiers/background-metiers.jpg') no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
}

.parallax::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.intro-content {
    text-align: center;
    z-index: 2;
    position: relative;
}

.intro-content h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #f5fcff;
    width: 80%;
    margin: auto;
}

.intro-content p {
    font-size: 1rem;
    margin: 40px auto;
    line-height: 1.8;
    width: 80%;
}

/* ========== Section des Métiers ========== */
.metiers-section {
    padding: 80px 20px;
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
    cursor: pointer;
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
    background-color: #080e24;
    width: 100%;
    color: #f5fcff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.button-metier:hover {
    background-color: #1c44b5;
    transform: translateY(-5px);
}

/* ========== Responsive ========== */
@media (max-width: 768px) {
    .metiers-container {
        grid-template-columns: 1fr;
    }

    .intro-content h1 {
        font-size: 2rem;
    }

    .intro-content p {
        font-size: 0.9rem;
    }
}
</style>
