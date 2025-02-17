<template>
  <div>
    <button @click="callApi">Call API</button>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <p v-if="response">{{ response }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false, // To show loading state
      error: null, // To store any errors
      response: null, // To store the API response
    };
  },
  methods: {
    async callApi() {
      this.loading = true; // Show loading state
      this.error = null; // Reset error
      this.response = null; // Reset response

      try {
        const result = await axios.get("/api/users");
        this.response = result.data; // Store the response data
      } catch (err) {
        this.error = err.message || "An error occurred"; // Handle errors
      } finally {
        this.loading = false; // Hide loading state
      }
    },
  },
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
