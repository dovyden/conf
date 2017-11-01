export default function authReducer(state = {id: null}, payload) {
    switch(payload.type) {
        case 'NAVIGATE_TO':
            console.log(payload);
            return {...state, id: payload.id};
        default:
            return state;
    }
}
