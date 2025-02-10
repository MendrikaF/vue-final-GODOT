<template>
  <div>
    <h1>Liste des utilisateurs</h1>
    <!-- <pre>{{ users }}</pre> -->

    <table v-if="users.length > 0">
      <thead>
        <tr>
          <th>UID</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.uid">
          <td>{{ user.uid }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucun utilisateur à afficher.</p>

    <h1>Progression du commande</h1>
    <table v-if="projects.length > 0">
      <thead>
        <tr>
          <th>Utilisateur</th>
          <th>Email</th> <!-- Ajout de la colonne Email -->
          <th>Plat</th>
          <th>Progrès</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.idUser + project.title">
          <td>{{ project.idUser }}</td>
          <td>{{ project.email }}</td> <!-- Affichage de l'email -->
          <td>{{ project.title }}</td>
          <td>
            <span :class="'badge bg-' + project.progress.color">
              {{ project.progress.percentage }}%
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucun projet à afficher.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "etat",
  data() {
    return {
      users: [], // Liste des utilisateurs
      projects: [], // Liste des projets
    };
  },
  mounted() {
    this.fetchUsers(); // Récupère les utilisateurs au chargement du composant
    this.fetchProjects(); // Récupère les projets au chargement du composant
  },
  methods: {
    // Récupération des utilisateurs
    fetchUsers() {
      axios
        .get('http://localhost:3000/users')
        .then((response) => {
          // console.log(response.data); // Pour déboguer la réponse API
          const users = response.data.users || response.data;
          if (Array.isArray(users)) {
            this.users = users.map(user => ({
              uid: user.uid,
              email: user.email,
            }));
          } else {
            console.error('Les données renvoyées ne sont pas un tableau valide.');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
        });
    },

    // Récupération des projets
    async fetchProjects() {
      try {
        const response = await axios.get('https://godot-back-symfony-webservic-production.up.railway.app/api/commandes');
        const commandes = response.data;

        console.log(commandes); // Pour déboguer les données

        const transformedProjects = commandes.flatMap(command => {
          return command.plat.map(plat => {
            // Rechercher l'email correspondant à l'idUser
            const user = this.users.find(user => user.uid === command.idUser);
            return {
              idUser: command.idUser,
              title: plat.nom,
              progress: {
                percentage: command.estRecu ? 100 : 0,
                color: command.estRecu ? 'success' : 'danger',
              },
              email: user ? user.email : 'Non disponible', // Ajouter l'email ou une valeur par défaut
            };
          });
        });

        this.projects = transformedProjects; // Assigner les projets transformés
      } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
      }
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>
