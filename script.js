// Form validation and protection script with enhanced UX
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('user');
    const passwordInput = document.getElementById('pass');
    const submitButton = document.querySelector('.input-submit');
    const loginBox = document.querySelector('.login_box');

    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.id = 'submit-status';
    messageContainer.setAttribute('aria-live', 'polite');
    messageContainer.setAttribute('aria-atomic', 'true');
    loginBox.insertBefore(messageContainer, document.querySelector('.register'));

    // Function to show messages
    function showMessage(message, type) {
        messageContainer.textContent = message;
        messageContainer.className = `message ${type} show`;
        setTimeout(() => {
            messageContainer.className = 'message';
        }, 5000);
    }

    // Function to show error messages
    function showError(input, message) {
        // Remove existing error
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error element with id for ARIA
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.id = `${input.id}-error`;
        errorElement.setAttribute('role', 'alert');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;

        // Add error after input box
        input.parentElement.appendChild(errorElement);
    }

    // Function to clear errors
    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    }

    // Validation function
    function validateForm() {
        clearErrors();
        let isValid = true;

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Check username
        if (username === '') {
            showError(usernameInput, 'Username is required');
            isValid = false;
        }

        // Check password
        if (password === '') {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters long');
            isValid = false;
        }

        return isValid;
    }

    // Loading state function
    function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        const spinner = submitButton.querySelector('.loading-spinner') || document.createElement('span');
        
        if (isLoading) {
            spinner.className = 'loading-spinner';
            submitButton.textContent = 'Logging in...';
            submitButton.insertBefore(spinner, submitButton.firstChild);
            spinner.style.display = 'inline-block';
        } else {
            submitButton.textContent = 'Login';
            if (spinner.parentElement) {
                spinner.remove();
            }
        }
    }

    // Form submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            setLoading(true);
            
            // Simulate API call (replace with real authentication)
            setTimeout(() => {
                setLoading(false);
                showMessage('Login successful! Redirecting...', 'success');
                
                // Simulate redirect
                setTimeout(() => {
                    // window.location.href = 'dashboard.html'; // Uncomment for real redirect
                    showMessage('Welcome! (Demo redirect)', 'success');
                }, 1000);
            }, 2000); // 2 second delay for demo
        } else {
            showMessage('Please fix the errors above', 'error');
        }
    });

    // Real-time validation on input
    usernameInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            const error = this.parentElement.querySelector('.error-message');
            if (error) error.remove();
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.trim() !== '' && this.value.length >= 6) {
            const error = this.parentElement.querySelector('.error-message');
            if (error) error.remove();
        }
    });

    // Keyboard navigation enhancements
    document.addEventListener('keydown', function(e) {
        // Enter key on inputs submits form
        if (e.key === 'Enter' && (document.activeElement === usernameInput || document.activeElement === passwordInput)) {
            submitButton.click();
        }
        
        // Escape key clears form
        if (e.key === 'Escape') {
            clearErrors();
            messageContainer.className = 'message';
        }
    });

    // Focus management
    usernameInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    usernameInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
    
    passwordInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    passwordInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});