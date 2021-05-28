import AuthService from "../../../services/AuthService";

export const handleSignupClick = (event,username, email, password, setIsAccountCreated) => {
    AuthService.Signup(username, email, password)
            .then(function (response) {
                console.log(response.data);
                
                if(response.data["account_created"] == true){
                    setIsAccountCreated(true);
                }
                
            })
};