module.exports = {
    apps: [
        {
            name: 'Netchina',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            args: 'start',
            watch: true,
            autorestart: true,
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
}