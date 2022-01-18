export default {
    login: ({ username, password }) => {
        if (username.length > 3 && password.length > 3) {
            localStorage.setItem("username", username+password);
            return Promise.resolve();     
        } else {
            return Promise.reject();
        };
    },
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem("username") ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
};