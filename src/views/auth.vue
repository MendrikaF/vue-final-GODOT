<template>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Projects</h5>
              <p class="card-description">
                <i class="fa fa-check text-info" aria-hidden="true"></i>
                <span class="font-weight-bold ms-1">30 plats</span> en cours
              </p>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th>Utilisateur</th>
                    <th>Plat</th>
                    <th>Progrès</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="project in projects" :key="project.idUser + project.title">
                    <td>{{ project.idUser }}</td>
                    <td>{{ project.title }}</td>
                    <td>
                      <span :class="'badge bg-' + project.progress.color">
                        {{ project.progress.percentage }}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Importez Axios pour effectuer des appels HTTP
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
  
  export default {
    name: "etat",
    data() {
      return {
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
        projects: [],  // Variable pour stocker les projets récupérés depuis l'API
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
    mounted() {
      this.fetchProjects(); // Appel à la méthode pour récupérer les projets au chargement du composant
    },
    methods: {
      async fetchProjects() {
    try {
      const response = await axios.get('https://godot-back-symfony-webservic-production.up.railway.app/api/commandes');
      const commandes = response.data;
  
      // Vérifier la structure des données de la réponse
      console.log(commandes);
  
      // Transforme les données et associe idUser à chaque plat
      const transformedProjects = commandes.flatMap(command => {
        return command.plat.map(plat => ({
          idUser: command.idUser,  // Lier idUser à chaque plat
          title: plat.nom,  // Nom du plat
          progress: {
            percentage: command.estRecu ? 100 : 0,  // Détermine le pourcentage de progression en fonction de estRecu
            color: command.estRecu ? 'success' : 'danger',  // La couleur de la progression (vert ou rouge)
          },
        }));
      });
  
      // Log pour voir si projects contient des duplications
      console.log(transformedProjects);
      
      this.projects = transformedProjects;  // Assigner les données transformées à projects
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
    }
  }
  
  
  
    },
  };
  </script>
  