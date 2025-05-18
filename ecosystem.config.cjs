module.exports = {
  apps: [
    {
      name: "w1admin", 
      script: "node_modules/.bin/next", 
      args: "start", 
      cwd: "/home/smartbet/aurabet/admin", 
      instances: "max", 
      exec_mode: "cluster", 
      watch: false, 
      env: {
        NODE_ENV: "production", 
      },
    },
  ],
};
