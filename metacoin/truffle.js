module.exports = {
    networks: {
        truffle: {
            host: '127.0.0.1',
            port: 9545,
            network_id: '*' // Match any network id
        },
        development: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*' // Match any network id
        }
    }
}

