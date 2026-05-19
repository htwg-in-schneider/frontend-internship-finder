<script setup>
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-custom sticky-top">
        <div class="container">
           <router-link class="navbar-brand" to="/">
            <img src="/internship-finder-logo.png" alt="Internship Finder Logo" height="55">
            </router-link>

            <!-- Suchfeld in der Mitte (desktop only) -->
            <form class="d-none d-lg-flex mx-auto" style="width: 40%;" role="search">
                <input class="form-control search-pill" type="search" placeholder="search" aria-label="Suche">
            </form>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#">Sign up</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
</style>