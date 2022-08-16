export const endpoints = [
    { petition: "login", type: "POST", url: "/api/users/login" },
    { petition: "register", type: "POST", url: "/api/users/register" },
    { petition: "get", type: "GET", url: "/api/users/:id" },
    { petition: "getAll", type: "GET", url: "/api/users" },
]