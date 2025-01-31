<template>
    <section class="concepts-section">

        <h1 class="cards-title-concept">Avant de continuer, voici le minimum !</h1>

        <div class="concepts-container">
            <!-- Concept 1 -->
            <div class="concept-card">
                <img src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    alt="Blue Team" class="concept-image" />
                <div class="concept-details">
                    <h3>Blue Team & Red Team</h3>
                    <p>
                        La Blue Team défend les systèmes contre les attaques de la Red Team,
                        qui, quant à elle, cherche à identifier et exploiter les vulnérabilités.
                    </p>
                </div>
            </div>

            <!-- Concept 2 -->
            <div class="concept-card">
                <img src="/images/hacking.jpg" alt="Hacking Éthique" class="concept-image" />
                <div class="concept-details">
                    <h3>Hacking Éthique</h3>
                    <p>
                        Il s'agit d'exploiter les failles de sécurité de manière légale pour
                        améliorer la cybersécurité d'une organisation.
                    </p>
                </div>
            </div>

            <!-- Concept 3 -->
            <div class="concept-card">
                <img src="/images/cryptographie.jpg" alt="Cryptographie" class="concept-image" />
                <div class="concept-details">
                    <h3>Cryptographie</h3>
                    <p>
                        La cryptographie est l'art de sécuriser les informations grâce à des
                        techniques de codage pour garantir leur confidentialité.
                    </p>
                </div>
            </div>

            <!-- Concept 4 -->
            <div class="concept-card">
                <img src="/images/report.png" alt="Gestion des Risques" class="concept-image" />
                <div class="concept-details">
                    <h3>Gestion des Risques</h3>
                    <p>
                        Identifier, évaluer et réduire les risques liés aux menaces
                        potentielles pour sécuriser les systèmes d'information.
                    </p>
                </div>
            </div>

            <!-- Concept 5 -->
            <div class="concept-card">
                <img src="/images/firewall.jpg" alt="Pare-feu" class="concept-image" />
                <div class="concept-details">
                    <h3>Pare-feu</h3>
                    <p>
                        Le pare-feu est un système qui filtre le trafic réseau pour empêcher
                        l'accès non autorisé à un réseau ou à un appareil.
                    </p>
                </div>
            </div>

            <!-- Concept 6 -->
            <div class="concept-card">
                <img src="/images/phishing.jpg" alt="Phishing" class="concept-image" />
                <div class="concept-details">
                    <h3>Phishing</h3>
                    <p>
                        Le phishing consiste à tromper les utilisateurs pour leur faire
                        divulguer des informations sensibles, comme des mots de passe.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>


<style scoped>
.concepts-section {
    padding: 80px 60px;
    background-color: #080e24;
    margin: 0 auto;
}

.cards-title-concept {
    color: #f5fcff;
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 80px;
    font-family: "Orbitron", serif;

}

h2 {
    font-size: 2.5rem;
    color: #080e24;
    margin-bottom: 40px;
}

.concepts-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
    gap: 30px;
    justify-items: center;
}

.concept-card {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #f5fcff;
    border-radius: 6px;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    height: 180px;
    width: 100%;
    max-width: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}


.concept-image {
    width: 40%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px 0 0 12px;
}


.concept-details {
    padding: 15px;
    flex: 1;
    text-align: left;
}

.concept-details h3 {
    font-size: 1.3rem;
    font-family: 'Orbitron', sans-serif;
    color: #080e24;
    margin-bottom: 10px;
}

.concept-details p {
    font-size: 13px;
    color: #333;
    line-height: 1.4;
}
</style>