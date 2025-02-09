<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase';
import Header from '@/components/Header.vue';
import RecommendedChannels from '@/components/RecommendedChannels.vue';

const playlists = ref([]);
const selectedPlaylist = ref(null);
const selectedVideo = ref(null);

// Récupérer les playlists et compter le nombre de vidéos par playlist
const fetchPlaylists = async () => {
    const { data: playlistsData, error: playlistsError } = await supabase
        .from('playlist')
        .select('*');

    if (playlistsError) {
        console.error("Erreur lors de la récupération des playlists :", playlistsError);
        return;
    }

    // Récupérer le nombre de vidéos par playlist
    const playlistsWithCounts = await Promise.all(
        playlistsData.map(async (playlist) => {
            const { count, error } = await supabase
                .from('ressources')
                .select('id', { count: 'exact', head: true })
                .eq('playlist_id', playlist.id);

            if (error) {
                console.error(`Erreur lors de la récupération des vidéos pour la playlist ${playlist.nom}`, error);
                return { ...playlist, videoCount: 0 };
            }

            return { ...playlist, videoCount: count };
        })
    );

    playlists.value = playlistsWithCounts;
};

// Récupérer les vidéos associées à une playlist
const fetchVideos = async (playlistId) => {
    const { data, error } = await supabase
        .from('ressources')
        .select('*')
        .eq('playlist_id', playlistId);

    if (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
    } else {
        selectedPlaylist.value = playlists.value.find(p => p.id === playlistId);
        selectedPlaylist.value.videos = data;
        selectedVideo.value = data[0]; // Sélectionne la première vidéo
    }
};

// Sélection d’une vidéo
const selectVideo = (video) => {
    selectedVideo.value = video;
};

// Fermer la playlist et revenir à la liste des playlists
const closePlaylist = () => {
    selectedPlaylist.value = null;
    selectedVideo.value = null;
};

onMounted(fetchPlaylists);
</script>

<template>
    <Header />
    <div class="page-subtitle">
        <h1 class="section-title">Ressources</h1>
        <h1 class="section-title2">Externes - Youtube</h1>
    </div>

    <!-- Texte explicatif avant les playlists -->
    <div class="playlist-intro">
        <h2>Apprends la cybersécurité... sans t'endormir 😴</h2>
        <p>Tu veux devenir un hacker éthique ? Un pro de la cybersécurité ? Ou juste impressionner tes potes avec des
            termes techniques ultra stylés ?
            Peu importe ! On t'a préparé les meilleures vidéos YouTube sur le sujet.<br>
            5 playlists thématiques, zéro excuse pour ne pas devenir un boss ! 🚀🔥</p>
    </div>

    <div class="container-ressources">
        <!-- Affichage des playlists (Toujours visibles en haut) -->
        <div class="playlists-grid">
            <div v-for="playlist in playlists" :key="playlist.id" class="playlist-card"
                @click="fetchVideos(playlist.id)">
                <img :src="playlist.image" class="playlist-thumbnail">
                <div class="playlist-content">
                    <h3 class="playlist-title">{{ playlist.name }}</h3>
                    <p class="playlist-count">{{ playlist.videoCount }} vidéos</p>
                    <p class="playlist-description">{{ playlist.description }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Overlay pour la playlist ouverte -->
    <div v-if="selectedPlaylist" class="overlay">
        <div class="playlist-modal">
            <button class="close-button" @click="closePlaylist">✖</button>
            <div class="playlist-view">
                <div class="video-section">
                    <iframe v-if="selectedVideo" width="800" height="450"
                        :src="`https://www.youtube.com/embed/${selectedVideo.link.split('v=')[1]}`" frameborder="0"
                        allowfullscreen>
                    </iframe>
                </div>

                <!-- Liste des vidéos -->
                <div class="playlist-sidebar">
                    <h3 class="playlist-title-sidebar">Playlist : {{ selectedPlaylist.name }}</h3>
                    <ul>
                        <li v-for="video in selectedPlaylist.videos" :key="video.id" @click="selectVideo(video)"
                            :class="{ active: video === selectedVideo }">
                            <div class="video-thumbnail-wrapper">
                                <img :src="`https://img.youtube.com/vi/${video.link.split('v=')[1]}/hqdefault.jpg`"
                                    class="video-thumbnail">
                                <span class="video-title">{{ video.name }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <RecommendedChannels />
</template>

<style scoped>
.container-ressources {
    padding: 80px 20px;
}

.page-subtitle {
    background-color: #080e24;
}

/* Titre de la page */
.section-title {
    font-size: 5rem;
    text-align: start;
    margin-left: 20px;
    color: #2f59f5;
    margin-top: 0px;
    padding-top: 80px;
}

.section-title2 {
    font-size: 5rem;
    text-align: start;
    margin-left: 20px;
    margin-top: -5rem;
    padding-bottom: 80px;
    color: white;
}

.page-subtitle {
    font-size: 1.2rem;
    color: #b0b0b0;
    text-align: center;
    margin-bottom: 30px;
}

.playlist-intro {
    margin-bottom: 40px;
    max-width: 90%;

}

.playlist-intro h2 {
    font-size: 2rem;
    color: #080e24;
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 10px;
    padding: 0 20px;
}

.playlist-intro p {
    font-size: 1rem;
    color: #444;
    margin-bottom: -40px;
    line-height: 1.8;
    padding: 0 20px;
}

/* Grid des playlists */
.playlists-grid {
    display: flex;
    gap: 100px;
    row-gap: 50px;
    flex-wrap: wrap;
    justify-content: center;
}

/* Carte Playlist */
.playlist-card {
    color: black;
    background: white;
    cursor: pointer;
    transition: 0.3s;
    padding: 15px;
    position: relative;
}

.playlist-card:hover {
    transform: scale(1.05);
}

.playlist-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
    margin-top: 15px;
    font-family: 'Orbitron', sans-serif;
}

.playlist-count {
    font-size: 1rem;
    font-weight: bold;
    color: #2f59f5;
    margin-top: 5px;
}

.playlist-thumbnail {
    width: 300px;
    height: 300px;
    object-fit: cover;
}

.playlist-content {
    border-bottom: 1px solid #2f59f5;
}

/* Centrer la playlist ouverte en dessous des playlists */
.playlist-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Fenêtre modale */
.playlist-modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    max-width: 90%;
    width: 1200px;
    color: white;
}

/* Bouton de fermeture */
.close-button {
    position: absolute;
    top: 25px;
    right: 25px;
    background: none;
    border: none;
    color: red;
    font-size: 1.2rem;
    cursor: pointer;
}

/* Vue de la playlist */
.playlist-view {
    display: flex;
    gap: 20px;
}

/* Vidéo principale */
.video-section {
    flex: 2;
}

.playlist-title-sidebar {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
    font-family: 'Orbitron', sans-serif;
}

/* Liste des vidéos */
.playlist-sidebar {
    flex: 1;
    background: #1c1f2b;
    padding: 15px;
    border-radius: 6px;
}

/* Liste des vidéos */
.playlist-sidebar ul {
    list-style: none;
    padding: 0;
}

.playlist-sidebar li {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: 0.3s;
}

.playlist-sidebar li:hover,
.playlist-sidebar li.active {
    background: #2f59f5;
}

/* Thumbnail avec nom */
.video-thumbnail-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.video-thumbnail {
    width: 60px;
}

.video-title {
    color: white;
}

/* Responsive */
@media (max-width: 768px) {
    .playlist-view {
        flex-direction: column;
    }

    .playlist-modal {
        width: 90%;
    }

    .video-section {
        width: 100%;
    }

    .playlist-sidebar {
        width: 100%;
    }
}
</style>
