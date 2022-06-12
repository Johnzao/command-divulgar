const { connect } = require("mongoose");
const config = require("../config/config.json");

module.exports = {
    connectToDatabase() {
        let startedAt = performance.now();
        connect(config.connect_string).then(() => {
            let finishedAt = performance.now();
            let time = (parseFloat(finishedAt - startedAt).toFixed(2)).replace(".00", "");
            console.log(`\x1b[36m✔ [Database] Conexão com a database efetuada em ${time}ms \x1b[0m`)
        }).catch(() => {
            console.log(`\x1b[91m[Database] Ocorreu um erro ao conectar-se com a database \x1b[0m`);
        });
    },
};