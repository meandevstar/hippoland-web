import React from 'react'
import { withStyles, Checkbox, InputLabel } from '@material-ui/core'
import classNames from 'classnames'

const CheckBox = ({ classes, className, label, input = {}, onChange, value, checked, ...other }) => (
  <div className={classNames('flex items-center', className)}>
    <Checkbox
      className={classes.checkbox}
      onChange={onChange || input.onChange}
      checked={!!(checked !== undefined ? checked : input.value)}
      value={value}
      {...other}
    />
    <InputLabel style={{ fontSize: 14, color: 'black' }}>{label}</InputLabel>
  </div>
)

const styles = theme => ({
  checkbox: {
    height: 24,
    padding: '0 4px 0 4px',

    '& svg': {
      width: '1.5em',
      height: '1.5em'
    }
  }
})

export default withStyles(styles)(CheckBox)
