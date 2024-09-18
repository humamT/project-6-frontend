export async function fetchCategories() {
    const response = await fetch("http://localhost:5678/api/categories", {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        return false;
    }
    const data = await response.json();
    return data
}
