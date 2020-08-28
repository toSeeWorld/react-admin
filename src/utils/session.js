const token = "adminToken"
 export function setToken(value) {
    sessionStorage.setItem(token,value)
}
export function getToken() {
    return sessionStorage.getItem(token)
}
export function setUsername(value) {
    sessionStorage.setItem("username",value);
}
export function getUsername() {
    return sessionStorage.getItem("username");
}