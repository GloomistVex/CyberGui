// api page - /user/login

// Method: POST
// Path: /task

const md5 = require("blueimp-md5")
const password = require('../secret.json').password;
const { getUTCDate } = require('../modules/date.js');

async function Login(data, mysql) {
    return new Promise(async (resolve, reject) => {
        const givenPassword = data.password;

        if (!givenPassword) {
            return reject("Password not given!");
        }

        if (givenPassword.length !== 32) {
            return reject("Illegal Password!");
        }

        if (md5(password) === givenPassword) {
            let session = generateSessionId()
            await mysql.query("UPDATE `sid` SET `session` = ?, `time` = ? WHERE `id` = ?",
                [session, getUTCDate(), 1]);
            return resolve({
                "status": "success",
                "session": session
            });
        } else {
            return reject("Password Wrong!");
        }
    })
}

function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 10);
}

module.exports = Login;