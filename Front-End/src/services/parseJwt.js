import atob from 'atob';
import { getDateTime } from './getDateTime.js';

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    jsonPayload = JSON.parse(jsonPayload);
    let date = getDateTime();
    if (jsonPayload.exp === undefined) {
        return false;
    }
    let dieDate = new Date(jsonPayload.exp * 1000);
    if (date > dieDate) {
        return false;
    } else {
        return true;
    }
}