const sql = require('mssql');
const sqlConfig = require('../conf/sqlserver_conf');

// tools.js
// ========
module.exports = {
    connectionRamco: async function(query) {
            const pool = new sql.ConnectionPool(sqlConfig.getConfigRamco());
            await pool.connect();
            const request = new sql.Request(pool);
            //console.log(query);
            const result = await request.query(query);
            return result.recordsets[0];   
        
    },
    connectionMirorPlbramco: async function(query) {
        const pool = new sql.ConnectionPool(sqlConfig.getConfigMirorPlb());
        await pool.connect();
        const request = new sql.Request(pool);
        //console.log(query);
        const result = await request.query(query);
        return result.recordsets[0];
    },
    connectionPlbramco: async function(query) {
        //query = "select top 1 * from warehouse";
        const pool = new sql.ConnectionPool(sqlConfig.getConfigPlbramco());
        await pool.connect();   
        const request = new sql.Request(pool);
        const result = await request.query(query);
        return result.recordsets[0];
    }
};
  