// Coloque aqui suas actions

export const LOGIN = 'LOGIN';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: {
    email,
  },
});
