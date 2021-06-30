var config = {};
config.web = {};

config.web.headless = process.env.HEADLESS = false;
config.web.viewport = process.env.VIEWPORT = {
    width: 1600,
    height: 900,
};
config.web.httpCredentials = process.env.HTTPCredentials = {
    username: 'username',
    password: 'password'
};
config.web.sloMo = process.env.SLOMO || 50;
config.web.networkSubscription = process.env.NETWORK;

module.exports = config;
