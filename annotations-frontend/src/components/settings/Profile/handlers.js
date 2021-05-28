import AuthService from "../../../services/AuthService";

export const handleSaveClick = (event,username, fullname, auth) => {
    let profile = {
        "username": username,
        "full_name": fullname
    }
    AuthService.SaveProfile(profile)
        .then(function (response) {
            let profile = response.data;
            auth.dispatch({
                type: "PROFILE",
                payload: profile
            })
        })
};