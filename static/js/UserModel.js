/**
 * User Model - MVC Pattern
 * Handles user data and validation logic
 */
class UserModel {
    constructor() {
        this.userData = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
        this.errors = {};
    }

    /**
     * Set user data
     * @param {Object} data - User form data
     */
    setUserData(data) {
        this.userData = { ...this.userData, ...data };
    }

    /**
     * Validate user data
     * @returns {boolean} - True if valid, false otherwise
     */
    validate() {
        this.errors = {};
        let isValid = true;

        // First name validation
        if (!this.userData.firstName || this.userData.firstName.trim().length < 1) {
            this.errors.firstName = 'First name is required and must be at least 1 character long.';
            isValid = false;
        }

        // Last name validation
        if (!this.userData.lastName || this.userData.lastName.trim().length < 1) {
            this.errors.lastName = 'Last name is required and must be at least 1 character long.';
            isValid = false;
        }

        // Email validation
        if (!this.userData.email || !this.isValidEmail(this.userData.email)) {
            this.errors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        // Password validation
        if (!this.userData.password || this.userData.password.length < 8) {
            this.errors.password = 'Password is required and must be at least 8 characters long.';
            isValid = false;
        }

        // Password confirmation validation
        if (!this.userData.confirmPassword) {
            this.errors.confirmPassword = 'Please confirm your password.';
            isValid = false;
        } else if (this.userData.password !== this.userData.confirmPassword) {
            this.errors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }

        return isValid;
    }

    /**
     * Get validation errors
     * @returns {Object} - Error messages
     */
    getErrors() {
        return this.errors;
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Get user data
     * @returns {Object} - User data object
     */
    getUserData() {
        return this.userData;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserModel;
}

