<script setup lang="ts">
import AdminUserLine from '@/components/AdminUserLine.vue';
import type { User } from '@/interfaces/User';
import { useUsersStore } from '@/stores/useUsersStore';

const userStore = useUsersStore();

function deleteUser(user: User) {
	userStore.deleteUser(user);
}
</script>

<template>
	User list
	<div v-for="user of userStore.users" v-bind:key="user.email">
		<AdminUserLine :user="user" :delete-user="deleteUser" />
	</div>
</template>

<style scoped></style>
