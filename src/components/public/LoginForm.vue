<template>
  <n-form :model="localForm" :rules="rules" ref="formRef">
    <n-space vertical>
      <n-form-item label="Clave de acceso" path="username">
        <n-input
          large
          :value="localForm.username"
          @update:value="(value) => handleInputChange('username', value)"
          placeholder="Ingresa tu clave de acceso"
          clearable
        />
      </n-form-item>
      <n-form-item label="Contraseña" path="password">
        <n-input
          type="password"
          :value="localForm.password"
          @update:value="(value) => handleInputChange('password', value)"
          placeholder="Ingresa tu contraseña"
          show-password-on="click"
          :maxlength="8"
          clearable
        />
      </n-form-item>
      <n-form-item>
        <n-button
          class="full-button"
          color="#0D5A79"
          @click="handleSubmit"
          text-color="#ffffff"
          bordered
        >
          Iniciar Sesión
        </n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script>
import { ref, watch } from "vue";
import { NInput, NButton, NSpace, NForm, NFormItem } from "naive-ui";

export default {
  components: {
    NInput,
    NButton,
    NSpace,
    NForm,
    NFormItem,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:form", "submit"],
  setup(props, { emit }) {
    const formRef = ref(null);

    // Inicializa localForm con una copia de props.form
    const localForm = ref({ ...props.form });

    // Watcher para actualizar localForm cuando props.form cambie
    watch(
      () => props.form,
      (newForm) => {
        localForm.value = { ...newForm };
      },
      { deep: true }
    );

    // Función para manejar cambios en los inputs
    const handleInputChange = (field, value) => {
      localForm.value[field] = value;
      emit("update:form", localForm.value);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
      try {
        await formRef.value.validate();
        emit("submit", localForm.value);
      } catch (errors) {
        console.log("Formulario no válido. Por favor, revisa los campos.");
      }
    };

    return {
      formRef,
      localForm,
      handleInputChange,
      handleSubmit,
    };
  },
};
</script>