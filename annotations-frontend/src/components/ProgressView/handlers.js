import DataServices from "../../services/DataServices";

export const handlePullMentions = async () => {
    DataServices.GetMentions().then(function (response){
        let mentions = response.data;
        
        const jsonD = response.data;
        //setMentions(jsonD);

    })};

/*
    {
    "type": "service_account",
        "project_id": "hlexg-63f51",
        "private_key_id": "31be6ac6ffbe1d82c881682236134d979075a8b1",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCbrDYH5RI2sW9z\nHORorVXVA1Rh/VJyOJR7UN0LpAasE0i8dYaS2Oi0epSyFUXoONgjmzca/wqLL4yi\nbb9Lh++M+Z4RAyWHiIlcljrf44/I9Mb/qJHYZ8Bgy+8FLFY+zr4pTr2RBkfYNKma\nmwjlRSRXuyjIzQ4seBIHhiA5c1J6FXp7sfzj8w8ykb+ITCPUR2iBnNOoDd9VMbkg\npqLvWy8WdiovHiR7wyjQvaANa96WEcuSAR2SylWwlNQk8sSGrGSgvym0SNMlBO1A\nTurjG1zWsaKxmpnFMNsavBZsmrggMxTBMx+EftdGGs9m6fGQuqLsuqi9mbsBEPQe\n1JcR9N87AgMBAAECggEAJ0g9/CEERxPgLTqRso5m1dE4xl9Poi3/3dxKYykZW+uj\n05aOhljA4+X4xrVShiZt+BIvRhssdHHjuYsbFfqv6rGEfwN9wWUlUF1CbwOz4UBP\nRO0rHGIV6/caEgKdosy1tKO/dyyQDZFAaRiNFpmrcY3zXTRNStBjsE1arVSZ7989\n4I9ZlHkhEvRTmiScqB3nwcCIEgVcJTRVK6fOxYSMCDw1i4i4BGWksO5ocqSizCYP\nIO5w6avfGltdjODSGmuZEiXH/QZSHk6ENN+ArOJBhLPFUETmB3qvkHMuZ3vvyWqF\n48beZ/zwpkVAk0dxRjaeRqEL9iZcnu1GA6qJQmbF1QKBgQDHp1IVze/9bfNVOnEf\nHNES5dqkAiKdceusFLpgb8wfMgiRuhzcZTay19xGBJOpmA1ftIk275IaQGuUdY/f\ntRxkrrtUIQtJQRtM31uoTWYn8imq5LFe8gIzWTDYL/PSSDhQnNn9tJRYqgmTdBqQ\nkIKe+svnC4QvsWX9OoBTdAPqHwKBgQDHm1XMwd4MXzn+7YM8D84zXz4s+h2YfU6y\nzmfkREP/uhI4fjIumThpNTJKZCjbytHKMUSiONwxGA6vw5jvR4JO0duNpIrOAAuc\nz/I06vENvpfNwZeHlZGSVl9OM7MBt7bpqSmNMu2ihxP4AaO9c9sY2M+3xxXha/t6\nBg8ppnhfZQKBgQC3kk7VIY8B8/CCcsPEGZjayWDo39W38iEBDeX3+ZMzM6vRYdBb\njOxoMDWmY1rp2pahYruvOUOaw5Sm4hkxVbMPl+FCD0fzSNuzKMN70f6VyAEr0i6L\n3/TKBb31aNHEjQbKiA2fSkQD6gP4Ag7S0SxoxKxqeZpGx9PAq+OF1+wpfQKBgQCo\nU8t4P+kkX83FuMAaD24hjmkdftMkfE+4pC2ipxr89gpVj75744RZ3J2LdImsSI7A\nRuoNL4wo7pO8D2PSLWirVXgkK6VOcWVZmVc03wfnQlo8DszdbvlzAdmfViPYB/h9\ndcVvqIoTrHvfgmp14tTaUERjQ8Wk8u4AikmRIyyRrQKBgQCSibR0O/j2acfvmtTt\ndY4aa/+3+etmDsl3Ea5Nji9Q5ES6JJlBnBBOcM7PZPNMawI7C7Rh05fOYKoaS4J5\nug2O61cUrpiw92lHZlQVAk3BFOhIB9dugn8KdaN02TLqygA9YaIiDYz9uINUl7+A\n//DwIhI0tFu1hjnEh32HIxi7BA==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-sowzl@hlexg-63f51.iam.gserviceaccount.com",
        "client_id": "110630035514391157337",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sowzl%40hlexg-63f51.iam.gserviceaccount.com"
      }
      srvkey='AAAA9RWO8ic:APA91bH33CkZMaT_luC7I2EcUtpRe4FeU2IgaJaFNo-xfCy6f1se48wFmW0hP03XbYzszzu9QkhFwZThfNbDt10fd9dW8QjA9z5uwZpqWAT1r9TRTjbJKxAUjCD1KiGxeCkaQAlYFgUd'
    senderID='1052628677159'
    srvc acct 'firebase-adminsdk-sowzl@hlexg-63f51.iam.gserviceaccount.com'
    hlexg-63f51.firebaseapp.com
    hlexg-63f51.web.app    
    hlexg-63f51.appspot.com*/