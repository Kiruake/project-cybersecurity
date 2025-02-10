<template>
    <section class="introduction">
        <div class="intro-container">
            <!-- Partie Texte -->
            <div class="intro-text">
                <h1>Bienvenue sur Cyber<span class="highlight">Hub</span></h1>
                <p>
                    Tu t'intéresses à la cybersécurité mais tu ne sais pas par où commencer ?
                    Ce site est fait pour toi. Découvre des cours, des exercices, des concepts
                    essentiels et des conseils pour t’orienter vers la bonne école.
                </p>
                <p>
                    Si tu veux en savoir plus sur les bases de la cybersécurité ou explorer des
                    métiers qui t'intéressent, tu es au bon endroit. Ensemble, on prépare
                    ton avenir dans un domaine en plein essor !
                </p>
            </div>

            <!-- Partie Image principale -->
            <div class="intro-images">
                <img src="/images/SectionIntroImage.jpg" alt="Cyber Security Team" class="main-image" />
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
/* === Conteneur général === */
.introduction {
    padding: 80px 20px 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
    max-width: 1300px;
    margin: 0 auto;
}

/* === Conteneur principal === */
.intro-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 60px;
    width: 100%;
}

/* === Partie Texte === */
.intro-text {
    flex: 1;
    max-width: 600px;
}

.intro-text h1 {
    font-size: 2.8rem;
    color: #080e24;
    margin-bottom: 40px;
}

.highlight {
    color: #2f59f5;
}

.intro-text p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-top: 22px;
    text-align: justify;
    color: #333;
}

/* === Partie Image === */
.intro-images {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.intro-images .main-image {
    width: 80%;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    opacity: 0.85;
    transition: opacity 0.15s ease-out;
    height: 450px;
    object-fit: cover;
}

/* === Responsive Design === */
@media (max-width: 1024px) {
    .intro-container {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .intro-text {
        max-width: 90%;
        text-align: start;
    }

    .intro-text h1 {
        font-size: 2.5rem;
    }

    .intro-text p {
        font-size: 1rem;
    }

    .intro-images .main-image {
        width: 90%;
        height: 400px;
    }
}

@media (max-width: 768px) {

    .introduction {
        padding: 40px 20px 0px 20px;
    }


    .intro-text h1 {
        font-size: 2.2rem;
    }

    .intro-text p {
        font-size: 0.95rem;
    }

    .intro-images .main-image {
        width: 100%;
        height: 350px;
    }
}

@media (max-width: 480px) {
    .intro-text h1 {
        font-size: 2rem;
    }

    .intro-container {
        gap:30px;
    }

    .intro-text p {
        font-size: 0.9rem;
    }

    .intro-images .main-image {
        width: 90%;
        height: 300px;
    }
}
</style>
