export const selectIsAuthenticated = (state) => !!state.auth.token;
export const selectToken = (state) => state.auth.token;
export const selectUsername = (state) => state.auth.username;