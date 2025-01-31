<template>
    <section class="introduction">
        <div class="intro-container">
            <!-- Partie Texte -->
            <div class="intro-text">
                <h1>Bienvenue sur Learn<span style="color: #2f59f5;">Hack</span></h1>
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
                <img src="/images/IntroImage.jpg" alt="Cyber Security Team" class="main-image" />
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
.introduction {
    padding: 80px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
    max-width: 1300px;
    margin: 0 auto;
}


.intro-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 60px;
    width: 100%;
}


.intro-text {
    flex: 1;
    max-width: 600px;
}

.intro-text h1 {
    font-size: 2.8rem;
    color: #080e24;
    margin-bottom: 60px;
}

.intro-text h1 span {
    color: #0077ff;
}

.intro-text p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-top: 22px;
    text-align: justify;
    color: #333;
}

.intro-text p:first-of-type {
    margin-top: 0;
}



.intro-images {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.intro-images .main-image {
    width: 80%;
    margin-left: 40px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    opacity: 0.85;
    transition: opacity 0.15s ease-out;
    height: 450px;
    object-fit: cover;
}
</style>
