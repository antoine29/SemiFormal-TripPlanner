import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Label, Button } from 'react-bootstrap'
import { VelocityTransitionGroup } from 'velocity-react'
import { connect } from 'react-redux'

import Icon from '../narrative/icon'

import { setMainPanelContent, setViewedRoute } from '../../actions/ui'
import { findRoutes, findRoute, findAllPatternsRoutes } from '../../actions/api'
import { routeComparator } from '../../util/itinerary'

function operatorIndexForRoute (operators, route) {
  if (!route.agency) return 0
  const index = operators.findIndex(o =>
    o.id.toLowerCase() === route.agency.id.split(':')[0].toLowerCase())
  if (index !== -1 && typeof operators[index].order !== 'undefined') return operators[index].order
  else return 0
}

class RouteViewer extends Component {
  static propTypes = {
    hideBackButton: PropTypes.bool,
    routes: PropTypes.object
  }

  _backClicked = () => this.props.setMainPanelContent(null)

  componentDidMount () {
    this.props.findRoutes()
  }

  render () {
    const {
      findRoute,
      hideBackButton,
      languageConfig,
      operators,
      routes,
      setViewedRoute,
      viewedRoute
    } = this.props
    const sortedRoutes = routes ? Object.values(routes).sort(routeComparator) : []
    const agencySortedRoutes = operators.length > 0
      ? sortedRoutes.sort((a, b) => {
        return operatorIndexForRoute(operators, a) - operatorIndexForRoute(operators, b)
      })
      : sortedRoutes
    return (
      <div className='route-viewer'>
        {/* Header Block */}
        <div className='route-viewer-header'>
          {/* Back button */}
          {!hideBackButton && (
            <div className='back-button-container'>
              <Button
                bsSize='small'
                onClick={this._backClicked}
              ><Icon type='arrow-left' />Back</Button>
            </div>
          )}

          {/* Header Text */}
          <div className='header-text'>
            {languageConfig.routeViewer || this.props.allRoutesFlag === 'true'? 'All Routes':'Route Viewer'}
          </div>
          <div className=''>
            {languageConfig.routeViewerDetails}
          </div>
          <div style={{ clear: 'both' }} />
        </div>

        {
          this.props.allRoutesFlag !== 'true' && 
          <div className='route-viewer-body'>
            {agencySortedRoutes
              .map(route => {
                // Find operator based on agency_id (extracted from OTP route ID).
                // TODO: re-implement multi-agency logos for route viewer.
                // const operator = operatorForRoute(operators, route) || {}
                return (
                  <RouteRow
                    findRoute={findRoute}
                    isActive={viewedRoute && viewedRoute.routeId === route.id}
                    key={route.id
                    /* operator={operator */}
                    route={route}
                    setViewedRoute={setViewedRoute}
                  />
                )
              })
            }
          </div>
        }
        {
          // this.props.allRoutesFlag === 'true' && findAllPatternsRoutes({routes: agencySortedRoutes})
          this.props.allRoutesFlag === 'true' &&
          console.log("OOOOK") &&
          agencySortedRoutes.forEach(r => console.log(r.id))
        }
      </div>
    )
  }
}

class RouteRow extends PureComponent {
  _onClick = () => {
    const { findRoute, isActive, route, setViewedRoute } = this.props
    if (isActive) {
      // Deselect current route if active.
      setViewedRoute({ routeId: null })
    } else {
      // Otherwise, set active and fetch route patterns.
      findRoute({ routeId: route.id })
      setViewedRoute({ routeId: route.id })
    }
  }

  render () {
    const {isActive, route, operator} = this.props
    const {defaultRouteColor, defaultRouteTextColor, longNameSplitter} = operator || {}
    const color = `#${defaultRouteTextColor || route.textColor || '000000'}`
    const backgroundColor = `#${defaultRouteColor || route.color || 'ffffff'}`
    const nameParts = route.longName.split(longNameSplitter)
    const longName = (longNameSplitter && route.longName && nameParts.length > 1)
      ? nameParts[1]
      : route.longName
    return (
      <div
        style={{
          borderBottom: '1px solid gray',
          backgroundColor: isActive ? '#f6f8fa' : 'white'
        }}>
        <Button className='clear-button-formatting' style={{ padding: 8, width: '100%' }}
          onClick={this._onClick}
        >
          <div style={{display: 'inline-block'}}>
            {// TODO: re-implement multi-agency logos for route viewer.
              // Currently, the agency object is not nested within the get all
              // routes endpoint and causing this to only display operators for
              // the selected route.
              // operator && <img src={operator.logo} style={{marginRight: '5px'}} height={25} />
            }
          </div>
          <div style={{display: 'inline-block', marginTop: '2px'}}>
            <Label
              style={{
                backgroundColor: backgroundColor === '#ffffff' ? 'rgba(0,0,0,0)' : backgroundColor,
                fontSize: 'medium',
                fontWeight: 400,
                color
              }}>
              <b>{route.shortName}</b> {longName}
            </Label>
          </div>
        </Button>
        <VelocityTransitionGroup enter={{animation: 'slideDown'}} leave={{animation: 'slideUp'}}>
          {isActive && (
            <div style={{ padding: 8 }}>
              {route.url
                ? <a href={route.url} target='_blank'>Route Details</a>
                : 'No route URL provided.'
              }
            </div>
          )}
        </VelocityTransitionGroup>
      </div>
    )
  }
}
// connect to redux store

const mapStateToProps = (state, ownProps) => {
  return {
    operators: state.otp.config.operators,
    routes: state.otp.transitIndex.routes,
    viewedRoute: state.otp.ui.viewedRoute,
    languageConfig: state.otp.config.language
  }
}

const mapDispatchToProps = {
  findRoute,
  findRoutes,
  setMainPanelContent,
  setViewedRoute
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteViewer)
