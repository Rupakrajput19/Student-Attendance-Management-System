export function login(user) {
    return {
      type: 'LOGIN',
      payload: user,
    };
  }
  
  export function logout() {
    return {
      type: 'LOGOUT',
    };
  }
  