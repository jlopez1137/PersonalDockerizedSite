/**
 * Form View - MVC Pattern
 * Handles form display and user interactions
 */
class FormView {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.errorElements = {};
        this.initializeErrorElements();
    }

    /**
     * Initialize error message elements
     */
    initializeErrorElements() {
        const errorIds = ['firstNameError', 'lastNameError', 'emailError', 'passwordError', 'confirmPasswordError'];
        errorIds.forEach(id => {
            this.errorElements[id] = document.getElementById(id);
        });
    }

    /**
     * Display error message for a field
     * @param {string} fieldName - Name of the field
     * @param {string} message - Error message to display
     */
    showError(fieldName, message) {
        const errorId = fieldName + 'Error';
        const errorElement = this.errorElements[errorId];
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.setAttribute('aria-live', 'polite');
            
            // Add error class to input
            const input = document.getElementById(fieldName);
            if (input) {
                input.classList.add('error');
            }
        }
    }

    /**
     * Clear error message for a field
     * @param {string} fieldName - Name of the field
     */
    clearError(fieldName) {
        const errorId = fieldName + 'Error';
        const errorElement = this.errorElements[errorId];
        
        if (errorElement) {
            errorElement.textContent = '';
            
            // Remove error class from input
            const input = document.getElementById(fieldName);
            if (input) {
                input.classList.remove('error');
            }
        }
    }

    /**
     * Clear all error messages
     */
    clearAllErrors() {
        Object.keys(this.errorElements).forEach(key => {
            const errorElement = this.errorElements[key];
            if (errorElement) {
                errorElement.textContent = '';
            }
        });

        // Remove error classes from all inputs
        const errorInputs = document.querySelectorAll('input.error');
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
    }

    /**
     * Get form data
     * @returns {Object} - Form data object
     */
    getFormData() {
        if (!this.form) return {};
        
        const formData = new FormData(this.form);
        return {
            firstName: formData.get('firstName') || '',
            lastName: formData.get('lastName') || '',
            email: formData.get('email') || '',
            password: formData.get('password') || '',
            confirmPassword: formData.get('confirmPassword') || ''
        };
    }

    /**
     * Focus first invalid field
     */
    focusFirstInvalidField() {
        const firstError = document.querySelector('.error:not(:empty)');
        if (firstError) {
            const input = firstError.previousElementSibling;
            if (input && input.tagName === 'INPUT') {
                input.focus();
            }
        }
    }

    /**
     * Add event listener for form submission
     * @param {Function} callback - Callback function for form submission
     */
    onFormSubmit(callback) {
        if (this.form) {
            this.form.addEventListener('submit', callback);
        }
    }

    /**
     * Add event listener for real-time validation
     * @param {Function} callback - Callback function for validation
     */
    onPasswordChange(callback) {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password) {
            password.addEventListener('input', callback);
        }
        if (confirmPassword) {
            confirmPassword.addEventListener('input', callback);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormView;
}

