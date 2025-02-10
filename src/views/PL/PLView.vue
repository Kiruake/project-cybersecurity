<script setup>
import Header from '@/components/Header.vue';
</script>

<template>
    <Header />
    <h1 class="privacy-title">Politique de <span style="color: #2f59f5;">confidentialité</span></h1>
    <section class="privacy-container">
        <p>CyberHub s'engage à respecter votre vie privée et à protéger vos données personnelles.</p>

        <div class="privacy-section">
            <h2>1. Collecte des données</h2>
            <p>Nous collectons uniquement :</p>
            <ul>
                <li>- Votre nom et email si vous nous contactez.</li>
                <li>- Des données anonymes pour les statistiques de navigation.</li>
            </ul>
        </div>

        <div class="privacy-section">
            <h2>2. Finalité des données collectées</h2>
            <p>Les données servent uniquement à répondre aux demandes et à améliorer l’expérience utilisateur.</p>
        </div>

        <div class="privacy-section">
            <h2>3. Stockage et sécurité</h2>
            <p>Vos données sont stockées en toute sécurité et ne sont pas partagées avec des tiers.</p>
        </div>

        <div class="privacy-section">
            <h2>4. Cookies</h2>
            <p>Nous utilisons des cookies uniquement pour les statistiques anonymes. Vous pouvez les désactiver dans
                votre navigateur.</p>
        </div>

        <div class="privacy-section">
            <h2>5. Vos droits</h2>
            <p>Conformément au RGPD, vous pouvez nous contacter à <a
                    href="mailto:ayrton.chaves08@gmail.com">ayrton.chaves08@gmail.com</a> pour :</p>
            <ul>
                <li>- Demander l’accès à vos données.</li>
                <li>- Demander leur modification ou suppression.</li>
                <li>- Vous opposer à leur traitement.</li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.privacy-container {
    margin: auto;
    padding: 20px;
    margin-bottom: 80px;

}

.privacy-title {
    font-size: 4rem;
    margin-left: 20px;
    font-weight: bold;
    color: #080e24;
    margin-bottom: 0px;
}

.privacy-section {
    margin-bottom: 30px;
}

.privacy-section h2 {
    font-size: 1.4rem;
    color: #080e24;
    margin-bottom: 10px;
}

.privacy-section a {
    color: #2f59f5;
}

.privacy-container p {
    font-size: 1rem;
    color: #333;
    line-height: 1.8;
}

.privacy-section p,
li {

    font-size: 1rem;
    color: #333;
    line-height: 1.8;
}

@media (max-width: 530px) {

    .privacy-title {
        font-size: 2.5rem;
    }
}
</style>
