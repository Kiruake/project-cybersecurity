<template>
  <div id="game-container">
    <div v-if="gameOver" class="game-over">
      <h2>Game Over!</h2>
      <p>Score final: {{ score }}</p>
      <button @click="restartGame">Recommencer</button>
    </div>

    <div v-if="!gameOver">
      <h1>Cryptography Puzzle</h1>
      <p>Indice: {{ currentHint }}</p>
      <div>
        <label for="password-input">Déchiffrez le message :</label>
        <input v-model="inputMessage" type="text" id="password-input" placeholder="Entrez votre message décrypté" />
        <button @click="checkMessage">Vérifier</button>
      </div>
      <p>Score: {{ score }}</p>
      <p>Temps restant: {{ timeRemaining }} secondes</p>
      <p v-if="feedbackMessage">{{ feedbackMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  name: 'CryptographyPuzzle',
  setup() {
    const score = ref(0);
    const gameOver = ref(false);
    const feedbackMessage = ref('');
    const inputMessage = ref('');
    const currentHint = ref('');
    const timeRemaining = ref(30);
    const timer = ref<number | null>(null);

    // Liste des puzzles cryptographiques avec un cryptage et un indice
    const puzzles = [
      { message: 'KHOOR', hint: 'César avec un décalage de 3' },
      { message: 'Uifsf!', hint: 'César avec un décalage de 1' },
      { message: '01010011 01110101 01101100', hint: 'XOR avec clé 5' },
      { message: 'Y^O_Y@3e', hint: 'Substitution simple' },
    ];

    // Sélectionner un puzzle au hasard
    let currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

    // Démarrer un nouveau jeu
    const startGame = () => {
      score.value = 0;
      timeRemaining.value = 30;  // 30 secondes par niveau
      feedbackMessage.value = '';
      gameOver.value = false;
      currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
      currentHint.value = currentPuzzle.hint;
      inputMessage.value = '';

      // Démarrer le chronomètre
      if (timer.value) {
        clearInterval(timer.value);
      }

      timer.value = setInterval(() => {
        if (timeRemaining.value > 0) {
          timeRemaining.value--;
        } else {
          gameOver.value = true;
          clearInterval(timer.value!);
        }
      }, 1000);
    };

    // Fonction pour vérifier le message
    const checkMessage = () => {
      let decryptedMessage = '';
      if (currentPuzzle.hint.includes('César')) {
        decryptedMessage = caesarCipher(currentPuzzle.message, 3); // Décalage de 3 pour les exemples
      } else if (currentPuzzle.hint.includes('XOR')) {
        decryptedMessage = xorDecryption(currentPuzzle.message, 5); // XOR avec clé 5
      } else {
        decryptedMessage = substitutionCipher(currentPuzzle.message); // Substitution simple
      }

      if (inputMessage.value === decryptedMessage) {
        feedbackMessage.value = 'Bravo! Message décrypté!';
        score.value += 10;
        setTimeout(startGame, 1000); // Nouveau puzzle
      } else {
        feedbackMessage.value = 'Mauvais message, essayez encore.';
        score.value -= 5;
      }
    };

    // Fonction de cryptage César
    const caesarCipher = (message: string, shift: number): string => {
      return message
        .split('')
        .map(char => {
          if (char.match(/[a-zA-Z]/)) {
            const code = char.charCodeAt(0);
            const base = char.toLowerCase() === char ? 97 : 65;
            return String.fromCharCode(((code - base + shift) % 26) + base);
          }
          return char;
        })
        .join('');
    };

    // Fonction de décryptage XOR
    const xorDecryption = (message: string, key: number): string => {
      return message
        .split('')
        .map(char => String.fromCharCode(char.charCodeAt(0) ^ key))
        .join('');
    };

    // Fonction de substitution simple
    const substitutionCipher = (message: string): string => {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const substitution = 'ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba';
      return message
        .split('')
        .map(char => {
          const index = alphabet.indexOf(char);
          return index !== -1 ? substitution[index] : char;
        })
        .join('');
    };

    // Redémarrer le jeu
    const restartGame = () => {
      startGame();
    };

    // Démarrer le jeu au montage
    onMounted(() => {
      startGame();
    });

    // Nettoyer avant le démontage du composant
    onBeforeUnmount(() => {
      if (timer.value) {
        clearInterval(timer.value);
      }
    });

    return {
      score,
      gameOver,
      feedbackMessage,
      inputMessage,
      currentHint,
      timeRemaining,
      checkMessage,
      restartGame
    };
  }
});
</script>

<style scoped>
#game-container {
  text-align: center;
  padding: 20px;
}

.game-over {
  margin-top: 30px;
}

input {
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  width: 300px;
}

button {
  padding: 10px 20px;
  background-color: #2f59f5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #1c44b5;
}

p {
  font-size: 18px;
  color: #333;
}

h1 {
  font-size: 24px;
  color: #080e24;
}

h2 {
  font-size: 28px;
  color: red;
}

button {
  margin-top: 20px;
}

input {
  margin-bottom: 10px;
}

p {
  font-weight: bold;
}

.game-over button {
  background-color: #ff6347;
}

.game-over button:hover {
  background-color: #ff4500;
}
</style>
