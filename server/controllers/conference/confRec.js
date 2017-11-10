'use strict';

module.exports = function ConferenceRecordController(req, res, next) {
    const headers = req.headers;
    if (headers[`X-conference-record`]) {
        const conferenceId = headers[`X-conference-Id`];
        let {conferenceRecordUrl, conferenceRecordDuration, conferenceRecordCost, conferenceRecordErr} = req.body;
        // --> отправляем запись на backend
        res.end();
    } else {
        next();
    }
};
