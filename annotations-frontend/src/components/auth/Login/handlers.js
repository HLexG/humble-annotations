import AuthService from "../../../services/AuthService";

export const handleLoginClick = (event,username, password, auth, setIsAuthenticated) => {
    AuthService.Login(username, password)
            .then(function (response) {
                console.log(response.data);
                //localStorage.setItem("auth", JSON.stringify(response.data));
                auth.dispatch({
                    type: "LOGIN",
                    payload: response.data
                })

                // Set authenticated flag
                setIsAuthenticated(true);

                // Get User Profile
                return AuthService.GetProfile()
            })
            .then(function (response) {
                let profile = response.data;
                auth.dispatch({
                    type: "PROFILE",
                    payload: profile
                })
            })
};