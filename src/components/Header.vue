<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};
</script>

<template>
    <header class="header">
        <div class="header__container">
            <!-- Logo -->
            <RouterLink to="/" class="header__logo-link" @click="closeMenu">
                <h1 class="header__logo">Learn<span class="highlight">Hack</span></h1>
            </RouterLink>

            <!-- Navigation Menu -->
            <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
                <ul class="header__list">
                    <li class="header__item">
                        <RouterLink to="/" class="header__link" @click="closeMenu">Accueil</RouterLink>
                    </li>
                    <li class="header__item">
                        <RouterLink to="/quizz" class="header__link" @click="closeMenu">Nos Mini-jeux</RouterLink>
                    </li>
                    <li class="header__item">
                        <RouterLink to="/challenge" class="header__link" @click="closeMenu">Hacker Challenge
                        </RouterLink>
                    </li>
                </ul>
            </nav>

            <!-- Menu Mobile - Bouton Hamburger -->
            <button class="header__toggle" aria-label="Toggle Menu" @click="toggleMenu">
                <span class="header__toggle-bar" :class="{ 'header__toggle-bar--active': isMenuOpen }"></span>
                <span class="header__toggle-bar" :class="{ 'header__toggle-bar--active': isMenuOpen }"></span>
                <span class="header__toggle-bar" :class="{ 'header__toggle-bar--active': isMenuOpen }"></span>
            </button>
        </div>
    </header>
</template>

<style lang="css">
/* Variables globales */
:root {
    --primary-color: #2f59f5;
    --secondary-color: #080e24;
    --text-light: #ffffff;
    --text-dark: #f5f5fa;
}

/* HEADER */
.header {
    background-color: var(--secondary-color);
    position: sticky;
    top: 0;
    width: 100%;
    height: 80px;
    z-index: 2000;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Conteneur du header */
.header__container {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

/* LOGO */
.header__logo-link {
    text-decoration: none;
}

.header__logo {
    font-size: 24px;
    font-weight: bold;
    color: var(--text-light);
}

.highlight {
    color: var(--primary-color);
}

/* NAVIGATION */
.header__nav {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(8, 14, 36, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
}

/* Menu ouvert */
.header__nav--open {
    transform: translateY(0);
}

/* Liste des liens */
.header__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    font-family: "Orbitron", serif;
    flex-direction: row;
    /* Alignement horizontal sur desktop */
    gap: 2rem;
    justify-content: flex-end;
    /* Alignement à droite */
    width: 100%;
    /* Assurez-vous que les éléments prennent toute la largeur */
}

/* Liens */
.header__link {
    text-decoration: none;
    color: var(--text-light);
    font-size: 1.5rem;
    font-weight: 600;
    transition: color 0.3s ease;
}

.header__link:hover {
    color: var(--primary-color);
}

/* BOUTON HAMBURGER */
.header__toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 32px;
    height: 24px;
    background: none;
    border: none;
    cursor: pointer;
}

/* Barres du menu */
.header__toggle-bar {
    width: 100%;
    height: 3px;
    background: var(--text-light);
    border-radius: 2px;
    transition: all 0.3s ease;
}

/* Animation du bouton hamburger */
.header__toggle-bar--active:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.header__toggle-bar--active:nth-child(2) {
    opacity: 0;
}

.header__toggle-bar--active:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

/* RESPONSIVE : Affichage du menu sur Desktop */
@media screen and (min-width: 1024px) {
    .header__nav {
        position: static;
        transform: none;
        background: transparent;
        height: auto;
    }

    .header__list {
        flex-direction: row;
        gap: 2rem;
        justify-content: flex-end;
        /* Items alignés à droite */
    }

    .header__toggle {
        display: none;
    }

    .header__link {
        font-size: 1rem;
    }
}
</style>