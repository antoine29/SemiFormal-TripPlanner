import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DropdownButton, MenuItem } from 'react-bootstrap'

import Icon from '../narrative/icon'

import { MainPanelContent, setMainPanelContent } from '../../actions/ui'

// TODO: make menu items configurable via props/config

class AppMenu extends Component {
  static propTypes = {
    setMainPanelContent: PropTypes.func
  }

  _showRouteViewer = () => {
    this.props.setMainPanelContent(MainPanelContent.ROUTE_VIEWER)
  }

  _openUrl = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSdBVT_t13vZRVJz9mptsNn2DgHZyvBZs_-MUb7nfg-dXnwtWQ/viewform?usp=sf_link", "_blank");
  }

  _startOver = () => {
    const { reactRouterConfig } = this.props
    let startOverUrl = '/'
    if (reactRouterConfig && reactRouterConfig.basename) {
      startOverUrl += reactRouterConfig.basename
    }
    window.location.href = startOverUrl
  }

  render () {
    const { languageConfig } = this.props

    return (
      <div className='app-menu'>
        <DropdownButton
          title={(<Icon type='bars' />)}
          noCaret
          className='app-menu-button'
          id='app-menu'>
          <MenuItem onClick={this._showRouteViewer}>
            <Icon type='bus' /> {languageConfig.routeViewer || 'Rutas'}
          </MenuItem>
          <MenuItem onClick={this._startOver}>
            <Icon type='undo' /> Reiniciar busqueda
          </MenuItem>
          <MenuItem onClick={this._openUrl}>
            <Icon type='question-circle' /> Cuestionario de usabilidad.
          </MenuItem>
        </DropdownButton>
      </div>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return {
    languageConfig: state.otp.config.language
  }
}

const mapDispatchToProps = {
  setMainPanelContent
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu)
