/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param next {Function}
 * @returns {Promise<void>}
 */
async function log(req, res, next) {
    let requestInfo = {};

    requestInfo.method = req.method;
    requestInfo.url = req.url;
    requestInfo.params = req.params;
    requestInfo.body = req.body;
    requestInfo.contentType = req.headers['content-type'];
    requestInfo.token = req.headers['authorization'];

    console.log(requestInfo);

    next();
}

module.exports = log;
