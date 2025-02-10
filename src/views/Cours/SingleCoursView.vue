<template>
    <Header />
    <div class="course-page">
        <!-- En-tête avec effet parallax -->
        <header class="course-header parallax" :style="{ backgroundImage: 'url(' + cours?.image + ')' }">
            <div class="header-overlay">
                <div class="header-content">
                    <h1 class="header-title">{{ cours?.title }}</h1>
                    <p class="header-description">{{ cours?.description }}</p>
                </div>
            </div>
        </header>

        <!-- Contenu détaillé du cours avec transitions -->
        <main v-if="cours && cours.content" class="course-content">
            <transition-group name="fade-slide" tag="div">
                <section v-for="(section, index) in (cours.content as any).sections" :key="index"
                    class="course-section">
                    <!-- Image de section (base) -->
                    <div v-if="section.image" class="section-image">
                        <img :src="section.image" alt="Illustration de la section" />
                    </div>
                    <section class="section-card">
                        <h2 class="section-title">{{ section.title }}</h2>

                        <!-- Image 2 : affichée juste après le titre -->
                        <div v-if="section.image2" class="section-image2">
                            <img :src="section.image2" alt="Illustration secondaire de la section" />
                        </div>

                        <div class="section-body">
                            <!-- Paragraphes -->
                            <div v-if="section.paragraphs && section.paragraphs.length" class="section-paragraphs">
                                <p v-for="(para, idx) in section.paragraphs" :key="idx">
                                    {{ para }}
                                </p>
                            </div>
                            <!-- Intégration de la vidéo si présente -->
                            <div v-if="section.video" class="section-video">
                                <iframe :src="section.video" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                            </div>
                            <!-- Définitions -->
                            <div v-if="section.definitions && section.definitions.length" class="section-definitions">
                                <h3>Définitions</h3>
                                <ul>
                                    <li v-for="(def, idx) in section.definitions" :key="idx">
                                        <strong>{{ def.term }} :</strong> {{ def.definition }}
                                    </li>
                                </ul>
                            </div>
                            <!-- Exemples -->
                            <div v-if="section.examples && section.examples.length" class="section-exemples">
                                <h3>Exemples</h3>
                                <ul>
                                    <li v-for="(example, idx) in section.examples" :key="idx">
                                        {{ example }}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Image 3 : affichée à la fin de la section -->
                        <div v-if="section.image3" class="section-image3">
                            <img :src="section.image3" alt="Illustration tertiaire de la section" />
                        </div>
                    </section>
                </section>
            </transition-group>

            <!-- Bouton pour accéder au quiz si celui-ci est trouvé dans la table quizz -->
            <div class="quiz-button-container" v-if="quizId">
                <router-link :to="`/quizz/${quizId}`" class="quiz-button">
                    Faire le quizz
                </router-link>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "@/supabase.ts";
import Header from "@/components/Header.vue";
import type { Cours } from "@/types"; // Votre type doit inclure : slug, title, description, image, content, etc.

const route = useRoute();
const cours = ref<Cours | null>(null);
const quizId = ref<number | null>(null);

const fetchCourse = async () => {
    const { data, error } = await supabase
        .from("cours")
        .select("*")
        .eq("slug", route.params.slug) // Récupère le cours par son slug
        .single();

    if (error) {
        console.error("Erreur lors de la récupération du cours :", error);
        return;
    }
    if (!data) {
        console.error("Aucun cours trouvé pour ce slug.");
        return;
    }
    // La colonne content (de type JSON) est automatiquement parsée
    cours.value = data as Cours;
};

const fetchQuizForCourse = async () => {
    if (!cours.value?.id) return;
    const { data, error } = await supabase
        .from("quizz")
        .select("id")
        .eq("cours", cours.value.id)
        .single(); // On attend un seul quiz
    if (error) {
        console.error("Erreur lors de la récupération du quiz pour ce cours :", error);
    } else if (data) {
        quizId.value = data.id;
    }
};

// Lorsqu'un cours est chargé, on récupère le quiz associé
watch(cours, (newCourse) => {
    if (newCourse && newCourse.id) {
        fetchQuizForCourse();
    }
});

onMounted(() => {
    fetchCourse();
});
</script>

<style scoped>
/* Style général */
.course-page {
    background-color: #f5f7fa;
    color: #333;
    overflow-x: hidden;
}

/* En-tête parallax */
.course-header {
    position: relative;
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

.header-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-content {
    text-align: center;
    padding: 20px;
    animation: fadeIn 2s ease-out;
}

.header-title {
    font-size: 3rem;
    color: #fff;
    margin: 0;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
}

.header-description {
    font-size: 1.3rem;
    color: #ddd;
    width: 80%;
    margin: 40px auto;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* Contenu du cours */
.course-content {
    max-width: 1300px;
    margin: 60px auto;
    padding: 0 20px;
    width: 90%;
}

/* Sections de cours */
.course-section {
    background: #fff;
    margin-bottom: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(30px);
    animation: slideIn 1s forwards;
}

.section-card {
    padding: 30px 40px;
}

.course-section:nth-child(odd) {
    background: #ebf6ff;
}

.section-title {
    font-size: 2rem;
    margin-bottom: 10px;
    margin-top: 0;
    color: #1c2538;
    border-bottom: 2px solid #1c2538;
    padding-bottom: 10px;
}

/* Image de section de base */
.section-image {
    margin-top: 25px;
    text-align: center;
}

.section-image img {
    height: 200px;
    width: 100%;
    object-fit: cover;
}

/* Image 2 : après le titre */
.section-image2 {
    margin: 20px auto;
    text-align: center;
}

.section-image2 img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Corps de la section */
.section-body {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #444;
}

.section-paragraphs p {
    margin-bottom: 20px;
    font-size: 16px;
}

.section-definitions,
.section-exemples {
    margin-top: 30px;
}

.section-definitions h3,
.section-exemples h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #1c2538;
    font-family: 'Orbitron', serif;
}

.section-definitions li,
.section-exemples li {
    margin-bottom: 10px;
}

/* Section vidéo */
.section-video {
    margin: 20px auto;
    text-align: center;
}

.section-video iframe {
    width: 100%;
    height: 450px;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Image 3 : à la fin de la section */
.section-image3 {
    margin-top: 25px;
    text-align: center;
}

.section-image3 img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Bouton de quiz */
.quiz-button-container {
    text-align: center;
    margin: 40px 0;
}

.quiz-button {
    display: inline-block;
    background: #2f59f5;
    font-family: 'Orbitron', serif;
    color: #fff;
    padding: 15px 30px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 1.2rem;
    transition: background 0.3s ease;
}

.quiz-button:hover {
    background: #1a3ac0;
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Transition Group : fade-slide */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.6s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>