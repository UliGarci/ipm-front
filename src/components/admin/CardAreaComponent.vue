<template>
  <div>
    <n-button class="cardStyle" :theme-overrides="{textColorTextHover: 'black'}" strong text @click="mensaje">
      <div class="cardAreaStyle">
        <div class="blue-bar"></div> <!-- Barra azul -->
        <div class="text-content">
          {{ nombre }}
        </div>
      </div>
    </n-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    nombre: String,
  },
  setup(props) {
    const mensaje = () => {
      console.log(`Nombre: ${props.nombre}`);
    };
    return { mensaje, props };
  },
});
</script>

<style>

.cardAreaStyle {
  display: flex;
  align-items: center;
  max-width: 100%;
  width: 300px;
  margin: 5px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  transition: transform 0.2s ease-in-out;
}

.cardAreaStyle:hover {
  transform: scale(1.05);
}

.blue-bar {
  width: 10px;
  height: 70px;
  background-color: blue;
  border-radius: 4px 0 0 4px;
  margin-right: 10px;
}

.text-content {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  white-space: normal;
  max-height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
