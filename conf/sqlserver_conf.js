
module.exports = {
  getConfigRamco:function(){
    return {
      user: "rvwadmin",
      password: "password12$",
      database: "scmdb",
      server: "10.144.230.5",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 60000
      },
      options: {
          requestTimeout:3000000,
          encrypt: true, // for azure
          trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    }
  },
  getConfigMirorPlb:function(){
    return {
      user: "ckbitd",
      password: "@dmCKB1234",
      database: "miror_plbramco",
      server: "10.144.250.5",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 60000
      },
      options: {
          requestTimeout:3000000,
          encrypt: true, // for azure
          trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    }
  },
  getConfigPlbramco:function(){
    return {
      user: "ckbitd",
      password: "@dmCKB1234",
      database: "plbramco",
      server: "10.144.250.5",
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 60000
      },
      options: {
          requestTimeout:3000000,
          encrypt: false, // for azure
          trustServerCertificate: false // change to true for local dev / self-signed certs
      }
    }
  }
};
