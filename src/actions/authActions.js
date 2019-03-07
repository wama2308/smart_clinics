import authState from '../state/authState'

export function setState() {
    return {
      type: 'SETSTATE',
      payload:authState
    }
}