//  Маска(правило): 'entrypoint'.
VoxEngine.addEventListener(AppEvents.CallAlerting, e => {
    const conferenceId = e.headers['X-conference-Id'];
    const conf_call = VoxEngine.callConference(`conf_${conferenceId}`, null, null, e.headers);
    VoxEngine.easyProcess(e.call, conf_call);
});
