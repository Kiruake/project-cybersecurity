<script setup>
import { useRouter } from 'vue-router';
import { CalendarIcon, ClipboardIcon, AcademicCapIcon } from '@heroicons/vue/24/solid';

const router = useRouter();

const cards = [
    {
        id: 1,
        title: "Événements en 2025",
        description: "Reste informé des prochains événements en cybersécurité et participe aux conférences, CTFs et meetups.",
        icon: "/icons/event.png",
        route: "/events"
    },
    {
        id: 2,
        title: "Perspectives de carrière",
        description: "Découvre les métiers de la cybersécurité et trouve celui qui te correspond pour une future carrière.",
        icon: "/icons/teamwork.png",
        route: "/metiers"
    },
    {
        id: 3,
        title: "Quiz - Teste ton niveau !",
        description: "Teste tes connaissances en cybersécurité avec nos quiz interactifs et améliore tes compétences.",
        icon: "/icons/quiz.png",
        route: "/quizz"
    },
];

const goToPage = (route) => {
    router.push(route);
};
</script>

<template>
    <div class="cards-container2">
        <div v-for="card in cards" :key="card.id" class="card2">
            <!-- Ligne en haut -->
            <div class="card-top-line"></div>

            <!-- Icône -->
            <img :src="card.icon" class="card-icon2" />

            <!-- Titre -->
            <h3 class="card-title2">{{ card.title }}</h3>

            <!-- Description -->
            <p class="card-description2">{{ card.description }}</p>

            <!-- Bouton -->
            <button class="card-button2" @click="goToPage(card.route)">Accéder à la section</button>
        </div>
    </div>
</template>

---

<style>
/* Conteneur des cartes */
.cards-container2 {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 80px;
    padding: 70px;
    padding-top: 0px;

}

/* Style des cartes */
.card2 {
    position: relative;
    width: 340px;
    background: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    padding: 20px;
    transition: 0.3s ease-in-out;
}

/* Ligne en haut de la carte */
.card-top-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: #080e24;
}

/* Icône */
.card-icon2 {
    width: 180px;
    height: 180px;
    margin: 20px auto;
}

/* Titre */
.card-title2 {
    font-size: 1.3rem;
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
    margin-top: 10px;
    color: #333;
}

/* Description */
.card-description2 {
    color: #666;
    margin-top: 15px;
    line-height: 1.6;
}

/* Bouton */
.card-button2 {
    background: none;
    color: #080e24;
    width: 100%;
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #080e24;
    font-family: 'Orbitron', sans-serif;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 20px;
    transition: 0.3s ease-in-out;
}

/* Effet au hover */
.card2:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.card-button2:hover {
    background: #080e24;
    color: white;
    border: none;
}

/* Responsive */
/* 📱 Tablette (768px - 1023px) */
@media (max-width: 1023px) {
    .cards-container2 {
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding-bottom: 0px;
    }

    .card2 {
        width: 300px;
        padding: 15px;
    }

    .card-icon2 {
        width: 150px;
        height: 150px;
    }

    .card-title2 {
        font-size: 1.2rem;
    }

    .card-description2 {
        font-size: 0.9rem;
    }

    .card-button2 {
        font-size: 0.9rem;
        padding: 8px 12px;
    }
}

/* 📱 Mobile (≤768px) */
@media (max-width: 768px) {
    .cards-container2 {
        flex-direction: column;
        align-items: center;
        gap: 54px;
        padding-bottom: 0px;
    }

    .card2 {
        width: 100%;
        max-width: 320px;
        padding: 20px;
    }

    .card-icon2 {
        width: 140px;
        height: 140px;
    }

    .card-title2 {
        font-size: 1.1rem;
    }

    .card-description2 {
        font-size: 0.9rem;
        line-height: 1.4;
    }

    .card-button2 {
        font-size: 0.9rem;
        padding: 7px 10px;
    }
}

/* 📱 Petit Mobile (≤480px) */
@media (max-width: 480px) {
    .card2 {
        width: 90%;
        max-width: 300px;
        padding: 15px;
    }

    .card-icon2 {
        width: 120px;
        height: 120px;
    }

    .card-title2 {
        font-size: 1rem;
    }

    .card-description2 {
        font-size: 0.85rem;
    }

    .card-button2 {
        font-size: 0.85rem;
        padding: 6px 10px;
    }
}
</style>