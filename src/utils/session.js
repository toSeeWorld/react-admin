const token = "adminToken"
 export function setToken(value) {
    sessionStorage.setItem(token,value)
}
export function getToken() {
    return sessionStorage.getItem(token)
}