module.exports = {
    apps: [{
        name: "notification-server-idfi",
        script: "api/server.js",
        watch: true,
        ignore_watch: ["node_modules"],
        instance: 2,
        exec_mode: "cluster",
        env_production: {
            NODE_ENV: "production"
        },
        env_development: {
            NODE_ENV: "development"
        }
    }]
}