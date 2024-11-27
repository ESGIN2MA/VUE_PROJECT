<script setup lang="ts">
import type { User } from '@/interfaces/User';
import { useUsersStore } from '@/stores/useUsersStore';
import { TrashIcon } from '@heroicons/vue/24/solid';

const userStore = useUsersStore();

function deleteUser(user : User){
    const index = userStore.users.indexOf(user)
    if (index === -1) {return;}
    userStore.users.splice(index, 1);
}

</script>

<template>
    User list
    <div v-for="user of userStore.users" v-bind:key="user.email">
        <div class="user-line">
            <div class="user-username">
                {{ user.username }}
            </div>
            <div class="user-email">
                {{ user.email }}
            </div>
            <div class="user-password">
                {{ user.password }}
            </div>
            <div class="user-roles">
                {{ user.role }}
            </div>
            <div class="user-buttons">
                <!--<CheckIcon class="btn btn-green" v-if="editingUser === undefined" @click="doneWith(user.email)">Edit</CheckIcon>
                <PencilIcon class="btn btn-blue" v-if="editingUser === undefined" @click="editUser(user)">Edit</PencilIcon>-->
                <TrashIcon class="btn btn-red" @click="deleteUser(user)">Supprimer</TrashIcon>
            </div>
        </div>
    </div>
</template>

<style scoped>
.user-line{
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

.user-buttons{
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

.btn-red{
    background-color: red;
}
.btn-red:hover{
    background-color: rgb(255, 98, 98);
}
.btn-green{
    background-color: green;
}
.btn-green:hover{
    background-color: rgb(92, 189, 83);
}
.btn-blue{
    background-color: rgb(56, 119, 255);
}
.btn-blue:hover{
    background-color: rgb(119, 162, 255);
}
</style>