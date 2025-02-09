<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase';
import Header from '@/components/Header.vue';
import { CalendarIcon, MapPinIcon, ClipboardIcon } from '@heroicons/vue/24/solid';

const events = ref([]);

const fetchEvents = async () => {
    const { data, error } = await supabase
        .from('events') // Remplace par le vrai nom de ta table
        .select('*')
        .order('date_debut', { ascending: true });

    if (error) {
        console.error('Erreur de récupération:', error);
    } else {
        events.value = data;
    }
};

onMounted(fetchEvents);
</script>

<template>

    <Header />

    <section class="introduction-event">
        <!-- On lie dynamiquement le style de la div parallax -->
        <div class="parallax">
            <div class="intro-content"
                style="display: flex; align-items: center; justify-content: center; height: 100%;">
                <div class="intro-title" style="text-align: center; z-index: 1000;">
                    <h1 class="fadeInAnimation">
                        Événements Cyber 2025 en France – Parce qu'on adore les hackers (gentils)
                    </h1>
                    <p class="fadeInAnimation delay">
                        Tu veux devenir le prochain expert en cybersécurité ou juste impressionner tes potes avec des
                        termes compliqués ? Ces événements sont faits pour toi ! 🚀
                        Conférences, workshops, networking (et peut-être quelques goodies sympas 🍕), viens découvrir
                        les tendances, les
                        menaces du futur et comment ne pas finir dans un phishing douteux.
                        Bref, si le cyber t'intèresse, c’est *the place to be* en 2025 ! 🔥
                    </p>

                </div>
            </div>
        </div>
    </section>

    <div class="container">
        <h1 class="events-subtitle">📅 Événements prévu pour 2025</h1>

        <div class="events-list">
            <div v-for="event in events" :key="event.id" class="event-card">
                <div class="event-image-container">
                    <img v-if="event.image" :src="event.image" alt="Image de l'événement" class="event-image">
                    <span class="event-type">{{ event.type }}</span>
                </div>

                <div class="event-content">
                    <h2 class="event-title">{{ event.name }}</h2>

                    <div class="event-info">
                        <MapPinIcon class="icon" />
                        <span>{{ event.ville }}, {{ event.adresse }}</span>
                    </div>

                    <div class="event-info">
                        <CalendarIcon class="icon" />
                        <span>Du {{ new Date(event.date_debut).toLocaleDateString('fr-FR') }} au {{ new
                            Date(event.date_fin).toLocaleDateString('fr-FR') }}</span>
                    </div>

                    <p class="event-description">{{ event.description }}</p>

                    <!-- Bouton "En savoir plus" -->
                    <a :href="event.link" target="_blank" class="event-button">
                        En savoir plus
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.introduction-event {
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
    background-image: url("/images/ImageEvents.jpg");
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

/* Container principal */
.container {
    max-width: 90%;
    margin: 0 auto;
    padding: 40px 20px;
}

/* Titre principal */
.event-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #080e24;
}

.events-subtitle {
    margin-bottom: 3rem;
}

/* Liste des événements (une seule card par ligne) */
.events-list {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

/* Card de l'événement */
.event-card {
    display: flex;
    background: #fff;
    border-radius: 12px;
    max-height: 350px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    max-width: 100%;
}

.event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

/* Conteneur de l'image (pour positionner le type de l'événement) */
.event-image-container {
    position: relative;
    width: 40%;
}

/* Image */
.event-image {
    width: 100%;
    height: 100%;
}

/* Type de l'événement en tag */
.event-type {
    position: absolute;
    top: 20px;
    left: 10px;
    font-family: 'Orbitron', sans-serif;
    background: #080e24;
    color: white;
    padding: 6px 12px;
    font-size: 0.9rem;
    border-radius: 12px;
    text-transform: uppercase;
}

/* Contenu */
.event-content {
    width: 60%;
    padding: 10px 20px 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Nom de l'événement */
h2 {
    font-size: 1.8rem;
    color: #222;
    margin-bottom: 15px;
}

/* Informations */
.event-info {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: #080e24;
    margin-bottom: 8px;
    font-family: monospace;
}

/* Icônes */
.icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: #080e24;
}

/* Description */
.event-description {
    font-size: 13px;
    color: #444;
    line-height: 1.6;
    margin-top: 15px;
}

/* Bouton "En savoir plus" */
.event-button {
    display: inline-block;
    background: none;
    color: #080e24;
    border: #080e24 1px solid;
    padding: 10px 15px;
    font-size: 1rem;
    font-family: 'Orbitron', sans-serif;
    text-align: center;
    border-radius: 8px;
    margin-top: 15px;
    margin-bottom: 15px;
    text-decoration: none;
    transition: background 0.3s ease, transform 0.2s ease;
    width: fit-content;
}

.event-button:hover {
    background: #080e24;
    transform: scale(1.05);
    color: white;
}

/* Responsive pour mobiles */
@media (max-width: 768px) {
    .event-card {
        flex-direction: column;
    }

    .event-image-container {
        width: 100%;
    }

    .event-image {
        height: 200px;
    }

    .event-content {
        width: 100%;
        padding: 15px;
    }

    .event-type {
        top: 8px;
        left: 8px;
        font-size: 0.8rem;
        padding: 4px 10px;
    }
}
</style>
