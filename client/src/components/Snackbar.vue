<template>
  <v-snackbar v-model="store.snackbar.show" transition="scale-transition" location="top"
    :timeout="store.snackbar.timeout ? store.snackbar.timeout : 4000" :color="store.snackbar.color">
    {{ store.snackbar.content }}
    <template #actions>
      <v-btn icon="mdi-close" size="small" color="white" @click="store.snackbar.show = false" />
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
  import { useNotificationStore } from '@/stores/notificationStore';
  
  const store = useNotificationStore();
</script>