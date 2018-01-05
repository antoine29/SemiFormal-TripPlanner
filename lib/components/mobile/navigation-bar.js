import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import AppMenu from '../app/app-menu'
import { setMobileScreen } from '../../actions/ui'

class MobileNavigationBar extends Component {
  static propTypes = {
    backScreen: PropTypes.number,
    headerAction: PropTypes.element,
    headerText: PropTypes.string,
    showBackButton: PropTypes.bool,
    setMobileScreen: PropTypes.func
  }

  _backButtonPressed = () => {
    console.log('back button pressed')
    const { backScreen, onBackClicked } = this.props
    if (backScreen) this.props.setMobileScreen(this.props.backScreen)
    else if (typeof onBackClicked === 'function') onBackClicked()
  }

  _clearButtonPressed = () => {
    console.log('clear button pressed')
  }

  render () {
    const { showBackButton, showClearButton, headerAction, headerText } = this.props

    return (
      <Navbar fluid>

        <Navbar.Header>
          <Navbar.Brand>
            {showBackButton
              ? <div className='mobile-back'><FontAwesome name='arrow-left' onClick={this._backButtonPressed} /></div>
              : <AppMenu />
            }
          </Navbar.Brand>
        </Navbar.Header>

        <div className='mobile-header'>
          {headerText
           ? <div className='mobile-header-text'>{headerText}</div>
           : <div className='icon-trimet' />
          }
          {/* FIXME: get this working again
          (headerText !== null && headerAction !== null)
            ? <div className='mobile-header-action'>{headerAction}</div>
            : null
          */}
        </div>

        {showClearButton
          ? (
            <div className='mobile-close'>
              <Button className='clear-button' onClick={this._clearButtonPressed}>
                Clear
              </Button>
            </div>
          ) : null
        }
      </Navbar>
    )
  }
}

// connect to the redux store

const mapStateToProps = (state, ownProps) => {
  return { }
}

const mapDispatchToProps = {
  setMobileScreen
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavigationBar)