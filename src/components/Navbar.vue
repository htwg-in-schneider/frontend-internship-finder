<script setup>
</script>

<template>
    <nav class="navbar navbar-custom sticky-top">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img src="/internship-finder-logo.png" alt="Internship Finder Logo" height="55">
            </router-link>

            <!-- Suchfeld in der Mitte (ab medium screens sichtbar) -->
            <form class="d-none d-md-flex mx-auto" style="width: 40%;" role="search">
                <input class="form-control search-pill" type="search" placeholder="search" aria-label="Suche">
            </form>

            <!-- Profil-Dropdown - immer sichtbar -->
            <div class="dropdown ms-auto">
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