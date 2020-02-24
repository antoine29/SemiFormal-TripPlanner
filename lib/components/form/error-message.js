import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TripTools from '../narrative/trip-tools'

import { getActiveSearch } from '../../util/state'

class ErrorMessage extends Component {
  static propTypes = {
    error: PropTypes.object
  }

  render () {
    const { error, errorMessages, currentQuery } = this.props
    if (!error) return null

    let message = error.msg
    // check for configuration-defined message override
    if (errorMessages) {
      const msgConfig = errorMessages.find(m => m.id === error.id)
      if (msgConfig) {
        if (msgConfig.modes) {
          for (const mode of msgConfig.modes) {
            if (currentQuery.mode.includes(mode)) {
              message = msgConfig.msg
              break
            }
          }
        } else message = msgConfig.msg
      }
    }

    return (
      <div className='error-message'>
        <div className='header'>
          <i className='fa fa-exclamation-circle' /> No se encontraron rutas de transporte.
           {/* <p className='fa fa-exclamation-circle'>No se encontraron rutas de transporte.</p> */}
        </div>
        <div className='message'>
          {/* {message} */}
          <ul className="fa-ul">
             <li><i className="fa-li fa fa-square"></i>Es posible que no se haya mapeado una ruta que pase por los puntos que introduciste.</li>
             <li><i className="fa-li fa fa-square"></i>Servidor temporalmente desconectado.</li>
          </ul>
        </div>
        <TripTools buttonTypes={['START_OVER', 'REPORT_ISSUE']} />
      </div>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  const activeSearch = getActiveSearch(state.otp)
  return {
    error: activeSearch && activeSearch.response && activeSearch.response.error,
    currentQuery: state.otp.currentQuery,
    errorMessages: state.otp.config.errorMessages
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage)
