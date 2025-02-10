<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <!-- <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"> -->
          <!-- </div> -->
          <div class="card-body">
            <!-- Formulaire -->
            <center><h5 class="">Formulaire d'Enregistrement</h5></center>
            <form @submit.prevent="soumettreFormulaire">
              <div class="form-group">
                <label for="nom">Nom :</label>
                <input type="text" id="nom" class="form-control" v-model="nom" required />
              </div>
              <div class="form-group">
                <label for="nom">Prix :</label>
                <input type="number" id="prix" class="form-control" v-model="prix" required />
              </div>
              <div class="form-group">
              <label for="duration">Durée (mn:s:ms) :</label>
                <input type="text" id="duration" v-model="duree"  placeholder="mn:s:ms" required>
              </div>               
              <!-- Ingrédients (Checkboxes) -->
              <div class="form-group">
                <label>Choisissez les ingrédients à ajouter :</label>
                <div class="ingredients-container">
                  <div v-if="responseData && responseData.length">
                    <div class="form-check" v-for="item in responseData" :key="item.id">
                      <input
                        type="checkbox"
                        id="tomate"
                        class="form-check-input"
                        v-model="ingredients"
                        :value="item.id"
                      />
                      <label class="form-check-label" for="tomate">{{ item.nom }}</label>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary mt-3">Soumettre</button>
            </form>

            <!-- Affichage des données soumises -->
            <div v-if="formulaireSoumis" class="mt-4">
              <h6>Formulaire soumis :</h6>
              <p>Nom : {{ nom }}</p>
              <p>Ingrédients sélectionnés : {{ ingredients.join(', ') }}</p>
            </div>

            <!-- Afficher un message d'erreur, s'il y en a -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "tables",
  
  data() {
    return {
      nom: '',
      ingredients: [], // Tableau pour stocker les ingrédients sélectionnés
      formulaireSoumis: false,
      responseData: null,  // Les données de la réponse
      error: null,
      prix: null,  // En cas d'erreur
      duree: null,
    };
  },
  methods: {
    soumettreFormulaire() {
      this.formulaireSoumis = true;
      console.log("Nom:", this.nom);
      console.log("Ingrédients sélectionnés:", this.ingredients);
      this.formulaireSoumis = true;
      const dataToSend = {
        nom: this.nom, // Assuming `this.nom` is the name of the dish
        ingredients: this.ingredients.map(id => ({ id })), // Assuming `this.selectedIngredient` is an array of IDs
        prix:this.prix,
	      tempsDeCuisson:this.duree
      };

      // Envoyer les données à l'API avec une requête POST
      axios.post('https://godot-back-symfony-webservic-production.up.railway.app/api/plats', dataToSend)
        .then(response => {
          console.log("Données soumises avec succès :", response.data);
          // Gérer la réponse de l'API si nécessaire
        })
        .catch(error => {
          console.error("Erreur lors de la soumission des données :", error);
        });

    },
    fetchData() {
      axios.get('https://godot-back-symfony-webservic-production.up.railway.app/api/ingredients')  // L'URL de l'API Symfony
        .then(response => {
          this.responseData = response.data;  // Assigner les données récupérées
        })
        .catch(error => {
          this.error = error.response ? error.response.data : error.message;
        });
    }
  },
  mounted() {
    this.fetchData();  // Appeler la méthode pour récupérer les données lors du montage
  }
};

</script>

<style scoped>
/* Style pour personnaliser le formulaire si nécessaire */
.card-body {
  max-width: 600px;
  margin: 0 auto;
}
.form-control {
  border: 1px solid #ced4da; /* Couleur de bordure gris clair */
  border-radius: 0.25rem;    /* Arrondi léger */
}

.form-control:focus {
  border-color: #80bdff; /* Bordure bleu clair lors du focus */
  outline: none;         /* Retirer le contour par défaut */
}
/* Style pour afficher les ingrédients en deux par deux */
.ingredients-container {
  display: flex;
  flex-wrap: wrap;   /* Pour que les éléments aillent à la ligne si nécessaire */
  gap: 10px;         /* Espacement entre les éléments */
}

.ingredient-item {
  width: 45%;         /* Chaque élément prendra 45% de la largeur, donc deux éléments par ligne */
  margin-bottom: 10px; /* Espacement entre les lignes */
}

@media (max-width: 768px) {
  .ingredient-item {
    width: 100%; /* Sur les petits écrans, chaque élément prendra toute la largeur */
  }
}

</style>
<!-- soumettreFormulaire() {
  this.formulaireSoumis = true;

  const dataToSend = {
    nom: this.nom,
    ingredient: this.selectedIngredient
  };

  // Envoyer les données à l'API avec une requête POST
  axios.post('https://api.monsite.com/api/endpoint', dataToSend)
    .then(response => {
      console.log("Données soumises avec succès :", response.data);
      // Gérer la réponse de l'API si nécessaire
    })
    .catch(error => {
      console.error("Erreur lors de la soumission des données :", error);
    });
} -->
