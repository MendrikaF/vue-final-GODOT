<template>
    <div>
      <h1>Modifier : {{ value }}</h1>
      <p>Détails : {{ value }} - Vous pouvez maintenant modifier ce plat ici.</p>
      <!-- Ajoutez ici des champs de formulaire pour modifier les détails du plat -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModificationPage',
    props: ['value'], // Le paramètre 'value' sera passé via la route
  };
  </script>
  
  <style scoped>
  /* Ajoutez du style pour la page de modification si nécessaire */
  </style>
  