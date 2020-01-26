import React from 'react'
import { withStyles, InputLabel, InputAdornment, Icon, FormHelperText } from '@material-ui/core'
import classNames from 'classnames'
import BootstrapInput from './BootstrapInput'

const TextFieldWithIcon = ({
  input,
  icon,
  label,
  classes,
  style,
  inputStyles,
  className,
  meta: { touched, error }={},
  ...other
}) => {
  let { adorment, ...otherIconProps } = icon || {}
  adorment = adorment || {}

  return (
    <div className='mb-16' style={style}>
      <InputLabel
        style={{
          marginLeft: 8,
          fontSize: 14,
          fontWeight: 700
        }}
      >
        {label}
      </InputLabel>
      <BootstrapInput
        style={inputStyles}
        className={classNames(classes.inputWrapper, className, {
          normal: !adorment,
          start: adorment && adorment.start,
          end: adorment && adorment.end
        })}
        error={touched && !!error}
        {...{
          [adorment && adorment.start && 'startAdornment']: (
            <InputAdornment position='start'>
              <Icon {...otherIconProps}>{adorment.start}</Icon>
            </InputAdornment>
          ),
          [adorment && adorment.end && 'endAdornment']: (
            <InputAdornment position='end'>
              <Icon
                {...otherIconProps}
                onClick={adorment.onEndClick}
                style={{ 
                  ...otherIconProps.style,
                  [!!adorment.onEndClick && 'cursor']: 'pointer'
                }}
              >
                {adorment.end}
              </Icon>
            </InputAdornment>
          )
        }}
        {...input}
        {...other}
      />
      {touched && error &&
        <FormHelperText error className='text-12 ml-8' children={<span>{error}</span>} />
      }
    </div>
  )
}

const styles = theme => ({
  inputWrapper: {
    paddingLeft: 12,

    '& input': {
      borderRadius: theme.spacing(2.5),
    },
    '& textarea': {
      lineHeight: '1.6rem'
    },
    '&.start': {
      paddingLeft: 12,

      '& input': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      }
    },
    '&.end': {
      paddingRight: 12,

      '& input': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      }
    }
  }
})

export default withStyles(styles)(TextFieldWithIcon)
