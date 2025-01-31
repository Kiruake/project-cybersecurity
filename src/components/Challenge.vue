<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const missions = ref([
    {
        id: 1,
        title: "Décryptage Base64",
        task: "Décodez ce message : 'SGFja2VyIENoYWxsZW5nZSE='",
        answer: "Hacker Challenge!",
        hint: "Regardez les outils de conversion en ligne.",
        explanation: "Base64 est un encodage permettant de convertir du binaire en texte lisible.",
    },
    {
        id: 2,
        title: "Injection SQL",
        task: "Quelle entrée peut contourner une authentification SQL ?",
        answer: "' OR '1'='1' --",
        hint: "Essayez une requête toujours vraie.",
        explanation: "L'injection SQL permet d'exécuter des requêtes malveillantes sur une base de données.",
    },
    {
        id: 3,
        title: "XSS Attack",
        task: "Trouvez un script XSS valide !",
        answer: "alert('XSS')",
        hint: "Essayez d'insérer un script.",
        explanation: "Le Cross-Site Scripting permet d'injecter du JavaScript dans une page web.",
    },
    {
        id: 4,
        title: "Crack MD5",
        task: "Déchiffrez ce hash : '5f4dcc3b5aa765d61d8327deb882cf99'",
        answer: "password",
        hint: "C'est le mot de passe le plus basique.",
        explanation: "MD5 est un algorithme de hachage faible, vulnérable aux attaques par dictionnaire.",
    },
]);

const currentMissionIndex = ref(0);
const userInput = ref("");
const feedbackMessage = ref("");
const isCorrect = ref(false);
const missionCompleted = ref(false);
const showHint = ref(false);
const hackProgress = ref(0);

const currentMission = computed(() => missions.value[currentMissionIndex.value]);
const isLastMission = computed(() => currentMissionIndex.value === missions.value.length - 1);

const checkAnswer = () => {
    if (userInput.value.trim().toLowerCase() === currentMission.value.answer.toLowerCase()) {
        isCorrect.value = true;
        feedbackMessage.value = "✅ Accès validé !";
        missionCompleted.value = true;
        showHint.value = false;
    } else {
        isCorrect.value = false;
        feedbackMessage.value = "❌ Accès refusé... Besoin d'un indice ?";
        showHint.value = true;
    }
};

const nextMission = () => {
    if (currentMissionIndex.value < missions.value.length - 1) {
        currentMissionIndex.value++; userInput.value = "";
        feedbackMessage.value = ""; missionCompleted.value = false; showHint.value = false; hackProgress.value += 25;
    }
}; const restartGame = () => {
    currentMissionIndex.value = 0;
    userInput.value = "";
    feedbackMessage.value = "";
    missionCompleted.value = false;
    showHint.value = false;
    hackProgress.value = 0;
};

onMounted(() => {
    hackProgress.value = 0;
});
</script>

<template>
    <div class="hacker-dashboard">
        <div class="hacking-interface">
            <div class="progress-bar-container">
                <p class="progress-label">Progression du Challenge : {{ hackProgress }}%</p>
                <div class="progress-bar">
                    <div class="progress" :style="{ width: hackProgress + '%' }"></div>
                </div>
            </div>

            <div class="mission-container">
                <h2 class="mission-title">{{ currentMission.title }}</h2>
                <p class="task">{{ currentMission.task }}</p>

                <input v-model="userInput" type="text" class="input" placeholder="Tapez votre réponse..." />
                <button @click="checkAnswer" class="btn">💻 Exécuter</button>

                <p v-if="feedbackMessage" :class="{ correct: isCorrect, wrong: !isCorrect }">
                    {{ feedbackMessage }}
                </p>
                <p v-if="showHint" class="hint">💡 Indice : {{ currentMission.hint }}</p>
            </div>

            <button v-if="missionCompleted && !isLastMission" @click="nextMission" class="btn next">
                🚀 Mission suivante
            </button>
            <button v-if="missionCompleted && isLastMission" @click="restartGame" class="btn restart">
                🔄 Recommencer
            </button>
        </div>

        <div class="explanation">
            <h3>📖 Détails techniques</h3>
            <p>{{ currentMission.explanation }}</p>
        </div>
    </div>
</template>

<style scoped>
/* CONTAINER PRINCIPAL */
.hacker-dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, #121212, #1b1f25);
    color: #d1d9e6;
    padding: 50px 30px;
    border-radius: 12px;
    width: 95%;
    margin: auto;
    box-shadow: 0px 0px 15px rgba(0, 255, 128, 0.5);
}

/* INTERFACE DE HACKING */
.hacking-interface {
    width: 95%;
    background: #14181f;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 12px rgba(0, 255, 128, 0.3);
}

/* PROGRESS BAR */
.progress-bar-container {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
}

.progress-label {
    font-size: 14px;
    color: #00ff7f;
    margin-bottom: 20px;
}

.progress-bar {
    width: 95%;
    height: 8px;
    margin: auto;
    background: #333;
    border-radius: 5px;
    overflow: hidden;
}

.progress {
    height: 8px;
    background: #00ff7f;
    transition: width 0.3s ease-in-out;
}

/* MISSION */
.mission-container {
    text-align: center;
}

.mission-title {
    font-size: 20px;
    color: #00ff7f;
    text-transform: uppercase;
    margin-bottom: 30px;
    margin-top: 30px;
}

.task {
    font-size: 16px;
    margin-bottom: 30px;
}

/* INPUT + BOUTONS */
.input {
    width: 80%;
    padding: 13px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    margin-bottom: 10px;
    background: #0d1117;
    color: #fff;
    border: 1px solid #00ff7f;
}

.btn {
    padding: 11px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s ease-in-out;
    background: #00ff7f;
    color: #161b22;
    margin-left: 20px;
}

.next {
    background: #007bff;
    color: white;
}

.restart {
    background: #dc3545;
    color: white;
}

/* MESSAGES */
.correct {
    color: #00ff7f;
    font-weight: bold;
}

.wrong {
    color: #ff4747;
    font-weight: bold;
}

/* EXPLICATION */
.explanation {
    margin-top: 20px;
    background: #21262d;
    padding: 20px;
    border-radius: 8px;
    width: 95%;
}
</style>
