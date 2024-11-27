<script setup lang="ts">
import { useUsersStore } from '@/stores/useUsersStore';
import { CheckIcon, PencilIcon } from '@heroicons/vue/16/solid';
import { TrashIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

const usersStore = useUsersStore();

const props = defineProps(['user', 'deleteUser']);

const username = ref<string>(props.user.username);

const isEditing = ref(false);

function startEdit() {
	isEditing.value = true;
}

function endEdit() {
	usersStore.updateUser({ ...props.user, username: username.value });
	isEditing.value = false;
}
</script>

<template>
	<div class="user-line">
		<div class="user-email">
			<span>{{ user.email }}</span>
		</div>
		<div class="user-username">
			<input type="text" v-if="isEditing" v-model="username" />
			<span v-else>{{ user.username }}</span>
		</div>
		<div class="user-roles">
			<span>{{ user.role }}</span>
		</div>
		<div class="user-buttons">
			<CheckIcon class="btn btn-green" v-if="isEditing" @click="endEdit">Done</CheckIcon>
			<PencilIcon class="btn btn-blue" v-else @click="startEdit">Edit</PencilIcon>
			<TrashIcon class="btn btn-red" @click="deleteUser(user)">Supprimer</TrashIcon>
		</div>
	</div>
</template>

<style scoped>
.user-line {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: lightgray;
	border: 1px solid gray;
	border-radius: 15px;
	padding: 0.5% 1%;
	font-size: 1.2rem;
}

.user-buttons {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	min-width: 8%;
}

.btn {
	width: 2rem;
	height: 2rem;
	border: none;
	color: white;
	padding: 0.5rem 0.5rem;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 1rem;
	cursor: pointer;
	border-radius: 0.25rem;
	margin-left: auto;
}

.btn-red {
	background-color: red;
}
.btn-red:hover {
	background-color: rgb(255, 98, 98);
}
.btn-green {
	background-color: green;
}
.btn-green:hover {
	background-color: rgb(92, 189, 83);
}
.btn-blue {
	background-color: rgb(56, 119, 255);
}
.btn-blue:hover {
	background-color: rgb(119, 162, 255);
}
</style>
