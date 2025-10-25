/**
 * Form Controller - MCP Pattern
 * Handles business logic and coordinates between Model and View
 */
class FormController {
    constructor() {
        this.initialize();
    }

    /**
     * Initialize the controller
     */
    initialize() {
        // Controller-specific initialization if needed
    }

    /**
     * Validate form data
     * @param {Object} formData - Form data to validate
     * @returns {Object} - Validation result with isValid and errors
     */
    validateFormData(formData) {
        const errors = {};
        let isValid = true;

        // Validate first name
        if (!formData.firstName || formData.firstName.trim().length < 1) {
            errors.firstName = 'First name is required and must be at least 1 character long.';
            isValid = false;
        }

        // Validate last name
        if (!formData.lastName || formData.lastName.trim().length < 1) {
            errors.lastName = 'Last name is required and must be at least 1 character long.';
            isValid = false;
        }

        // Validate email
        if (!formData.email || formData.email.trim().length === 0) {
            errors.email = 'Email is required.';
            isValid = false;
        } else if (!this.isValidEmail(formData.email)) {
            errors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate subject
        if (!formData.subject || formData.subject.trim().length < 3) {
            errors.subject = 'Subject is required and must be at least 3 characters.';
            isValid = false;
        }

        // Validate message
        if (!formData.message || formData.message.trim().length < 10) {
            errors.message = 'Message is required and must be at least 10 characters.';
            isValid = false;
        }

        return {
            isValid: isValid,
            errors: errors
        };
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Process form submission
     * @param {Object} formData - Form data to process
     * @returns {Promise} - Promise that resolves with submission result
     */
    async processFormSubmission(formData) {
        try {
            // In a real application, this would send data to a server
            // For now, we'll simulate a successful submission
            await this.simulateSubmission(formData);
            
            return {
                success: true,
                message: 'Form submitted successfully!'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to submit form. Please try again.'
            };
        }
    }

    /**
     * Simulate form submission (replace with actual API call)
     * @param {Object} formData - Form data
     * @returns {Promise} - Promise that resolves after simulation
     */
    simulateSubmission(formData) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                console.log('Form data submitted:', formData);
                resolve();
            }, 1000);
        });
    }

    /**
     * Sanitize form data
     * @param {Object} formData - Raw form data
     * @returns {Object} - Sanitized form data
     */
    sanitizeFormData(formData) {
        const sanitized = {};
        
        Object.keys(formData).forEach(key => {
            if (typeof formData[key] === 'string') {
                // Basic HTML sanitization (in production, use a proper sanitization library)
                sanitized[key] = formData[key]
                    .trim()
                    .replace(/[<>]/g, ''); // Remove potential HTML tags
            } else {
                sanitized[key] = formData[key];
            }
        });

        return sanitized;
    }

    /**
     * Get form field configuration
     * @returns {Object} - Field configuration for validation
     */
    getFieldConfiguration() {
        return {
            firstName: {
                required: true,
                minLength: 1,
                maxLength: 50
            },
            lastName: {
                required: true,
                minLength: 1,
                maxLength: 50
            },
            email: {
                required: true,
                type: 'email',
                maxLength: 100
            },
            subject: {
                required: true,
                minLength: 3,
                maxLength: 100
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000
            }
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormController;
}
