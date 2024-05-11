<script setup lang="ts">
import { StudentsService, type IStudent } from '@/services/StudentsServices'
import { onMounted, reactive, ref } from 'vue'

const search = ref('')

let items = reactive<IStudent[]>([])

const headers = [
  { text: 'Registro acadêmico', value: 'ra' },
  { text: 'Nome', value: 'name' },
  { text: 'CPF', value: 'cpf' },
  { text: 'Ações', value: 'actions' }
]

const editItem = (itemId: number) => {}
const deleteItem = (itemId: number) => {}

const searchStudents = () => {
  console.log(items)
}

onMounted(() => {
  StudentsService.getAll().then((response) => {
    if (response) {
      items.splice(0, items.length, ...response)
    }
  })
})
</script>

<template>
  <v-container class="elevation-3 mt-8 w-75">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="Digite sua busca"
            variant="outlined"
            density="compact"
            v-model="search"
          />
        </v-col>
        <v-col cols="3">
          <v-btn color="secondary" @click="searchStudents"> Pesquisar </v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn color="primary"> Cadastrar Aluno </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table :items="items" :headers="headers">
      <template v-slot:item.actions="{ item: { id } }">
        <v-icon small class="mr-2" @click="editItem(id)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(id)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <v-container>Não existem alunos cadastrados!</v-container>
      </template>
    </v-data-table>
  </v-container>
</template>
