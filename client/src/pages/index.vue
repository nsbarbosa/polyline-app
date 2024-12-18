<template>
  <v-app>
    <v-main>
      <v-container>
        <Form />
        <ResultCard />
        <v-card class="mt-5">
        <PolylinePlot />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Form from "@/components/Form.vue";
import ResultCard from "@/components/ResultCard.vue";
import PolylinePlot from "@/components/PolylinePlot.vue";

</script>
