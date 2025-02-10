<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6" v-for="recipe in recipes" :key="recipe.id">
            <div @click="goToModification(recipe.nom)">
              <mini-statistics-card
                :title="{ text: '', value: recipe.nom }"
                :detail="recipe.Recette.ingredients.map(ingredient => ingredient.nom).join(', ')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartHolderCard from "./components/ChartHolderCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import ReportsLineChart from "@/examples/Charts/ReportsLineChart.vue";
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
import ProjectCard from "./components/ProjectCard.vue";
import TimelineList from "@/examples/Cards/TimelineList.vue";
import TimelineItem from "@/examples/Cards/TimelineItem.vue";
import logoXD from "@/assets/img/small-logos/logo-xd.svg";
import logoAtlassian from "@/assets/img/small-logos/logo-atlassian.svg";
import logoSlack from "@/assets/img/small-logos/logo-slack.svg";
import logoSpotify from "@/assets/img/small-logos/logo-spotify.svg";
import logoJira from "@/assets/img/small-logos/logo-jira.svg";
import logoInvision from "@/assets/img/small-logos/logo-invision.svg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import axios from 'axios';

export default {
  name: "dashboard-default",
  data() {
    return {
      recipes: [], // Store the fetched recipes
      loading: false, // For loading state
      error: null, // To handle errors
      logoXD,
      team1,
      team2,
      team3,
      team4,
      logoAtlassian,
      logoSlack,
      logoSpotify,
      logoJira,
      logoInvision,
      cards: [
        { value: 'Pasta alla Zozzona', detail: 'Pate, Tomate, porc, charcutterie, oignon, oeuf' },
        { value: 'Soupe a l\'oignon', detail: 'Bouillon de soupe, oignon, pain, fromage' },
        { value: 'Nasi goreng', detail: 'Riz, oeuf, tomate, oignon, porc' },
        { value: 'Bibimbap', detail: 'Riz, porc, oeuf' },
        { value: 'Soupe au tomate', detail: 'Tomate, oignon, bouillon de soupe, pain, pate' },
        { value: 'Plat hafa', detail: 'ingredient, ingredient, ingredient, ingredient, ingredient' },
        { value: 'Plat hafa', detail: 'ingredient, ingredient, ingredient, ingredient, ingredient' },
        { value: 'Plat hafa', detail: 'ingredient, ingredient, ingredient, ingredient, ingredient' },
        { value: 'Plat hafa', detail: 'ingredient, ingredient, ingredient, ingredient, ingredient' }
      ]
    };
  },
  components: {
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
    MiniStatisticsCard,
    ProjectCard,
    TimelineList,
    TimelineItem,
  },
  methods: {
    goToModification(valeur) {
      this.$router.push(`/modification/${valeur}`);
    },
    // Fetch data from API
    async fetchRecipes() {
      this.loading = true; // Start loading
      this.error = null; // Reset error
      try {
        const response = await axios.get('https://godot-back-symfony-webservic-production.up.railway.app/api/plats');
        this.recipes = response.data; // Save the fetched data
      } catch (error) {
        this.error = 'Failed to fetch recipes. Please try again.';
        console.error(error);
      } finally {
        this.loading = false; // End loading
      }
    },
    // fetchData() {
    //   axios.get('https://godot-back-symfony-webservic-production.up.railway.app/api/plats')  // L'URL de l'API Symfony
    //     .then(response => {
    //       this.responseData = response.data;  // Assigner les données récupérées
    //     })
    //     .catch(error => {
    //       this.error = error.response ? error.response.data : error.message;
    //     });
    // }
  },
  mounted() {
    // Fetch data when the component is mounted
    this.fetchRecipes();
  }
};
</script>
