<template>
  <v-card title="Polyline station & offset calculator">
    <v-card-item>
      <v-form ref="form" v-model="isValid" @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="12" sm="4">
            <v-file-input
              v-model="polylineFile"
              label="Choose an ASCII file"
              accept=".txt,.csv"
              :rules="[fileRule]"
              required
              clearable
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="xCoordinate"
              label="X coordinate (easting)"
              type="number"
              :rules="[requiredRule, numberRule]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="yCoordinate"
              label="Y coordinate (northing)"
              type="number"
              :rules="[requiredRule, numberRule]"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            color="primary"
            :loading="loading"
            variant="flat"
            class="mr-2 mb-2"
          >
            Calculate
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-item>
  </v-card>
</template>
  
<script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { usePolylineStore } from "@/stores/polylineStore";
  
  const store = usePolylineStore();
  const { loading, polylineFile, xCoordinate, yCoordinate } = storeToRefs(store);
  
  const form = ref();
  const isValid = ref(false);
  
  const requiredRule = (v: any) => !!v || "This field is required";
  const numberRule = (v: any) =>
    !isNaN(parseFloat(v)) || "Must be a valid number";
  const fileRule = (file: any) => {
    if (!file) return "A file is required";

    const validTypes = ["text/csv"];
    if (validTypes.includes(file[0]?.type)) return true;

    return "File must be a .csv";
  };
  
  const onSubmit = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
      store.processPolylineFile();
    } else {
      console.error("Form is invalid");
    }
  };
</script>
  