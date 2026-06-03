import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from '@auth0/auth0-vue'
import InternshipCatalog from '@/views/InternshipCatalog.vue';
import InternshipDetail from '@/views/InternshipDetail.vue';
import CreateInternship from '@/views/CreateInternship.vue';
import EditInternship from '@/views/EditInternship.vue';
import Profile from '@/views/Profile.vue';

const routes = [
  { path: '/', component: InternshipCatalog },
  {
    path: '/internship/view/:id',
    name: 'internship',
    component: InternshipDetail
  },
  {
    path: '/internship/create',
    component: CreateInternship,
    beforeEnter: authGuard
  },
  {
    path: '/internship/edit/:id',
    component: EditInternship,
    beforeEnter: authGuard
  },
  {
    path: '/profile',
    component: Profile,
    beforeEnter: authGuard
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;