<template>
  <div>
    <!-- Cabecera -->
    <div class="header">
      <div>
        <n-breadcrumb>
          <n-breadcrumb-item>
            <router-link to="/admin/empleados"> <Icon><People/></Icon> Empleados</router-link>
          </n-breadcrumb-item>
          <n-breadcrumb-item>Editar datos</n-breadcrumb-item>
        </n-breadcrumb>
      </div>
      <div>
        <p style="color: #0D5A79;font-size: 40px;">Editar Empleado</p>
      </div>
    </div>

    <!-- Cuerpo -->
    <div class="containerFormUpdateEmployee">
      <n-form ref="formRef" :model="formValue" :rules="rules" label-placement="top">
        <n-form-item path="roles" label="Rol">
          <n-select
            v-model:value="formValue.roles"
            placeholder="Selecciona rol"
            :options="optionsRol"
          />
        </n-form-item>

        <div class="grid-container">
          <n-form-item path="nombre" label="Nombre(s)">
            <n-input v-model:value="formValue.nombre" placeholder="Ingrese nombre(s)" />
          </n-form-item>
          <n-form-item path="apellidos" label="Apellidos">
            <n-input v-model:value="formValue.apellidos" placeholder="Ingrese apellidos" />
          </n-form-item>
        </div>

        <div class="grid-container">
          <n-form-item path="departamentos" label="Departamentos">
            <n-select
              v-model:value="formValue.departamentos"
              placeholder="Seleccionar departamento"
              :options="optionsDepartment"
            />
          </n-form-item>
          <n-form-item path="puesto" label="Puesto">
            <n-select
              v-model:value="formValue.puesto"
              placeholder="Seleccionar puesto"
              :options="optionsJob"
            />
          </n-form-item>
        </div>

        <div class="grid-container">
          <n-form-item path="codeEmployee" label="Código de empleado">
            <n-input disabled v-model:value="formValue.codigoUsuario" />
          </n-form-item>
          <n-form-item path="email" label="Correo electrónico">
            <n-input v-model:value="formValue.email" placeholder="Ingrese correo electrónico" />
          </n-form-item>
        </div>

        <n-form-item path="firmaEmpleado" label="Firma del empleado">
          <n-upload @change="handleFileUpload" accept=".jpg,.jpeg,.png">
            <n-upload-dragger>
              <n-text>Arrastra tu imagen aquí, o <n-text style="color:#1d8ec6;">haz clic para seleccionar</n-text></n-text>
              <n-p depth="3">Máximo 5 MB</n-p>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>
        <n-form-item style="display:flex; justify-content: center;">
          <n-button type="primary" style="border-radius:10px;" @click="handleValidateClick">Actualizar empleado</n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import {Icon} from '@vicons/utils';
import {People} from "@vicons/ionicons5";

export default defineComponent({

  name:"UpdateuserView",
  components:{Icon,People},
  setup() {
    const handleValidateClick = async () => {
  try {
    await formRef.value?.validate();
    console.log("Formulario válido:", JSON.stringify(formValue.value));
  } catch (errors) {
    return Promise.resolve();
  }
};

    const handleFileUpload = (file) => {
  if (file.file) {
    formValue.value.firmaEmpleado = file.file;
  } else {
    formValue.value.firmaEmpleado = null;
  }
};

const rules = {
  nombre: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return Promise.reject("Nombre es obligatorio");
        } else if (value.length < 3) {
          return new Error("El nombre debe tener al menos 3 caracteres.");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  apellidos: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error("Los apellidos son obligatorios.");
        } else if (value.length < 3) {
          return new Error("Los apellidos deben tener al menos 3 caracteres.");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  roles: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error("El rol es obligatorio.");
        }
        return true;
      },
      trigger: ["change", "blur"],
    },
  ],
  departamentos: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error("El departamento es obligatorio.");
        }
        return true;
      },
      trigger: ["change", "blur"],
    },
  ],
  puesto: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error("El puesto es obligatorio.");
        }
        return true;
      },
      trigger: ["change", "blur"],
    },
  ],
  email: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error("El correo electrónico es obligatorio.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return new Error("Ingrese un correo electrónico válido.");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  firmaEmpleado: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error("La firma del empleado es obligatoria.");
        }
        return true;
      },
      trigger: ["change"],
    },
  ],
};

    const formRef = ref(null);
    const formValue = ref({
      roles: null,
      nombre: "Joana Andrea",
      apellidos: "Quintero Martinez",
      departamentos: null,
      puesto: null,
      codigoUsuario: "23413",
      email: "ejemplo@gmail.com",
      firmaEmpleado: null,
    });

    return {
      handleValidateClick,
      handleFileUpload,
      formRef,
      optionsRol: [
        { label: "Administrador", value: "valor1" },
        { label: "Empleado", value: "valor2" },
      ],
      optionsDepartment: [
        { label: "Laboratorio", value: "valor1" },
        { label: "Almacen", value: "valor2" },
      ],
      optionsJob: [
        { label: "Almacenista", value: "valor1" },
        { label: "Acomodador", value: "valor2" },
      ],
      formValue,
      rules,
    };
  },
});
</script>

<style>
.header {
  padding: 12px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: auto;
}

.header p {
  margin: 0;
  font-weight: bold;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}


.containerFormUpdateEmployee {
  padding: 30px;
  max-width: 100%; 
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
