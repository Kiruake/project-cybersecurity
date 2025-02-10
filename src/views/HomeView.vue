<script setup lang="ts">
import CardsCours from '@/components/CardsCours.vue';
import CardsParcours from '@/components/CardsParcours.vue';
import SectionIntroduction from '../components/SectionIntroduction.vue';
import OtherSectionsCards from '../components/OtherSectionsCards.vue';
import Header from "../components/Header.vue";
import ContactForm from "../components/ContactForm.vue";
</script>

<template>
  <main>
    <Header />
    <section class="hero-section">
      <!-- Vidéo en fond -->
      <video class="hero-video" autoplay muted loop playsinline>
        <source src="/videos/video-homepage2-2.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      <!-- Contenu de la section héros -->
      <div class="hero-content">
        <div class="hero-left">
          <h1 class="TitreAccueil">
            Cyber<span class="blue-text">Hub</span>
          </h1>
          <h2 class="Slogan">Ta porte d'entrée dans le monde de la cybersécurité</h2>
          <div class="ButtonGroup">
            <RouterLink :to="{ path: '/', hash: '#cards-contact' }">
              <button class="Button ButtonPrimary">Nous Contacter</button>
            </RouterLink>
            <RouterLink to="/about">
              <button class="Button ButtonOutline">En savoir plus</button>
            </RouterLink>
          </div>
        </div>
        <div class="hero-right">
        </div>
      </div>
    </section>

    <SectionIntroduction />

    <!-- Section Parcours -->
    <div id="cards-parcours">
      <h1 class="cards-title">404 : Avenir non trouvé ? Voici les écoles pour y remédier</h1>
      <CardsParcours />
    </div>

    <!-- Section Cours -->
    <div id="cards-cours">
      <h1 class="cards-title">Nos ressources pour hackers en herbe et futurs experts</h1>
      <CardsCours />
    </div>

    <h1 class="cards-title">En termes de contenus, tu ne risques pas de t'ennuyer ici..</h1>
    <OtherSectionsCards />

    <div id="cards-contact">
      <h1 class="cards-title">On sait que vous nous aimez bien, parlez-nous !</h1>
      <ContactForm />
    </div>
  </main>
</template>

<style scoped>
/* === Global Styles === */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* === Section Héro === */
.hero-section {
  position: relative;
  height: 600px;
  overflow: hidden;
}

/* === Vidéo en fond === */
.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: 90%;
  opacity: 0.85;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 1;
  object-fit: cover;
}

/* === Contenu de la section héro === */
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

/* === Partie gauche du héros === */
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

/* === Boutons === */
.ButtonGroup {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.Button {
  font-size: 14px;
  padding: 10px 20px;
  height: 40px;
  border-radius: 5px;
  font-family: 'Orbitron', serif;
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

/* === Partie droite du héros === */
.hero-right {
  max-width: 40%;
}

.hero-image {
  width: 90%;
  height: auto;
  object-fit: contain;
}

/* === Titres des sections === */
.cards-title {
  font-weight: bold;
  margin-bottom: 0px;
  margin-top: 80px;
  font-family: "Orbitron", serif;
  padding-left: 75px;
}

.blue-text {
  color: #2f59f5;
  ;
}

/* === Responsive Design === */
@media (max-width: 1024px) {
  .hero-section {
    height: 400px;
  }

  .hero-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  .hero-left {
    max-width: 100%;
  }

  .TitreAccueil {
    font-size: 60px;
  }

  .Slogan {
    font-size: 24px;
  }

  .ButtonGroup {
    align-items: center;
    justify-content: center;
  }

  .Button {
    width: 100%;
    max-width: 250px;
  }

  .cards-title {
    font-size: 1.8rem;
    width: 80%;
    margin-top: 60px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 450px;
  }

  .hero-content {
    padding: 10px;
  }

  .TitreAccueil {
    font-size: 50px;
  }

  .Slogan {
    font-size: 22px;
  }

  .Button {
    width: 100%;
    max-width: 200px;
  }

  .cards-title {
    font-size: 1.5rem;
    width: 90%;
    margin: 60px auto 0px;
    text-align: center;
    padding-left: 0px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 400px;
  }

  .TitreAccueil {
    font-size: 40px;
  }

  .Slogan {
    font-size: 18px;
  }

  .Button {
    font-size: 12px;
    padding: 8px 16px;
  }
}
</style>
