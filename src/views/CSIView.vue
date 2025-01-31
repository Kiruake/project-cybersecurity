// App.vue - Cyber Defense: Firewall Master (Version Avancée)
<template>
  <div class="game-container">
    <h1>🛡️ Cyber Defense: Firewall Master</h1>
    <h3>Protège ton réseau en bloquant les cyberattaques et en optimisant ta défense !</h3>

    <div v-if="!gameOver">
      <h4>📡 Logs réseau en temps réel :</h4>
      <div class="log-container">
        <div v-for="(log, index) in logs" :key="index" :class="['log-entry', log.type]">
          <p><strong>IP:</strong> {{ log.ip }} - <strong>Requête:</strong> {{ log.request }}</p>
          <button @click="handleAction(log, true)">✅ Autoriser</button>
          <button @click="handleAction(log, false)">❌ Bloquer</button>
        </div>
      </div>
    </div>

    <div class="status">
      <p>🔵 Score: {{ score }} | ❌ Erreurs: {{ mistakes }}/5</p>
      <p>🛠️ Niveau de Sécurité: {{ securityLevel }}</p>
      <progress :value="securityLevel" max="100"></progress>
      <p v-if="gameOver" class="game-over">🚨 Réseau compromis ! Fin du jeu.</p>
      <button v-if="gameOver" @click="restartGame">🔄 Recommencer</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const logs = ref([]);
const score = ref(0);
const mistakes = ref(0);
const gameOver = ref(false);
const securityLevel = ref(100);

const attackPatterns = [
  { ip: '192.168.1.45', request: 'GET /index.html', type: 'safe' },
  { ip: '172.16.23.5', request: 'DROP TABLE users', type: 'attack' },
  { ip: '203.0.113.10', request: 'alert(1)', type: 'attack' },
  { ip: '185.42.102.8', request: 'POST /login.php', type: 'safe' },
  { ip: '156.67.89.22', request: 'SELECT * FROM passwords', type: 'attack' }
];

const generateLog = () => {
  if (gameOver.value) return;
  const randomLog = attackPatterns[Math.floor(Math.random() * attackPatterns.length)];
  logs.value.push(randomLog);
  if (logs.value.length > 5) logs.value.shift();
};

const handleAction = (log, allowed) => {
  if (gameOver.value) return;

  if ((log.type === 'attack' && !allowed) || (log.type === 'safe' && allowed)) {
    score.value++;
    securityLevel.value = Math.min(100, securityLevel.value + 5);
  } else {
    mistakes.value++;
    securityLevel.value -= 10;
    if (mistakes.value >= 5) {
      gameOver.value = true;
    }
  }
};

const restartGame = () => {
  logs.value = [];
  score.value = 0;
  mistakes.value = 0;
  gameOver.value = false;
  securityLevel.value = 100;
};

onMounted(() => {
  setInterval(generateLog, 2000);
});
</script>

<style>
.game-container {
  text-align: center;
  padding: 20px;
}

.log-container {
  margin-top: 20px;
}

.log-entry {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.log-entry.attack {
  background: #ffaaaa;
}

.log-entry.safe {
  background: #aaffaa;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.status {
  margin-top: 20px;
  font-size: 1.2em;
}

.game-over {
  color: red;
  font-weight: bold;
}

progress {
  width: 100%;
  height: 20px;
}
</style>