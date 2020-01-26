import React from 'react'
import { connect } from 'react-redux'
import { Icon, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const BadPermPage = ({ code, message, link }) => (
  <div className='w-full h-full flex justify-center items-center'>
    <div>
      <div className='flex justify-center mb-20'>
        <Icon style={{ fontSize: 96, color: '#8795a0' }}>error_outline</Icon>
      </div>
      <div className='flex justify-center text-32 font-bold text-grey-darkest'>{code || 500}</div>
      <div className='flex justify-center text-24 text-grey-dark'>
        {message || 'Something went wrong'}
      </div>
      {link && (
        <div className='flex justify-center text-24 text-grey-dark'>
          <RouterLink to={link}>
            <Link component={'span'} className='back-home'>
              Back Home
            </Link>
          </RouterLink>
        </div>
      )}
    </div>
  </div>
)

const mapStateToProps = ({ core: { badPermInfo } }) => ({
  badPermInfo
})

export default connect(mapStateToProps)(BadPermPage)
