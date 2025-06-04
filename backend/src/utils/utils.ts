export class Utils {
    // Checks if the value exists, i.e., is not undefined, null, empty, or false
    public static valueExists(value: any): boolean {
        return value !== undefined && value !== null && value !== '' && value !== false;
    }    
    
    // Checks if the email is valid
    public static validEmail(email: any): boolean {
        try {
            // Defines a basic pattern for emails like name@example.com.
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            // Tests if the email matches this pattern and is actually a string
            return emailPattern.test(email) && typeof email === 'string';
        } catch {
            // If an error occurs, return false
            return false;
        }
    }

    // Validates if the password is valid
    public static validPassword(password: any): boolean {
        try {
            // Defines a basic pattern for passwords: at least one letter, one number,
            // one special character, and one uppercase letter, also requiring at least 8 characters
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
            // Tests if the password meets the pattern and is a string
            return passwordPattern.test(password) && typeof password === 'string';
        } catch {
            // In case of error, return false
            return false;
        }
    }

    // Validates if the full name is valid
    public static validName(name: any): boolean {
        try {
            // Removes extra spaces and splits the name into parts.
            const parts = name.trim().split(/\s+/);
    
            // If there are fewer than two parts, the name is not valid because
            // a full name must have at least two names.
            if (parts.length < 2) return false;
    
            // Checks each part to ensure it has at least 2 letters and only letters.
            const isValid = parts.every((part: any) => {
                if (part.length < 2) return false;
                return /^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/.test(part);
            });
    
            // Returns true if all parts are valid and if the name is a string.
            return isValid && typeof name === 'string';
        } catch {
            // If an error occurs, return false.
            return false;
        }
    }
}
