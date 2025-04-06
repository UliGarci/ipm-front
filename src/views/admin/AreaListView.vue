<template>
  <div>
    <div class="header">
      <h1>Lista de departamentos</h1>
    </div>

    <div class="containerTop">
      <div class="inputStyle">
        <b>Buscar Curso</b>
        <div style="display: flex">
          <n-input
            class="input-shadow"
            v-model:value="value"
            type="text"
            placeholder="Nombre del departamento"
          />
          <n-button type="info" class="input-shadow">
            <Icon> <Search /> </Icon>
          </n-button>
        </div>
      </div>
      <div class="containerButtonStyle">
        <n-button strong secondary class="button-shadow" icon-placement="right">
          <template #icon>
            <Icon class="icon-spacing" size="15"> <ArrowDown /></Icon>
            <Icon size="15"> <ArrowUp /></Icon>
          </template>
          ORDENAR A-Z
        </n-button>
      </div>
    </div>

    <div class="containerCardsAreas">
      <div class="headContainerCardsAreas"></div>
      <div class="bodyContainerCardsAreas">
        <!-- Mostrar los departamentos -->
        <CardAreaComponent
          v-for="area in data"
          :key="area.idDepartment"
          :nombre="area.name"
          @click="navigateToDepartment(area.idDepartment)"
        />

        <n-empty v-if="data.length === 0" description="Departamentos no encontrados" />
      </div>
      <div class="footerContainerCardsAreas">
        <n-pagination
          :theme-overrides="{
            itemTextColorActive: 'white',
            itemColorActive: '#008cb9',
            itemBorderActive: 'none',
            itemTextColorHover: 'white',
          }"
          v-model:page="page"
          :page-count="10"
          size="small"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@vicons/utils";
import { Search, ArrowUp, ArrowDown } from "@vicons/ionicons5";
import CardAreaComponent from "@/components/admin/CardAreaComponent.vue";
import { getAllDepartments } from "@/services/departmentsService.js";

export default defineComponent({
  name: "AreaListView",
  components: { CardAreaComponent, Icon, Search, ArrowUp, ArrowDown },
  setup() {
    const data = ref([]);
    const router = useRouter();

    const fetchDepartments = async () => {
      try {
        const response = await getAllDepartments();
        data.value = response || [];
      } catch (error) {
        console.error("Error al obtener departamentos:", error);
      }
    };

    const navigateToDepartment = (id) => {
      router.push(`/admin/departments/${id}`);
    };

    onMounted(fetchDepartments);

    return {
      data,
      navigateToDepartment,
    };
  },
});
</script>

<style>
.header {
  margin-top: 20px;
  margin-left: 5%;
  align-items: center;
  justify-content: center;
  display: flex;
}

.containerTop {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.inputStyle {
  flex: 2;
  margin-left: 5%;
  margin-right: 5%;
  min-width: 250px;
}

.containerButtonStyle {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-top: 15px;
}

.input-shadow {
  box-shadow: 2px 3px 3px 2px rgba(0, 0, 0, 0.1);
}

.button-shadow {
  box-shadow: 2px 3px 3px 2px rgba(0, 0, 0, 0.2);
}

.icon-spacing {
  margin-left: 10px;
}

.containerCardsAreas {
  margin: 4% 5% 0 5%;
  width: 90%;
  max-width: 100%;
  overflow: hidden;
}

.headContainerCardsAreas {
  height: 20px;
  background-color: #008cb9;
  border-radius: 4px 4px 0 0;
}

.footerContainerCardsAreas {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #008cb9;
  border-radius: 0 0 4px 4px;
  
}

.bodyContainerCardsAreas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 15px;
  overflow: hidden;
  max-width: 100%;
}
</style>
