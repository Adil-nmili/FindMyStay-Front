

import { AuthService } from "../services/AuthService";


export const loginRequest = (payload) => {
  return async (dispatch) => {
    dispatch({type: "LOGIN_REQUEST"})
    try {
      const response = await AuthService.login(payload)
      dispatch({type:"LOGIN_SUCCESS", payload:response.data})
    } catch (error) {
      dispatch({type: "LOGIN_FAILURE", payload:error})
    }
  }
}

