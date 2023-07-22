export function login(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
    return {
      type: 'LOGIN',
      payload: user,
    };
  }
  
  export function logout() {
    sessionStorage.clear();
    return {
      type: 'LOGOUT',
    };
  }
  
  export const loadUserFromStorage = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return {
      type: 'LOAD_USER',
      payload: user,
    };
  };