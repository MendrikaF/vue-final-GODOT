<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <h2 class="text-center mb-4">Statistiques des ventes par jour</h2>

        <!-- Nouvelle section pour les statistiques supplémentaires -->
        <div class="row mt-4">
          <div class="col-lg-6 col-md-6 mt-4">
            <div class="card p-3 shadow-sm">
              <h5 class="text-primary">Montant total des ventes</h5>
              <p class="mb-0">{{ totalPrice }} Ar</p>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 mt-4">
            <div class="card p-3 shadow-sm">
              <h5 class="text-primary">Plat le plus commandé</h5>
              <p class="mb-0">{{ mostOrderedPlat }}</p>
            </div>
          </div>
        </div>

        <!-- Section existante pour les ventes par jour -->
        <div class="row mt-4">
          <div class="col-lg-4 col-md-6 mt-4" v-if="loading">
            <p class="text-center">Chargement des données...</p>
          </div>
          <div v-else class="col-lg-4 col-md-6 mt-4">
            <div class="card p-3 shadow-sm" v-for="(item, index) in filteredSalesByDay" :key="index">
              <h5 class="text-primary">{{ daysOfWeek[index] }}</h5>
              <p class="mb-0">{{ item }} ventes</p>
            </div>
          </div>
          <div v-if="error" class="col-lg-12 text-danger text-center mt-3">{{ error }}</div>

          <!-- Graphique des ventes -->
          <div v-else class="col-lg-8 col-md-12 mt-4 d-flex justify-content-center">
            <canvas id="salesChart" class="chart-size"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  name: "Statistique",
  data() {
    return {
      recipes: [],
      loading: false,
      error: null,
      daysOfWeek: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      totalPrice: 0, // Total des prix
      mostOrderedPlat: null, // Plat le plus commandé
    };
  },
  computed: {
    // Calculer les ventes par jour en filtrant les valeurs non premiers
    filteredSalesByDay() {
      const sales = Array(7).fill(0);
      this.recipes.forEach(item => {
        if (item.estRecu) {
          const date = new Date(item.dateUpdate);
          if (!isNaN(date.getTime())) {
            const dayOfWeek = date.getUTCDay();
            sales[dayOfWeek] += 1;
          }
        }
      });

      // Filtrer les valeurs pour ne garder que les nombres premiers
      return sales.map(this.filterPrimeNumbers);
    }
  },
  methods: {
    // Fonction pour vérifier si un nombre est premier
    isPrime(num) {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    },
    // Filtrer les valeurs non premiers
    filterPrimeNumbers(value) {
      // Si la valeur n'est pas un nombre premier, la mettre à zéro
      return this.isPrime(value) ? value : 0;
    },

    async fetchRecipes() {
  this.loading = true;
  this.error = null;
  try {
    const response = await axios.get('https://godot-back-symfony-webservic-production.up.railway.app/api/commandes');
    this.recipes = response.data;

    // Calculer le total des prix
    this.totalPrice = this.recipes.reduce((total, recipe) => {
      if (recipe.estRecu) {
        return total + recipe.plat.reduce((sum, plat) => sum + parseInt(plat.prix), 0);
      }
      return total;
    }, 0);

    // Trouver le plat le plus commandé
    const platCounts = {};
    this.recipes.forEach(recipe => {
      if (recipe.estRecu) {
        recipe.plat.forEach(plat => {
          platCounts[plat.nom] = (platCounts[plat.nom] || 0) + 1;
        });
      }
    });

    const mostOrdered = Object.keys(platCounts).reduce((a, b) => platCounts[a] > platCounts[b] ? a : b, null);
    this.mostOrderedPlat = mostOrdered;

    // Créer le graphique des ventes
    this.createSalesChart();
  } catch (error) {
    this.error = 'Erreur lors de la récupération des données.';
  } finally {
    this.loading = false;
  }
},
    createSalesChart() {
      const ctx = document.getElementById('salesChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.daysOfWeek,
          datasets: [{
            label: 'Ventes par jour',
            data: this.filteredSalesByDay,
            backgroundColor: '#FF66B2', // Couleur rose pour les barres
            borderColor: '#FF66B2', // Bordure rose des barres
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true, // Assure que l'axe Y commence à zéro
              ticks: {
                stepSize: 1, // Force l'intervalle entre chaque valeur à 1
                precision: 0 // Enlève les décimales pour afficher uniquement des entiers
              }
            }
          }
        }
      });
    }
  },
  mounted() {
    this.fetchRecipes();
  }
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  background: #f8f9fa;
  transition: transform 0.3s ease-in-out;
}
.card:hover {
  transform: scale(1.05);
}
.text-primary {
  color: #007bff;
}

.chart-size {
  max-width: 100%; /* Empêche le graphique de dépasser */
  max-height: 400px; /* Hauteur réduite */
  width: 80%; /* Taille dynamique pour le rendre plus petit */
  margin-left: auto;
  margin-right: auto;
}
</style>
