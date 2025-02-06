<script setup lang="ts">
import CardsCours from '@/components/CardsCours.vue';
import CardsParcours from '@/components/CardsParcours.vue';
import SectionIntroduction from '@/components/SectionIntroduction.vue';
import Header from "../components/Header.vue";
</script>

<template>
  <main>
    <Header />
    <section class="hero-section">
      <!-- Vidéo en fond -->
      <video class="hero-video" autoplay muted loop playsinline>
        <source src="/videos/video-homepage2.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      <!-- Contenu de la section héro -->
      <div class="hero-content">
        <div class="hero-left">
          <h1 class="TitreAccueil">
            Cyber<span style="color: #2f59f5;">Hub</span>
          </h1>
          <h2 class="Slogan">Ta porte d'entrée dans le monde de la cybersécurité</h2>
          <div class="ButtonGroup">
            <button class="Button ButtonPrimary">Commencer</button>
            <button class="Button ButtonOutline">En savoir plus</button>
          </div>
        </div>
        <div class="hero-right">
        </div>
      </div>
    </section>

    <SectionIntroduction />

    <h1 class="cards-title">404 : Avenir non trouvé ? Voici les écoles pour y remédier</h1>
    <CardsParcours />

    <h1 class="cards-title">Nos ressources pour hackers en herbe et futurs experts</h1>
    <CardsCours />

    <Offres />
  </main>
</template>

<style scoped>
/* Réinitialisation globale */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Section héro */
.hero-section {
  position: relative;
  height: 600px;
  overflow: hidden;
}

/* Vidéo en fond */
.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  opacity: 0.85;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 1;
  object-fit: cover;
}

/* Contenu de la section héro, positionné par-dessus la vidéo */
.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 40px 0 60px;
}

/* Partie gauche du héros */
.hero-left {
  max-width: 60%;
  color: #f5fcff;
}

.TitreAccueil {
  font-size: 80px;
  font-weight: bold;
  color: #f5fcff;
}

.Slogan {
  font-size: 30px;
  margin-top: 20px;
  color: #f5fcff;
}

.ButtonGroup {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.Button {
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: all 0.3s ease;
}

.ButtonPrimary {
  background-color: #2f59f5;
  color: #f5fcff;
}

.ButtonPrimary:hover {
  background-color: #2148d4;
}

.ButtonOutline {
  background-color: transparent;
  color: #f5fcff;
  border: 2px solid #f5fcff;
}

.ButtonOutline:hover {
  background-color: #f5fcff;
  color: #000;
}

/* Partie droite du héros */
.hero-right {
  max-width: 40%;
}

.hero-image {
  width: 90%;
  height: auto;
  object-fit: contain;
}

/* Titres des cartes */
.cards-title {
  font-weight: bold;
  margin-bottom: 0px;
  margin-top: 80px;
  font-family: "Orbitron", serif;
  padding-left: 75px;
}
</style>
