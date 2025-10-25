/**
 * Form Presenter - MCP Pattern
 * Handles presentation logic and coordinates between Model, View, and Controller
 */
class FormPresenter {
    constructor(model, view, controller) {
        this.model = model;
        this.view = view;
        this.controller = controller;
        this.initialize();
    }

    /**
     * Initialize the presenter
     */
    initialize() {
        this.setupEventHandlers();
    }

    /**
     * Setup event handlers
     */
    setupEventHandlers() {
        // Handle form submission
        this.view.onFormSubmit((e) => this.handleFormSubmit(e));
        
        // Handle real-time validation
        this.view.onPasswordChange(() => this.handlePasswordChange());
    }

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    handleFormSubmit(event) {
        event.preventDefault();
        
        // Clear previous errors
        this.view.clearAllErrors();
        
        // Get form data and update model
        const formData = this.view.getFormData();
        this.model.setUserData(formData);
        
        // Validate using model
        const isValid = this.model.validate();
        
        if (isValid) {
            this.presentSuccess();
        } else {
            this.presentErrors();
        }
    }

    /**
     * Handle password change for real-time validation
     */
    handlePasswordChange() {
        const formData = this.view.getFormData();
        this.model.setUserData(formData);
        
        // Check password match
        if (formData.password && formData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                this.view.showError('confirmPassword', 'Passwords do not match.');
            } else {
                this.view.clearError('confirmPassword');
            }
        }
    }

    /**
     * Present success state
     */
    presentSuccess() {
        // Submit the form
        if (this.view.form) {
            this.view.form.submit();
        }
    }

    /**
     * Present validation errors
     */
    presentErrors() {
        const errors = this.model.getErrors();
        
        // Display each error
        Object.keys(errors).forEach(fieldName => {
            this.view.showError(fieldName, errors[fieldName]);
        });
        
        // Focus first invalid field
        this.view.focusFirstInvalidField();
    }

    /**
     * Get presentation data
     * @returns {Object} - Data for presentation
     */
    getPresentationData() {
        return {
            userData: this.model.getUserData(),
            errors: this.model.getErrors(),
            isValid: this.model.validate()
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormPresenter;
}


