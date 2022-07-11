export const dLogin = () => {
    let user = localStorage.getItem("user");

    if (user) {
        return true
    } else {
        return false
    }
}