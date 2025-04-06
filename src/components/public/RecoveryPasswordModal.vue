<template>
  <n-modal
    :show="showModal"
    preset="card"
    title="Recuperar Contraseña"
    @update:show="$emit('update:showModal', $event)"
    style="width: 444px"
  >
    <p style="margin-bottom: 2rem">
      Solicita a un administrador tu contraseña de activación.
    </p>
    <n-form-item
      label="Código de acceso"
      :rule="rule.username"
      :validation-status="validationStatus"
    >
      <n-input v-model:value="username" />
    </n-form-item>
    <n-button
      class="full-button"
      color="#0D5A79"
      text-color="#ffffff"
      bordered
      @click="handleRequestPasswordChange"
    >
      Solicitar cambio de contraseña
    </n-button>
  </n-modal>
</template>

<script>
import { NModal, NFormItem, NInput, NButton } from "naive-ui";
import { ref } from "vue";

export default {
  components: {
    NModal,
    NFormItem,
    NInput,
    NButton,
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:showModal", "requestPasswordChange"],
  setup(props, { emit }) {
    const rule = ref({
      username: [
        { required: true, message: "Campo requerido", trigger: "blur" },
      ],
    });

    const username = ref("");
    const validationStatus = ref(null);

    const handleRequestPasswordChange = () => {
      if (!username.value) {
        validationStatus.value = "error";
      } else {
        validationStatus.value = null;
        emit("requestPasswordChange", username.value);
        emit("update:showModal", false);
      }
    };

    return {
      rule,
      username,
      validationStatus,
      handleRequestPasswordChange,
    };
  },
};
</script>
