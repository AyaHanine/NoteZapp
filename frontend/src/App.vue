<script>
    import Header from "./components/Header.vue";
    import { useRoute } from "vue-router";
    import { watch } from "vue";
import Footer from "./components/Footer.vue";

    export default {
        components: {
            Header,
            Footer
        },
        setup() {
            const route = useRoute(); // Accède à la route active
            
            // Met à jour le titre de la page quand la route change
            const updatePageTitle = () => {
                const title = route.meta.title || 'SyncTrip';
                document.title = title;
            };
            
            // Met à jour le titre au chargement initial
            updatePageTitle();
            
            // Surveille les changements de route pour mettre à jour le titre
            watch(() => route.meta.title, updatePageTitle);
            
            return { route };
        },
    };
</script>

<template>
    <div>
        <Header v-if="route.meta.showHeaderFooter !== false  "/>
        <router-view />
        <Footer v-if="route.meta.showHeaderFooter !== false" />
    </div>
</template>

<style scoped></style>
