export async function login(email, password) {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    if (!response.ok) {
        return false;
    }
    const data = await response.json();
    localStorage.setItem("token", data.token)
    return true
}

export function logout() {
    localStorage.removeItem("token")
}