const API_BASE = process.env.VUE_APP_API_BASE_URL;

export const getAllDepartments = async () => {
    try {
        console.log(`Llamando API: ${API_BASE}/department/all`);

        const response = await fetch(`${API_BASE}/department/all`);
        const result = await response.json();

        console.log("Respuesta de la API:", result.data);

        if (result.error) {
            console.error(`Error: ${result.message}`);
            return [];
        }

        return result.data || [];
    } catch (error) {
        console.error("Error al obtener departamentos:", error);
        return [];
    }
};
