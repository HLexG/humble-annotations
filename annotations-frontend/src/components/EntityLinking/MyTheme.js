import { createTheme } from '@material-ui/core/styles';

export default createTheme({
    palette: {
        primary: { // works
          main: '#165788',
          contrastText: '#fff',
        },
        secondary: { // works
          main: '#69BE28',
          contrastText: '#fff',
        },
        companyBlue: {
            backgroundColor: '#65CFE9',
            color: '#fff',
        },
        companyRed: { 
            backgroundColor: '#E44D69',
            color: '#000',
        },
        accent: { 
            backgroundColor: '#104de9', 
            color: '#000',
        },
        unknown: {
            backgroundColor: '#DEEEEA', 
            color: '#222b1e',
        },
        confirm: {
            backgroundColor: '#00FF00', 
            color: '#192581',
        },
        deny: {
            backgroundColor: '#BF1363', 
            color: '#ffff83',
        },
    },
});