

const initialState = {
  user: JSON.parse(localStorage.getItem('user-auth')) || null,
  loading: false,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      
      localStorage.setItem('auth_token', action.payload.token);
      
      localStorage.setItem('user-auth', JSON.stringify(action.payload.user))
      return { ...state, loading: false, user: action.payload.user };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user-auth');
      return { ...state, user: null };
    default:
      return state;
  }
}