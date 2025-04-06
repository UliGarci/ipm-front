const API_BASE = process.env.VUE_APP_API_BASE_URL;

export const loginService = (username, password) => {
    console.log(`${API_BASE}`);
    
    return fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error(`LoginRequest error: ${data.message}`);
            return {
                success: false,
                message: data.message
            };
        } else{
            console.log(`LoginRequest successful: ${data.message}`);
            localStorage.setItem("t", data.data);
            return {
                success: true,
            };
        }
    })
    .catch(error => {
        console.error(`LoginRequest unexpected error ${error}`);
        return {
            success: false,
            message: 'Error durante la solicitud'
        }
    });
}