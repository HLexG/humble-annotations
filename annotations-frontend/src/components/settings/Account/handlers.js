import AuthService from "../../../services/AuthService";

export const handleSaveClick = (event,username, email, password) => {
    let account = {
        "username": username,
        "email": email
    }
    AuthService.SaveAccount(account)
            .then(function (response) {
                
            })
};