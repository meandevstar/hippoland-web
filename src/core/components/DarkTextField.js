import { withStyles, InputBase } from '@material-ui/core'

export default withStyles(theme => ({
  root: {
    borderRadius: 9,
    backgroundColor: '#16152280',
    color: theme.palette.common.white,
    height: 64, 

    'label + &': {
      marginTop: theme.spacing(),
    },
  },
  input: {
    position: 'relative',
    fontSize: 30,
    padding: '8px 12px',
    fontWeight: 'bold'
  },
}))(InputBase)
