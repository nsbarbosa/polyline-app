<template>
    <v-card v-if="result" class="mt-5">
      <v-card-title>Results</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <strong>Intersection point:</strong>
            <div>
              <strong class="mr-2">x:</strong>{{ result.coordinates.x }}
              <strong class="mr-2 ml-4">y:</strong>{{ result.coordinates.y }}
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Station:</strong>
            <div>{{ result.station }}</div>
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Offset:</strong>
            <div>{{ result.offset }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </template>
  
  <script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { usePolylineStore } from "@/stores/polylineStore";
  
  const store = usePolylineStore();
  const { result } = storeToRefs(store);
  </script>
  