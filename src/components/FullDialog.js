import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const FullScreenDialog = ({
  children,
  openFullDialog,
  closeFullDialog
}) => (
  <div>
    <Dialog
      fullScreen
      open={openFullDialog}
      onClose={closeFullDialog}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" onClick={closeFullDialog} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Button color="inherit" onClick={closeFullDialog}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <List className='m-5'>
        { children }
      </List>
    </Dialog>
  </div>
)

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog)