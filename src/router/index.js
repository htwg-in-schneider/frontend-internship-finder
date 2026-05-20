import { createRouter, createWebHistory } from 'vue-router';
import InternshipCatalog from '@/views/InternshipCatalog.vue';
import InternshipDetail from '@/views/InternshipDetail.vue';
import CreateInternship from '@/views/CreateInternship.vue';
import EditInternship from '@/views/EditInternship.vue';

const routes = [
  { path: '/', component: InternshipCatalog },
  {
    path: '/internship/view/:id',
    name: 'internship',
    component: InternshipDetail
  },
  { path: '/internship/create', component: CreateInternship },
  { path: '/internship/edit/:id', component: EditInternship },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;