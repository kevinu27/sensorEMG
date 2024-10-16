<template>
    <header>
      <nav class="navbar">
        <h1 class="logo">Sensor EMG</h1>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">registros guardados</a></li>
          <li><a href="#">login/logout</a></li>
        </ul>
        <button class="menu-toggle" @click="toggleMenu">
          <span v-if="isMenuOpen">Close</span>
          <span v-else>Menu</span>
        </button>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
    data() {
      return {
        isMenuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Basic styling */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #333;
    color: #fff;
  }
  
  .logo {
    font-size: 1.5rem;
  }
  
  .nav-links {
    display: flex;
    list-style: none;
  }
  
  .nav-links li {
    margin: 0 1rem;
  }
  
  .nav-links a {
    text-decoration: none;
    color: #fff;
  }
  
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    color: #fff;
    font-size: 1rem;
  }
  
  /* Mobile menu */
  .mobile-menu {
    background: #333;
    padding: 1rem;
  }
  
  .mobile-menu ul {
    list-style: none;
    padding: 0;
  }
  
  .mobile-menu a {
    display: block;
    color: #fff;
    text-decoration: none;
    padding: 0.5rem 0;
  }
  

  </style>
  