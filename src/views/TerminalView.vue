<template>
    <div class="terminal-container">
        <div class="terminal-header">💻 OS Terminal Challenge</div>
        <div class="terminal-body">
            <div v-for="(line, index) in output" :key="index" class="terminal-line">
                {{ line }}
            </div>
            <div class="terminal-input">
                <span class="prompt">guest@system:~$</span>
                <input v-model="userInput" @keydown.enter="processCommand" ref="terminalInput" autofocus />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// État du terminal
const userInput = ref("");
const output = ref(["Bienvenue dans le serveur sécurisé. Tapez 'help' pour voir les commandes."]);

// Fichiers et répertoires fictifs
const fileSystem = {
    "/": ["logs", "admin", "secret.txt"],
    "/logs": ["error.log"],
    "/admin": [],
};

// Dossier actuel
const currentPath = ref("/");

// Commandes disponibles
const commands = {
    help: "Commandes disponibles : ls, cd [dossier], cat [fichier], hack, download [fichier]",
    ls: () => `📂 Contenu de ${currentPath.value} : ${fileSystem[currentPath.value].join(", ") || "Aucun fichier"}`,
    cd: (args) => changeDirectory(args),
    cat: (args) => readFile(args),
    hack: () => hackSystem(),
    download: (args) => downloadFile(args),
};

// Fonction pour changer de dossier
const changeDirectory = (args) => {
    if (!args.length) return "❌ Usage : cd [dossier]";
    const newPath = `/${args[0]}`;
    if (fileSystem[newPath]) {
        currentPath.value = newPath;
        return `📁 Vous êtes maintenant dans ${newPath}`;
    } else {
        return `❌ Dossier introuvable : ${args[0]}`;
    }
};

// Fonction pour lire un fichier
const readFile = (args) => {
    if (!args.length) return "❌ Usage : cat [fichier]";
    const file = args[0];

    if (currentPath.value === "/" && file === "secret.txt") {
        return "🔐 Fichier protégé. Accès refusé.";
    }

    if (currentPath.value === "/logs" && file === "error.log") {
        return "🔎 Indice : Le mot de passe admin est 'root42'.";
    }

    return "❌ Fichier introuvable.";
};

// Fonction pour pirater le système
const hackSystem = () => {
    if (currentPath.value !== "/admin") {
        return "🚫 Vous devez être dans /admin pour tenter un hack.";
    }
    return "🔓 Hack réussi ! Accès admin activé. Tapez 'ls' pour voir les fichiers.";
};

// Fonction pour télécharger un fichier
const downloadFile = (args) => {
    if (!args.length) return "❌ Usage : download [fichier]";
    if (args[0] === "secret.txt" && currentPath.value === "/") {
        return "🎉 Bravo ! Vous avez récupéré le fichier secret et terminé la mission !";
    }
    return "❌ Fichier introuvable.";
};

// Fonction principale pour gérer les commandes
const processCommand = () => {
    const input = userInput.value.trim();
    if (!input) return;

    const [command, ...args] = input.split(" ");

    if (commands[command]) {
        output.value.push(`guest@system:~$ ${input}`);
        const response = typeof commands[command] === "function" ? commands[command](args) : commands[command];
        output.value.push(response);
    } else {
        output.value.push(`❌ Commande inconnue : ${command}`);
    }

    userInput.value = "";
    scrollToBottom();
};

// Auto-scroll vers le bas du terminal
const scrollToBottom = () => {
    setTimeout(() => {
        const terminalBody = document.querySelector(".terminal-body");
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 10);
};

// Focus automatique sur l'input du terminal
onMounted(() => {
    document.querySelector("input").focus();
});
</script>

<style scoped>
/* Conteneur principal */
.terminal-container {
    max-width: 800px;
    margin: 50px auto;
    background: black;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
    font-family: "Courier New", monospace;
}

/* Barre du terminal */
.terminal-header {
    background: rgb(0, 255, 0);
    color: black;
    padding: 10px;
    text-align: center;
    font-weight: bold;
}

/* Corps du terminal */
.terminal-body {
    padding: 15px;
    color: lime;
    height: 400px;
    overflow-y: auto;
    font-size: 16px;
    line-height: 1.5;
}

/* Ligne de commande */
.terminal-line {
    white-space: pre-wrap;
}

/* Zone de saisie */
.terminal-input {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.prompt {
    margin-right: 10px;
    color: lime;
}

input {
    background: transparent;
    border: none;
    outline: none;
    color: lime;
    font-size: 16px;
    width: 100%;
}
</style>