module.exports = {
  apps: [{
    name: 'dietfit',
    script: 'dist/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    node_args: '--enable-source-maps',
    interpreter: 'node',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};