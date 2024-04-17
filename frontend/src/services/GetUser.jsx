function getToken() {
    return localStorage.getItem('token');
}

export default function getUser() {
    const token = getToken();
    if (!token) return null;

    try {
        const base64Url = token.split('.')[1]; 
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
        const payload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const user = JSON.parse(payload);
        console.log(user)
        return user; 
    } catch (error) {
        console.error("Failed to decode or parse the token", error);
        return null;
    }
}
