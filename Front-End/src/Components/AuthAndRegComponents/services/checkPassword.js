export function checkPassword(password, passwordConfirmation) {
    let regex = /^[a-zA-Z0-9]+$/;
    let checkInfo;
    if (password.length < 4 || password.length > 12) {
        checkInfo = {
            isPasswordValid: false,
            authPasswordError: 'Password must be more than 4 and less than 12 symbols',
            registerPasswordError: 'Password must be more than 4 and less than 12 symbols'
        }
        return checkInfo;
    }
    if (!regex.test(password)) {
        checkInfo = {
            isPasswordValid: false,
            authPasswordError: 'Password must be with correct symbols (a-Z and 0-9)',
            registerPasswordError: 'Password must be with correct symbols (a-Z and 0-9)'
        }
        return checkInfo;
    }
    if (passwordConfirmation) {
        if (password !== passwordConfirmation) {
            checkInfo = {
                isPasswordValid: false,
                registerPasswordError: 'Passwords do not match'
            }
            return checkInfo;
        }
    }
    checkInfo = {
        isPasswordValid: true,
        authPasswordError: '',
        registerPasswordError: ''
    }
    return checkInfo;
}