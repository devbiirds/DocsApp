export function checkLogin(login) {
    let regex = /^[a-zA-Z0-9]+$/;
    let checkInfo;
    if (login.length < 4 || login.length > 12) {
        checkInfo = {
            isLoginValid: false,
            isPasswordValid: null,
            authLoginError: 'Login must be more than 4 and less than 12 symbols',
            registerLoginError: 'Login must be more than 4 and less than 12 symbols'
        }
        return checkInfo;
    }
    if (!regex.test(login)) {
        checkInfo = {
            isLoginValid: false,
            isPasswordValid: null,
            authLoginError: 'Login must be with correct symbols (a-Z and 0-9)',
            registerLoginError: 'Login must be with correct symbols (a-Z and 0-9)'
        }
        return checkInfo;
    }
    checkInfo = {
        isLoginValid: true,
        authLoginError: '',
        registerLoginError: ''
    }
    return checkInfo;
}