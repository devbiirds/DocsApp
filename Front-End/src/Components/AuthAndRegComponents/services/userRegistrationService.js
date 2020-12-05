import hostURL from '../../../services/Location.js';

export async function userRegistrationService(login, password) {
    let response = await fetch(`${hostURL}/api/reg`, {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    }).catch((err) => console.log(err));
    return response;
}