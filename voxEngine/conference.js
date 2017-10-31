require(Modules.Conference);
require(Modules.Recorder);


let conference;
let conferenceRecordData;
let conferenceRecordUrl;
let conferenceId;
let frontBackURL;

const calls = [];
const recorder = VoxEngine.createRecorder();

recorder.addEventListener(RecorderEvents.Started, e => {
    conferenceRecordUrl = e.url;
    Logger.write(`Conference record URL: ${conferenceRecordUrl}`);
});

recorder.addEventListener(RecorderEvents.Stopped, e  => {
    conferenceRecordData = {
        conferenceRecordUrl,
        conferenceRecordDuration: e.duration,
        conferenceRecordCost: e.cost
    };

    Net.httpRequest('URL', null, {
        headers: [
            `X-conference-Id: ${conferenceId}`,
            `X-conference-record`
        ],
        method: 'POST',
        postData: JSON.stringify(conferenceRecordData),
    });
});

recorder.addEventListener(RecorderEvents.RecorderError, e => {
    conferenceRecord = {
        conferenceRecordUrl,
        conferenceRecordErr: e.error
    };

    Net.httpRequest(frontBackURL, null, {
        headers: [
            `X-conference-Id: ${conferenceId}`,
            `X-conference-record`
        ],
        method: 'POST',
        postData: JSON.stringify(conferenceRecord),
    });
});

VoxEngine.addEventListener(AppEvents.CallAlerting, (e) => {
    const call = e.call;
    const userId = e.headers['X-user-Id'];

    call.addEventListener(CallEvents.Connected, e => {
        VoxEngine.sendMediaBetween(e.call, conference);
        calls.push(e.call);
        Logger.write(`User join ${userId}`);
    });

    call.addEventListener(CallEvents.Disconnected, e => {
        calls.splice(calls.indexOf(e.call), 1);
        Logger.write(`User gone ${userId}`);

        if (calls.length === 0) {
            recorder.stop();
            Logger.write(`Conference stop. ID ${conferenceId}`);
            VoxEngine.terminate();
        }
    });

    call.answer();
});

VoxEngine.addEventListener(AppEvents.Started, () => {
    conference = VoxEngine.createConference();
    conference.sendMediaTo(recorder); //когда начинать запись: вопрос синхронизации аудио и интерфейса
    const data = JSON.parse(VoxEngine.customData());
    conferenceId = data.conferenceId;
    frontBackURL = data.frontBackURL;
    Logger.write(`Conference start. ID ${conferenceId}`);
    checkMoneyOrConnection()
});

VoxEngine.addEventListener(AppEvents.HttpRequest, e => { //входящий запрос по media_session_access_url
    const requestContent = e.content;
    if (requestContent === 'Бабло закончилось') {
        recorder.stop();
        Logger.write(`Conference stop. ID ${conferenceId}`);
        VoxEngine.terminate();
    }
});

function checkMoneyOrConnection() {
    Net.httpRequestAsync(frontBackURL,{
        headers: [
            `X-conference-Id: ${conferenceId}`,
            `X-something-check`]
    })
        .then(responce => {
            let headers = JSON.stringify(responce.headers);
            if (headers.something) {
                recorder.stop();
                Logger.write(`Conference stop. ID ${conferenceId}`);
                VoxEngine.terminate();
            } else {
                setTimeout(checkMoneyOrConnection, 300000)
            }
        })
        .catch(error => {
            Logger.write(`Error: ${error}`);
            setTimeout(checkMoneyOrConnection, 300000)
        })
}
