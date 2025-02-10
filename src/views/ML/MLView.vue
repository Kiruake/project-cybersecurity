<script setup>
import Header from '@/components/Header.vue';
</script>

<template>
    <Header />
    <h1 class="legal-title">Mentions <span style="color: #2f59f5;">Légales</span></h1>
    <section class="legal-container">
        <p>Conformément aux articles 6-III et 19 de la loi pour la Confiance dans l'Économie Numérique, nous vous
            informons des mentions légales suivantes.</p>

        <div class="legal-section">
            <h2>1. Éditeur du site</h2>
            <p><strong>Nom du site :</strong> CyberHub</p>
            <p><strong>Statut :</strong> Projet pédagogique à but non lucratif</p>
            <p><strong>Créateur :</strong> Ayrton CHAVES</p>
            <p><strong>Email de contact :</strong> <a
                    href="mailto:ayrton.chaves08@gmail.com">ayrton.chaves08@gmail.com</a></p>
        </div>

        <div class="legal-section">
            <h2>2. Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <p><strong>Hébergeur :</strong> Supabase</p>
            <p><strong>Site web :</strong> <a href="https://supabase.com" target="_blank">https://supabase.com</a></p>
        </div>

        <div class="legal-section">
            <h2>3. Propriété intellectuelle</h2>
            <p>Tout le contenu du site (textes, images, logos) appartient à **CyberHub** et ne peut être utilisé sans
                autorisation préalable.</p>
        </div>

        <div class="legal-section">
            <h2>4. Responsabilité</h2>
            <p>CyberHub est un projet pédagogique et ne peut être tenu responsable des informations publiées.
                L'utilisateur est seul responsable de l'utilisation des ressources mises à disposition.</p>
        </div>

        <div class="legal-section">
            <h2>5. Protection des données</h2>
            <p>Nous nous engageons à respecter la confidentialité des données conformément au RGPD. Pour en savoir
                plus, consultez notre <router-link to="/pl">Politique de Confidentialité</router-link>.</p>
        </div>

        <div class="legal-section">
            <h2>6. Contact</h2>
            <p>Pour toute question, vous pouvez nous contacter à <a
                    href="mailto:ayrton.chaves08@gmail.com">ayrton.chaves08@gmail.com</a>.</p>
        </div>
    </section>
</template>

<style scoped>
.legal-container {
    margin: auto;
    padding: 20px;
    margin-bottom: 80px;
}

.legal-title {
    font-size: 4rem;
    margin-left: 20px;
    font-weight: bold;
    color: #080e24;
    margin-bottom: 0px;
}

.legal-section {
    margin-bottom: 30px;
}

.legal-section h2 {
    font-size: 1.4rem;
    color: #080e24;
    margin-bottom: 10px;
}

.legal-section a {
    color: #2f59f5;
}

.legal-container p {
    font-size: 1rem;
    color: #333;
    line-height: 1.8;
}

.legal-section p,
li {
    font-size: 1rem;
    color: #333;
    line-height: 1.8;
}
</style>
