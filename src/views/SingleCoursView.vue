<template>
    <div class="course-page">
        <div class="course-header">
            <img :src="course.image" alt="Course Icon" class="course-icon" />
            <h1>{{ course.title }}</h1>
            <p>{{ course.description }}</p>
        </div>

        <div class="course-content">
            <p>Contenu détaillé du cours...</p>
            <button @click="startCourse">Démarrer le cours</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Données des cours
const courses = [
    {
        slug: 'cybersecurite',
        title: "Introduction à la Cybersécurité",
        description: "Un cours essentiel pour débuter dans le domaine de la cybersécurité.",
        image: "/icons/Cloud_Security.svg",
    },
    {
        slug: 'securisation-reseaux',
        title: "Sécurisation des Réseaux",
        description: "Apprenez à protéger un réseau informatique contre les attaques.",
        image: "/icons/Cluster.svg",
    },
    {
        slug: 'cryptographie',
        title: "Cryptographie des Données",
        description: "Explorez les techniques de cryptage pour sécuriser les données.",
        image: "/icons/Private_Key.svg",
    },
    {
        slug: 'hacking-ethique',
        title: "Hacking Éthique",
        description: "Devenez un hacker éthique et apprenez à tester les systèmes.",
        image: "/icons/Service_Mesh.svg",
    },
    {
        slug: 'gestion-risques',
        title: "Gestion des Risques",
        description: "Apprenez à évaluer et gérer les risques en cybersécurité.",
        image: "/icons/Treat_Actor.svg",
    },
    {
        slug: 'securite-web',
        title: "Sécurité des Applications Web",
        description: "Protégez les applications web contre les attaques.",
        image: "/icons/VM.svg",
    }
];

// Récupérer le paramètre dynamique de la route
const route = useRoute();
const course = ref({});

// Rechercher le cours en fonction du slug
onMounted(() => {
    const courseSlug = route.params.slug;
    course.value = courses.find(course => course.slug === courseSlug);
});

// Fonction pour démarrer le cours
const startCourse = () => {
    alert(`Vous avez démarré le cours : ${course.value.title}`);
};
</script>

<style scoped>
.course-page {
    padding: 20px;
    background-color: #f5f5f5;
}

.course-header {
    text-align: center;
}

.course-icon {
    width: 80px;
    margin-bottom: 20px;
}

h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 20px;
}

button {
    background-color: #080e24;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background-color: #1c2538;
}
</style>