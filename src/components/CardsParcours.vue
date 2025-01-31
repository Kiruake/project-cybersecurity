<template>
    <main class="cards-container">
        <div class="card" v-for="(parcours, index) in parcoursList" :key="index">
            <img :src="parcours.image" :alt="parcours.title" />
            <div class="card-content">
                <h2>{{ parcours.title }}</h2>
                <p>{{ parcours.description }}</p>
                <button @click="goTo(parcours.link)" class="button">
                    En savoir plus
                </button>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
// Liste des parcours
const parcoursList = [
    {
        title: "BUT / BTS",
        description:
            "Découvre les écoles proposant des formations professionnalisantes pour te plonger dans les bases de la cybersécurité et des réseaux.",
        image: "/images/Parcours1.jpg",
        link: "https://example.com/but-bts",
    },
    {
        title: "Licence",
        description:
            "Explore les universités et écoles proposant des licences en cybersécurité, mêlant théorie et pratique pour bâtir tes connaissances.",
        image: "/images/Parcours2.jpg",
        link: "https://example.com/licence",
    },
    {
        title: "Master",
        description:
            "Accède aux écoles spécialisées pour des masters avancés en cybersécurité, conçus pour devenir expert et leader dans le domaine.",
        image: "/images/Parcours3.jpg",
        link: "https://example.com/master",
    },
];

// Fonction pour rediriger vers le lien
const goTo = (link: string) => {
    window.open(link, "_blank");
};
</script>

<style scoped>
/* Conteneur principal */
.cards-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    padding: 80px 60px;
    padding-bottom: 0px;
}

/* Styles des cartes */
.card {
    width: 24rem;
    height: 32rem;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    color: rgb(240, 240, 240);
    box-shadow: 0 8px 25px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.85;
        transition: opacity 0.15s ease-out;
    }

    h2 {
        position: absolute;
        inset: auto auto 30px 30px;
        margin: 0;
        color: #f5fcff;
        transition: inset 0.2s 0.2s ease-out;
        font-family: "Orbitron", serif;
        font-weight: normal;
        text-transform: uppercase;
    }

    p {
        position: absolute;
        color: #f5fcff;
        opacity: 0;
        max-width: 80%;
        inset: auto auto 80px 30px;
        transition: opacity 0.2s ease-out;
    }

    button {
        position: absolute;
        inset: auto auto 40px 30px;
        opacity: 0;
        background-color: #080e24;
        color: #f5fcff;
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 14px;
        cursor: pointer;
        transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

        span {
            font-size: 1.2rem;
        }
    }

    button:hover {
        background-color: #0056b3;
        transform: scale(1.05);
    }

    &:hover h2 {
        inset: auto auto 220px 30px;
        transition: inset 0.2s ease-out;
    }

    &:hover p,
    &:hover button {
        opacity: 1;
        transition: opacity 0.3s 0.1s ease-in;
    }

    &:hover img {
        transition: opacity 0.2s ease-in;
        opacity: 1;
    }
}
</style>