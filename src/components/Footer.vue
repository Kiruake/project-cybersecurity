<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-left">
                <h1 class="footer-title1">
                    Cyber<span style="color: #2f59f5;">Hub</span>
                </h1>
                <h2 class="footer-title">TOUT CE DONT TU AS BESOIN.</h2>
                <p class="footer-description">
                    Ta porte d'entrée dans le monde de la cybersécurité.
                </p>
                <RouterLink :to="{ path: '/', hash: '#cards-contact' }">
                    <a class="footer-button">Nous contacter</a>
                </RouterLink>
            </div>

            <!-- Section Menu en 2 colonnes -->
            <div class="footer-menu">
                <div class="menu-columns">
                    <div class="menu-column">
                        <h3>Navigation</h3>
                        <ul>
                            <RouterLink to="/">
                                <li>Accueil</li>
                            </RouterLink>

                            <RouterLink to="/metiers">
                                <li>Les métiers</li>
                            </RouterLink>

                            <RouterLink to="/events">
                                <li>Événements</li>
                            </RouterLink>

                            <RouterLink :to="{ path: '/', hash: '#cards-parcours' }">
                                <li>Écoles en cyber</li>
                            </RouterLink>



                        </ul>
                    </div>
                    <div class="menu-column">
                        <h3>Ressources</h3>
                        <ul>

                            <RouterLink :to="{ path: '/', hash: '#cards-cours' }">
                                <li>Nos cours</li>
                            </RouterLink>

                            <RouterLink to="/ressources">
                                <li>Ressources Externes</li>
                            </RouterLink>

                            <RouterLink to="/quizz">
                                <li>Quiz</li>
                            </RouterLink>

                            <RouterLink to="/about">
                                <li>À propos</li>
                            </RouterLink>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <ul>
                <RouterLink to="/pl">
                    <li>Politique de confidentialité</li>
                </RouterLink>

                <RouterLink to="/ml">
                    <li>Mentions légales</li>
                </RouterLink>
            </ul>
            <p>© 2025 Tout droits réservés - Cyber<span style="color: #2f59f5;">Hub</span></p>
        </div>
    </footer>
</template>

<style scoped>
/* Footer principal */
.footer {
    background: #080e24;
    color: #ffffff;
    padding: 50px 20px;
}

/* Conteneur principal */
.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    gap: 150px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: flex-start;
}

/* Partie gauche */
.footer-left {
    max-width: 500px;
    flex: 1;
}

.footer-title1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: white;
}

.footer-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: white;
}

.footer-description {
    font-size: 1rem;
    margin-bottom: 20px;
    color: white;
}

/* Bouton "Nous contacter" */
.footer-button {
    display: inline-block;
    background-color: #2f59f5;
    font-family: 'Orbitron', sans-serif;
    color: white;
    padding: 12px 24px;
    font-size: 1rem;
    border-radius: 8px;
    text-decoration: none;
    transition: 0.3s ease;
}

.footer-button:hover {
    background-color: #234ada;
}

/* Section Menu */
.footer-menu {
    flex: 1;
    max-width: 600px;
    margin-left: 50px;
    /* Décalage vers la gauche */
}

/* Titre des colonnes */
.footer-menu h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    margin-top: 30px;
    color: #2f59f5;
    font-family: 'Orbitron', sans-serif;
}

/* Disposition en 2 colonnes */
.menu-columns {
    display: flex;
    gap: 100px;
}

/* Chaque colonne */
.menu-column ul {
    list-style: none;
    padding: 0;
}


.menu-column a {
    color: white;
    font-size: 1rem;
    text-decoration: none;
    transition: 0.3s;
}

.menu-column a:hover {
    color: white;
}

/* Bas du footer */
.footer-bottom {
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid white;
}

.footer-bottom ul {
    list-style: none;
    padding: 0;
    margin-bottom: 10px;
    display: flex;
    margin-top: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.footer-bottom li {
    margin: 5px 15px;
}

.footer-bottom a {
    color: white;
    text-decoration: none;
    transition: 0.3s;
}

.footer-bottom a:hover {
    color: white;
}

.footer-bottom p {
    font-size: 0.9rem;
    color: white;
    margin-bottom: -10px;
}

@media (max-width: 1024px) {
    .footer-container {
        gap: 40px;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .footer-container {
        flex-direction: column;
        text-align: center;
        gap: 0px;
    }

    .footer-left {
        max-width: 100%;
        margin-bottom: 30px;
        margin: auto;
    }

    .footer-menu {
        margin: auto;
        margin-left: auto;
    }

    .menu-columns {
        align-items: center;
        gap: 100px;
        margin-top: 30px;
    }

    .menu-columns li {
        text-align: start;
    }

    .footer-menu h3 {
        margin-bottom: 0;
        text-align: start;
    }
}

@media (max-width: 540px) {
    .footer-container {
        flex-direction: column;
        text-align: center;
        gap: 0px;
    }

    .footer-left {
        max-width: 100%;
        margin-bottom: 30px;
    }

    .footer-menu {
        margin: auto;
        margin-left: auto;
    }

    .menu-columns {
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }

    .footer-menu h3 {
        margin-bottom: 0;
    }
}
</style>
