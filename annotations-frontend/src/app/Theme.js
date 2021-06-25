import {
    createMuiTheme,
} from '@material-ui/core';

const Theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#3b3b3b',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#1c4385',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffffff',
        },
		error: {
			light: "#cea5ad",
			main: "#cea5ad",
		},
		danger: {
			light: "#fed040",
			main: "#fed040",
		},
		success: {
			light: "#148c8a",
			main: "#148c8a",
		},
		info: {
			light: "#2e3359",
			main: "#2e3359",
		},
        // error: will use the default color

    },
    typography: {
        useNextVariants: true,
        h6: {
            color: "#095EAB",
            fontSize: "1.1rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontWeight:800
        },
        h5: {
            color: "#095EAB",
            fontSize: "1.1rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontWeight:800
        },
    },
});

export default Theme;