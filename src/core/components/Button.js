import React from 'react'
import { withStyles, Button, CircularProgress, Icon } from '@material-ui/core'
import classNames from 'classnames'

const LoadingButton = ({ classes, loading, variant, icon, img, children, className, disabled, greyed, ...other }) => (
  <Button
    disabled={loading || disabled}
    className={classNames(classes.root, className, {
      [classes.outline]: variant === 'outline',
      [classes.flat]: variant === 'flat',
      [classes.greyed]: greyed
    })}
    {...other}
  >
    {loading && <CircularProgress size={24} className={classes.loadingIcon} />}
    {!loading && (
      <>
        {icon && <Icon className={classNames({'mr-8': !!children})}>{icon}</Icon>}
        {img && <img src={img} className={classNames('w-16 h-16', {'mr-8': !!children})} alt='icon' />}
        {children}
      </>
    )}
  </Button>
)

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '4px 16px',
    color: '#ffffff',
    background: '#263697',
    borderRadius: '50vh',
    borderWidth: 2,
    height: 40,
    fontWeight: 700,
    fontSize: '1.4rem',

    '&:disabled': {
      color: '#ffffff',
      backgroundColor: '#bcbcbc !important'
    },
    '&:hover': {
      filter: 'brightness(110%)'
    }
  },
  outline: {
    background: '#ffffff !important',
    color: '#263697',
    border: '2px solid currentColor',

    '&:hover': {
      background: '#ffffff !important',
      filter: 'brightness(110%)'
    }
  },
  flat: {
    background: 'transparent !important',
    color: '#263697',

    '&:hover': {
      filter: 'brightness(110%)'
    }
  },
  greyed: {
    color: '#ffffff',
    backgroundColor: '#bcbcbc !important',
  },
  loadingIcon: {
    color: 'currentColor',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

export default withStyles(styles)(LoadingButton)
