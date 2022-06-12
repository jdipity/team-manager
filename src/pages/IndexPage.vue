<template>
  <q-page class="flex flex-center">
    <q-btn @click="store.getDocument('cities', 'LA')">TEST</q-btn>
    <p>{{ store.city }}</p>
    <UserRegister />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "../stores/firestore";
import UserRegister from "src/components/UserRegister.vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      myFunction: () => console.log("Test"),
    };
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  components: { UserRegister },
});
</script>
