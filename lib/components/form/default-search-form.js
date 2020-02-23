import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LocationField from './location-field'
import SwitchButton from './switch-button'
import TabbedFormPanel from './tabbed-form-panel'
import defaultIcons from '../icons'

export default class DefaultSearchForm extends Component {
  static propTypes = {
    icons: PropTypes.object,
    mobile: PropTypes.bool
  }

  static defaultProps = {
    icons: defaultIcons,
    showFrom: true,
    showTo: true
  }

  constructor () {
    super()
    this.state = {
      desktopDateTimeExpanded: false,
      desktopSettingsExpanded: false
    }
  }

  render () {
    const { icons, mobile } = this.props
    const actionText = mobile ? 'tap' : 'click'

    return (
      <div>
        <div className='locations'>
          <LocationField
            type='from'
            // label={`Enter start location or ${actionText} on map...`}
            label={`Selecciona un punto en el mapa`}
            showClearButton
          />

          <LocationField
            type='to'
            label={`Selecciona un punto en el mapa`}
            // label={`Enter destination or ${actionText} on map...`}
            showClearButton={!mobile}
          />

          <div className='switch-button-container'>
            <SwitchButton content={<i className='fa fa-exchange fa-rotate-90' />} />
          </div>
        </div>

        {/* <TabbedFormPanel icons={icons} /> */}
      </div>
    )
  }
}
