import hostURL from '../../../services/Location.js';

export async function getUserByLoginService(login) {
    let response = await fetch(`${hostURL}/api/user/${login}`)
    let user = await response.json();
    return user;
}