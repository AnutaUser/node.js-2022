module.exports = {
    apps : [{
        name   : "app",
        script : "./app.js",
        env_prod: {
            MODE: "prod"
        },
        env_dev: {
            MODE: "dev"
        }
    }]
}