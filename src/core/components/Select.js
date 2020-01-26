import React, { Component, createRef } from 'react'
import classNames from 'classnames'
import { withStyles, FormControl, Select, MenuItem, InputLabel, Checkbox } from '@material-ui/core'
import BootstrapInput from './BootstrapInput'

export class CustomSelect extends Component {
  constructor(props) {
    super(props)

    this.inputRef = createRef()
  }
  render() {
    const {
      classes,
      className,
      options,
      label,
      meta: { touched, error } = {},
      noneEnabled,
      variant,
      input,
      small,
      style,
      placeholder,
      ...otherProps
    } = this.props

    const renderSelectOptions = ({ key, value, checked }) => {
      return (
        <MenuItem key={`${key}-${value}`} value={key}>
          {checked !== undefined && <Checkbox checked={checked} />}
          {value}
        </MenuItem>
      )
    }

    const isSelected = input && input.value !== ''

    return (
      <FormControl
        variant={variant}
        className={classNames(classes.wrapper, className, {
          small: !!small
        })}
        style={style || {}}
      >
        <InputLabel
          style={{
            marginLeft: 8,
            fontSize: 14,
            color: 'black'
          }}
        >
          {label}
        </InputLabel>
        <Select
          {...input}
          onChange={e => input.onChange(e.target.value)}
          input={<BootstrapInput name={label && label.toLowerCase()} />}
          variant={variant}
          error={touched && !!error}
          {...otherProps}
        >
          {noneEnabled && (
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
          )}

          {options.map(renderSelectOptions)}
        </Select>
        {touched && error && <span className={classes.error}>{error}</span>}
        {placeholder && !isSelected && <span className={classes.placeholder}>{placeholder}</span>}
      </FormControl>
    )
  }
}

const styles = theme => ({
  wrapper: {
    display: 'flex',

    '&>div': {
      height: 38,
      padding: '0 16px'
    },
    '& input': {
      padding: 12
    },
    '& label': {
      transform: 'translate(2px, -12px) scale(1)'
    },
    '& svg': {
      top: 'calc(50% - 7px)',
      right: 10
    },
    '&.small': {
      height: 'inherit',

      '& div div div': {
        padding: `6px 24px 6px 16px`,
        fontSize: '0.8rem'
      }
    }
  },
  error: {
    color: theme.palette.error.main,
    fontSize: 12,
    position: 'absolute',
    marginTop: '52px 0 0 8px'
  },
  placeholder: {
    fontSize: 14,
    color: '#969a9e',
    position: 'absolute',
    top: 'calc(50% - 5px)',
    left: 12
  }
})

export default withStyles(styles)(CustomSelect)
