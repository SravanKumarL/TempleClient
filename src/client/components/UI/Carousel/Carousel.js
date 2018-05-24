import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import Toranaganapathi from '../../../../assets/Toranaganapathi.jpg';
import Rajagopura from '../../../../assets/rajagopuram.jpg';
import VidyaRanaya from '../../../../assets/VidyaRanyaTemple.JPG';
import Sharadamba from '../../../../assets/Sharadamba.jpg';
import ShankaraCharya from '../../../../assets/Shankaracharya.jpg';
import Chandrashekarabharathi from '../../../../assets/ChandraShekaraBharathi.jpg';
import AbhinavaVidyaTheertha from '../../../../assets/AbhinavaVidyaTheertha.jpg';
import BharathiTheertha from '../../../../assets/BharathiVidyaTheertha.jpg';
import Vidhushekarabharathi from '../../../../assets/VidhuShekaraBharathi.jpg';
const tutorialSteps = [
  { imgPath: `${Toranaganapathi}`, },
  { imgPath: `${Rajagopura}`, },
  { imgPath: `${VidyaRanaya}`, },
  { imgPath: `${Sharadamba}`, },
  { imgPath: `${ShankaraCharya}`, },
  { imgPath: `${Chandrashekarabharathi}`, },
  { imgPath: `${AbhinavaVidyaTheertha}`, },
  { imgPath: `${BharathiTheertha}`, },
  { imgPath: `${Vidhushekarabharathi}`, },
];

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // maxWidth: 400,
    flexGrow: 1,
    '& > div:first-child': {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
    },
    '& > div > .react-swipeable-view-container': {
      display: 'flex',
      flexGrow: 1,
    },
    '& > div > .react-swipeable-view-container > div': {
      display: 'flex',
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
});

class SwipeableTextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map(step => (
            // <img key={step.label} className={classes.img} src={step.imgPath} alt={step.label} />
            <div style={{ backgroundImage: `url(${step.imgPath})`, backgroundPosition: 'center', backgroundSize: 'cover', display: 'flex', flexGrow: 1, }}></div>
          ))}
        </SwipeableViews>
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>
          }
        />
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);