import decode from 'jwt-decode';

class AuthService {
    // retrieve the data from the token
    getProfile() {
        return decode(this.getToken());
    }

    // verify user is still logged in
    loggedIn() {
        //verifies token is still valid
        const token = this.getToken();
        // use type coersion to check if token is NOT undefined and NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // code to verify token is not expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
      }

    // set token to localStorage and reload to homepage
    login(idToken) {
        //Saves in localStorage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // Clear user token and force logout with reload
    logout() {
        // Clear the user token and profile data
        localStorage.removeItem('id_token');
        // reload and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();