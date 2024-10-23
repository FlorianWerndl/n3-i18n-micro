<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="">
    Campsite ID: {{ route.params.identifier }}
  </div>
</template>
