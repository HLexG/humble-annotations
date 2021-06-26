import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import CreateIcon from '@material-ui/icons/Create';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CallMissedIcon from '@material-ui/icons/CallMissed'; //coref
import SwapCallsIcon from '@material-ui/icons/SwapCalls'; // coref
import WrapTextIcon from '@material-ui/icons/WrapText'; // coref
import UndoIcon from '@material-ui/icons/Undo'; //coref or undo
import FormatClearIcon from '@material-ui/icons/FormatClear'; // adjudicate 
import GavelIcon from '@material-ui/icons/Gavel'; // adj
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'; // adh
import ForwardIcon from '@material-ui/icons/Forward'; // events
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation'; // events
import GroupIcon from '@material-ui/icons/Group'; // entity
import GetAppIcon from '@material-ui/icons/GetApp'; // download
import GradientIcon from '@material-ui/icons/Gradient'; // ling diversity
import HeightIcon from '@material-ui/icons/Height'; // cdcr
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'; // crowd mgmt

import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter'; // group corpora

import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'; // cdcr
import AllInclusiveIcon from '@material-ui/icons/AllInclusive'; // big corpus
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'; // sort for them
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'; // they pick
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit'; // cdcr
import { green } from '@material-ui/core/colors';

const useStyles = theme => ({
    root: {
      flexGrow: 1,
      
      margin: '180px 20px 0 0'

    },
    paper: {
      padding: 2,
      textAlign: 'center',
      color: green,
    },
    media: {
      height: 900,
    },
    writing: {
      padding: '5px 0 5px 0',
    },
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

  }
  });


  export default  useStyles;
