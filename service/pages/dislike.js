// api page - /user/dislike

// Method: POST
// Path: /task
// Data: { like, dislike }

const { response } = require('../modules/http.js');
const { getUTCDate } = require('../modules/date.js');
// const { isBan, like } = require('../modules/security.js')

async function dislike(data, mysql) {
    return new Promise(async (resolve, reject) => {
        try {
            // check request method
            // if (req.method !== 'POST') return response(req, res, 405, "Error 405: Method Not Allowed");

            const id = data.id;

            // I THINK YOU SHOULD PUT THE SECURITY CODE HERE

            // is this id in `questions` table?
            const inside = await mysql.query("SELECT * FROM `questions` WHERE `id` = ?",
                [data.id]);
            if (inside.length === 0) return reject("Error 404: Not Found");

            // insert to `question` table
            // title, content, time, like, dislike, sensitive, answerid(null)
            const result = await mysql.query(
                "UPDATE `questions` SET `dislike` = `dislike` + 1 WHERE `id` = ?",
                [id]);

            // return
            return resolve({
                "status": "success",
                "questionid": result.insertId
            });
        } catch (err) {
            return reject(err);
        }
    })
}

module.exports = dislike;