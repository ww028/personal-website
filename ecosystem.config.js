module.exports = {
  apps : [{
    name: "website",
    script: "./server/index.js",

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: "--inline --progress --config build/webpack.dev.conf.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      "PORT": 1005,
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }],

  deploy : {
    production : {
      user : "node",
      host : "212.83.163.1",
      ref  : "origin/master",
      repo : "git@github.com:repo.git",
      path : "/var/www/production",
      "post-deploy" : "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
