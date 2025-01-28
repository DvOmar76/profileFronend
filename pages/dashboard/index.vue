<template>
  <div>
    <h1>Welcome to the Protected Page</h1>
    <p>You are logged in and can access this page.</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  async mounted() {
    const token = localStorage.getItem('auth_token'); // Fetch the token from localStorage
    if (!token) {
      // Redirect to login page if token is not found
      this.$router.push('/auth');
    } else {
      try {
        // Optionally, validate the token with the server
        const response = await fetch('http://127.0.0.1:8000/api/validate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        // If token is invalid, redirect to login
        this.$router.push('/auth');
      }
    }
  },
  methods: {
    async logout() {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error('Logout failed:', error);
        }
      }
      // Clear token and redirect to login
      localStorage.removeItem('auth_token');
      this.$router.push('/auth');
    },
  },
};
</script>
