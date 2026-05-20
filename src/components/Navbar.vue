<script setup>
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-custom sticky-top">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img src="/internship-finder-logo.png" alt="Internship Finder Logo" height="55">
            </router-link>

            <!-- Bereich-Navigation (10b) -->
            <ul class="navbar-nav flex-row flex-wrap gap-2 me-auto ms-3">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ path: '/' }">Alle</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ path: '/', query: { category: 'SOFTWARE_DEVELOPMENT' } }">Softwareentwicklung</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ path: '/', query: { category: 'SYSTEM_ENGINEERING' } }">Systemengineering</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ path: '/', query: { category: 'DATA_ANALYST' } }">Data Analyst</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ path: '/', query: { category: 'CYBER_SECURITY' } }">Cyber Security</router-link>
                </li>
            </ul>

            <!-- Profil-Dropdown - immer sichtbar -->
            <div class="dropdown">
                <a class="d-flex align-items-center text-decoration-none" href="#" id="profileDropdown"
                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="profile-avatar">
                        <i class="bi bi-person-fill"></i>
                    </span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <li><a class="dropdown-item" href="#">Anmelden</a></li>
                    <li><a class="dropdown-item" href="#">Registrieren</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Mein Profil</a></li>
                    <li><a class="dropdown-item" href="#">Meine Bewerbungen</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.profile-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: rgba(46, 105, 163, 0.25);
    border: 1px solid rgba(45, 81, 118, 0.3);
    color: #0c2744;
    font-size: 1.3rem;
    transition: 0.2s;
}

.profile-avatar:hover {
    background-color: rgba(30, 184, 204, 0.35);
}
</style>