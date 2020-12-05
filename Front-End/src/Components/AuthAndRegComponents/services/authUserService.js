import hostURL from '../../../services/Location.js';

export async function authUserService(login, password) {
    let response = await fetch(`${hostURL}/api/auth`, {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            Login: login,
            Password: password,
            Role: 0
        }),
    })
    return response;
}