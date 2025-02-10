<script setup>
import Header from '@/components/Header.vue';

// Liste des fonctionnalités
const features = [
    { id: 1, number: "01", title: "Cours interactifs", description: "Apprends les bases et perfectionne-toi avec des cours en ligne dédiés à la cybersécurité." },
    { id: 2, number: "02", title: "Ressources externes", description: "Accède aux meilleures vidéos, articles et tutoriels pour approfondir tes compétences." },
    { id: 3, number: "03", title: "Quizz & Challenges", description: "Mets tes connaissances à l’épreuve avec des quizz interactifs et des challenges de cybersécurité." },
    { id: 4, number: "04", title: "Métiers de la cyber", description: "Explore les carrières possibles et trouve le métier qui te correspond dans le domaine de la cyber." },
    { id: 5, number: "05", title: "Écoles & Formations", description: "Retrouve les meilleures écoles et formations pour entrer dans le monde de la cybersécurité." },
    { id: 6, number: "06", title: "Événements & Hackathons", description: "Reste informé sur tous les événements à venir en 2025 et participe aux hackathons les plus réputés." }
];
</script>

<template>
    <Header />

    <section class="about-container">
        <!-- Bloc gauche : Présentation du site -->
        <div class="about-text">
            <h1 class="about-title">À Propos de Cyber <span style="color: #2f59f5;">Hub</span></h1>
            <p class="about-description">
                La cybersécurité est un domaine en constante évolution, où les experts sont de plus en plus recherchés.
                Notre objectif ? Offrir un espace unique pour apprendre, s'informer et s'orienter vers une carrière
                en cybersécurité. 🚀
            </p>
            <p class="about-highlight">
                Que tu sois débutant ou expert, nous avons rassemblé **les meilleures ressources, écoles et opportunités
                professionnelles pour t'accompagner.
            </p>
            <RouterLink to="/" class="about-link">
                <button class="about-button">Accueil</button>
            </RouterLink>
        </div>

        <!-- Bloc droit : Image -->
        <div class="about-image">
            <img src="/images/AboutImage.jpg" alt="Expert en cybersécurité" />
        </div>
    </section>

    <!-- Section des fonctionnalités en 2 lignes de 3 cards -->
    <section class="features-section">
        <div class="features-container">
            <div v-for="(feature, index) in features" :key="feature.id" class="feature-card"
                :class="{ 'blue-background': index % 2 !== 0 }">
                <h2 class="feature-number" :class="{ 'blue-text': index % 2 === 0, 'white-text': index % 2 !== 0 }">
                    {{ feature.number }}
                </h2>
                <h3 class="feature-title" :class="{ 'blue-text': index % 2 === 0, 'white-text': index % 2 !== 0 }">
                    {{ feature.title }}
                </h3>
                <p class="feature-description">{{ feature.description }}</p>
            </div>
        </div>
    </section>
</template>

---

<style scoped>
/* === Conteneur général === */
.about-container {
    display: flex;
    max-width: 90%;
    margin: auto;
    padding: 50px 20px;
    gap: 80px;
    align-items: center;
}

/* === Bloc gauche : Texte === */
.about-text {
    flex: 1;
    max-width: 600px;
}

.about-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #080e24;
    margin-bottom: 15px;
}

.about-description {
    font-size: 1rem;
    color: #333;
    line-height: 1.8;
    margin-bottom: 20px;
}

.about-highlight {
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.8;
    color: black;
    margin-bottom: 20px;
}

/* === Bouton d’action === */
.about-button {
    background: #080e24;
    color: white;
    padding: 12px 20px;
    font-family: 'Orbitron', sans-serif;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: 0.3s;
}



/* === Bloc droit : Image === */
.about-image {
    flex: 1;
}

.about-image img {
    width: 90%;
}

/* === Section des fonctionnalités === */
.features-section {
    max-width: 1200px;
    margin: auto;
    padding: 50px 20px;
    margin-bottom: 100px;
    margin-top: 50px;
}

.features-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 80px;
}

/* === Cartes des fonctionnalités === */
.feature-card {
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.3s ease-in-out;
    background: white;
}

/* === Alternance des couleurs pour les cartes === */
.blue-background {
    background: #080e24;
}

/* === Numéros === */
.feature-number {
    font-size: 2rem;
    font-weight: bold;
}

/* === Titres === */
.feature-title {
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
}

/* === Textes en bleu/blanc selon le fond === */
.blue-text {
    color: #080e24;
}

.white-text {
    color: white;
}

/* === Description du texte === */
.feature-description {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
}

/* === Responsive === */
@media (max-width: 900px) {
    .about-container {
        flex-direction: column;
        text-align: center;
    }

    .about-text {
        max-width: 100%;
    }

    .features-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    .features-container {
        grid-template-columns: 1fr;
    }
}
</style>
