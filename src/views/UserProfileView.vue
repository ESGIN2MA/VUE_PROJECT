<script setup lang="ts">
import type { User } from '@/interfaces/User';
import { APP_ROUTES } from '@/router/routes';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUsersStore } from '@/stores/useUsersStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

enum ProfileState {
	Lock,
	Edit,
	Save,
}

const router = useRouter();
const userAuthStore = useAuthStore();
const userStore = useUsersStore();

const currentState = ref<ProfileState>(ProfileState.Lock);

// Récupère l'utilisateur courant
const currentUser = userAuthStore.currentUser;

// Redirection si l'utilisateur est null
if (!currentUser) {
	await router.push(APP_ROUTES.LOGIN.path);
}

const editableUser = ref(currentUser as User);

const switchState = (newState: ProfileState) => {
	// Action en fonction du nouvel état
	switch (newState) {
    case ProfileState.Lock: {
      console.log('État: Lock - Lecture seule activée.');
			currentState.value = newState;
			break;
    }
    case ProfileState.Edit: {
      console.log("État: Edit - L'utilisateur peut modifier.");
			currentState.value = newState;
			break;
    }
    case ProfileState.Save: {
      const result = globalThis.confirm('Do you want to save your profile ?');
			if (result) {
				try {
					// Sauvegarder l'utilisateur
					userStore.updateUser(editableUser.value);
					// Verrouiller la modification
					switchState(ProfileState.Lock);
				} catch {
					// déconnecter l'utilisateur
					console.log("Une erreur est survenue lors de la sauvegarde d'un utilisateur");
				}
			} else {
				// Action annulée on est toujours en modification
				console.log('Action annulée !');
			}
			break;
    }
	}
};
</script>

<template v-if="currentUser.value">
	<div class="user-form">
		<h2>Mon Profile</h2>
		<form>
			<div>
				<label for="firstName">Username :</label>
				<input
					type="text"
					id="firstName"
					v-model="editableUser.username"
					:readonly="currentState === ProfileState.Edit"
					:disabled="currentState === ProfileState.Edit"
				/>
			</div>
			<div>
				<label for="email">Email :</label>
				<input type="email" id="email" v-model="editableUser.email" :readonly="true" :disabled="true" />
			</div>

			<!-- Bouton pour basculer l'état des champs -->
			<!-- Boutons pour changer d'état -->
			<button v-if="currentState === ProfileState.Lock" @click="switchState(ProfileState.Edit)">"Modify"</button>
			<button v-if="currentState === ProfileState.Edit" @click="switchState(ProfileState.Save)">"Save"</button>
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
