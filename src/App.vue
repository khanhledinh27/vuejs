<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  
  <!-- <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <RouterLink class="navbar-brand" to="/">PLT Solutions</RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/" v-slot="{ isActive }">
                  <span :class="{ active: isActive }">Home</span>
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/about" v-slot="{ isActive }">
                  <span :class="{ active: isActive }">User Management</span>
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/lectures" v-slot="{ isActive }">
                  <span :class="{ active: isActive }">Lecture Management</span>
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/login" v-slot="{ isActive }">
                  <span :class="{ active: isActive }">Login</span>
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/register" v-slot="{ isActive }">
                  <span :class="{ active: isActive }">Register</span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header> -->

 <router-view></router-view>
</template>

<style scoped>
.nav-link .active {
  font-weight: bold;
  color: #fff; /* Adjust the color as needed */
}
</style>