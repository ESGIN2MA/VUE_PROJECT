<script setup lang="ts">
import { ref } from 'vue';

// Sauvegarde en local
const user = ref({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
});

const isReadOnly = ref(true);
function changeState() {
    isReadOnly.value = !isReadOnly.value;
}
</script>

<template>
  <div class="user-form">
    <h2>Mon Profile</h2>
    <form>
      <div>
        <label for="firstName">Prénom :</label>
        <input
          type="text"
          id="firstName"
          v-model="user.firstName"
          :readonly="isReadOnly"
          :disabled="isReadOnly"
        />
      </div>

      <div>
        <label for="lastName">Nom :</label>
        <input
          type="text"
          id="lastName"
          v-model="user.lastName"
          :readonly="isReadOnly"
          :disabled="isReadOnly"
        />
      </div>
      <div>
        <label for="email">Email :</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          :readonly="isReadOnly"
          :disabled="isReadOnly"
        />
      </div>

      <!-- Bouton pour basculer l'état des champs -->
      <button type="button" @click="changeState()">
        {{ isReadOnly ? 'Modifier mon profile' : 'Sauvegarder' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.user-form {
  max-width: 400px;
  margin: 20px auto;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
</style>
