'use strict';

module.exports = function ConferenceRecordController(req, res, next) {
    const headers = req.headers;

    if (headers[`X-Conference-Record`]) {
        const conferenceId = headers[`X-Conference-Id`];
        let {
            conferenceRecordUrl,
            conferenceRecordDuration,
            conferenceRecordCost,
            conferenceRecordErr
        } = req.body;

        // --> отправляем запись на backend

        res.end();
    } else {
        // --> пишем ошибку в лог о неправильном вызове и от куда он был сделан
        // --> дале можем сразу отдать ошибку и не вызывать next(), так как мы знаем что других обработчиков для
        //     данного урла нет

        next();
    }
};
