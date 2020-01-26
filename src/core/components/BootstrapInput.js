import { withStyles, InputBase } from '@material-ui/core'

export default withStyles(theme => ({
  root: {
    borderRadius: theme.spacing(2.5),
    border: '1px solid #ced4da',
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    'label + &': {
      marginTop: theme.spacing(),
    },
    '&:focus': {
      borderColor: '#6B6C6F',
    }
  },
  input: {
    position: 'relative',
    fontSize: 14,
    padding: '10px 0px',
  },
}))(InputBase)
