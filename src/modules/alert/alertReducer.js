import { ALERT_SEND, ALERT_DISMISS, ALERT_CLEAR } from './alertActions'

export function alerts(state = [], action) {
  if (!action || !action.type) return state

  switch (action.type) {
    case ALERT_SEND:
      return [action.payload, ...state]
    case ALERT_DISMISS:
      return state.filter(alert => 
        alert.id !== action.payload
      )
    case ALERT_CLEAR:
      return []
    default:
      return state
  }
}
