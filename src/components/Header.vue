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
            <!-- Logo toujours visible -->
            <RouterLink to="/" class="header__logo-link">
                <h1 class="header__logo">Cyber<span class="highlight">Hub</span></h1>
            </RouterLink>

            <!-- Menu Mobile - Bouton Hamburger -->
            <button class="header__toggle" aria-label="Toggle Menu" @click="toggleMenu" v-if="!isMenuOpen">
                <span class="header__toggle-bar"></span>
                <span class="header__toggle-bar"></span>
                <span class="header__toggle-bar"></span>
            </button>

            <!-- Menu -->
            <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
                <!-- Bouton Fermer (croix) visible seulement en mobile -->
                <button class="header__close" @click="closeMenu" v-if="isMenuOpen">x</button>

                <ul class="header__list">
                    <li class="header__item">
                        <RouterLink :to="{ path: '/', hash: '#cards-parcours' }" class="header__link"
                            @click="closeMenu">
                            Les Écoles
                        </RouterLink>
                    </li>

                    <li class="header__item">
                        <RouterLink :to="{ path: '/', hash: '#cards-cours' }" class="header__link" @click="closeMenu">
                            Nos Cours
                        </RouterLink>
                    </li>

                    <li class="header__item">
                        <RouterLink to="/quizz" class="header__link" @click="closeMenu">Quiz</RouterLink>
                    </li>

                    <li class="header__item">
                        <RouterLink to="/events" class="header__link" @click="closeMenu">
                            Événements 2025
                        </RouterLink>
                    </li>

                    <li class="header__item">
                        <RouterLink to="/metiers" class="header__link" @click="closeMenu">
                            Les Métiers
                        </RouterLink>
                    </li>

                    <li class="header__item">
                        <RouterLink to="/ressources" class="header__link" @click="closeMenu">
                            Ressources
                        </RouterLink>
                    </li>
                </ul>
            </nav>
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(8, 14, 36, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.4s ease-in-out;
    z-index: 1000;
}

/* Activation du menu */
.header__nav--open {
    transform: translateX(0);
}

/* Liste des liens */
.header__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    font-family: "Orbitron", serif;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
}

/* Liens */
.header__link {
    text-decoration: none;
    color: var(--text-light);
    font-size: 1.8rem;
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

/* BOUTON CROIX (FERMER LE MENU) */
.header__close {
    position: absolute;
    top: 20px;
    right: 25px;
    background: none;
    border: none;
    color: var(--text-light);
    font-size: 2rem;
    cursor: pointer;
}

/* === Responsive Header === */
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
    }

    .header__toggle {
        display: none;
    }

    .header__link {
        font-size: 1rem;
    }
}

/* 📌 Version tablette et mobile */
@media screen and (max-width: 1024px) {
    .header__container {
        padding: 0 15px;
    }

    .header__nav {
        transform: translateX(100%);
    }

    /* Activation du menu */
    .header__nav--open {
        transform: translateX(0);
    }

    /* Liste des liens en colonne */
    .header__list {
        flex-direction: column;
        gap: 2rem;
    }

    /* Taille des liens */
    .header__link {
        font-size: 1.8rem;
    }

    /* Affichage du bouton hamburger */
    .header__toggle {
        display: flex;
    }
}

/* 📌 Pour petits mobiles */
@media screen and (max-width: 768px) {
    .header__logo {
        font-size: 22px;
    }

    .header__toggle {
        width: 28px;
        height: 22px;
    }

    .header__toggle-bar {
        height: 2.5px;
    }

    .header__list {
        gap: 2rem;
    }

    .header__link {
        font-size: 1.5rem;
    }
}
</style>
