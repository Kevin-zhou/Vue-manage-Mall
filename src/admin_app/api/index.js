const admin = {
    login: { url: "/sysLogin/login", method: "post" },
    logout: { url: "/sysLogin/logout", method: "POST" }
}

__api.register({"admin":admin});
