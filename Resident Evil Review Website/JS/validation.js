/*
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that if I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.

I referenced the template code provided by the instructor (link in the project description),
and modeled my project after it.  

I also found my phone regex from:
    https://www.javascript-coder.com/form-validation/javascript-form-validation-phone-number/.
I couldn't find a phone regex that I liked from the template code's recommended websites. 
*/

// Global regex and state variables
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
const zipRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/
const states = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

function initialValidate(formId) {
    // This function sets up validation event callbacks.
    let visitorForm = document.getElementById(formId);
    let inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        // On change, i.e. when a person exits an input label, validate the input by calling inputChanged.
        input.addEventListener("change", inputChanged);
    }
    // On submit, capture the entire visitor form.
    visitorForm.addEventListener("submit", submitForm);
}

function inputChanged(event) {
    // When a change event occurs, that event is passed to this function.
    // This function then checks if the form info is valid by calling validateForm.
    // It then adds the 'was-validated' class to the target element.
    validateForm();
    let elem = event.currentTarget;
    // The 'was-validated' class ensures that only the target element error messages get shown.
    elem.classList.add("was-validated");
}

function submitForm(event) {
    // This function prevents form submission until the form info is validated.
    let form = event.currentTarget;
    // Prevents default form action of redirecting to https://wp.zybooks.com/form-viewer.php.
    event.preventDefault();
    event.stopPropagation();
    // Check if the form info is valid
    validateForm();
    // DOM checkValidity function tells you current status of form according to html5.
    if (!form.checkValidity()) {
        // If the form is invalid, set 'was-validated' class on all inputs to show errors.
        let inputs = document.querySelectorAll("input");
        for (let input of inputs) {
            input.classList.add("was-validated");
        }
    } 
    else {
        // If the form is valid, hide the form and show the success message.
        let visitorForm = document.getElementById("visitor-form")
        visitorForm.style.display = 'none';     //hide the form
        let success = document.getElementById("success"); 
        success.style.display = 'block';      //show the success message
        // Send console message that form was submitted successfully. 
        console.log("form was submitted");
    }
}

function validateForm() {
    // This function validates the form info.
    // It calls checkRequired on the first 4 inputs.
    // These inputs require no further validation.
    checkRequired("first-name", "First Name is required");
    checkRequired("last-name", "Last Name is required");
    checkRequired("address", "Address is Required");
    checkRequired("city", "City is required");
    // Check that state input is not empty.
    if(checkRequired("state", "State is required")){
        // Check that state input is valid, i.e. a two letter code.
        validateState("state", "Not a valid state, enter two letter code e.g., OR");
    }
    // Check that email input is not empty.
    if (checkRequired("email", "Email Address is required")) {
        // Check that email input is valid, i.e. passes the email regex test.
        checkFormat("email", "Email format is bad", emailRegex)
    }
    // Check that zip code input is not empty.
    if (checkRequired("zip", "Zip Code is required")) {
       // Check that zip code input is valid, i.e. passes the zip code regex test .
       checkFormat("zip", `Malformed zip code, please use either "#####", or "#####-#### format.`, zipRegex)
    }
    // Check that phone input is not empty.
    if (checkRequired("phone", "Phone is required")) {
        // Check that phone input is valid, i.e. passes the phone regex test.
        checkFormat("phone", "Phone format is bad", phoneRegex)
    }
    // Check that at least one checkbox has been checked.
    // If not, the error message is placed below the last checkbox, the "friend" checkbox.
    checkRequired("friend", "You must select at least one!");
}

function validateState(id, message) {
    // This function validates the state entry.
    let elem = document.getElementById(id);
    let valid = false;
    // Convert the entry to uppercase.
    let value = elem.value.toUpperCase();
    // Check whether the value is in the states array
    if (states.includes(value)) {
        // This ensures that a valid state entry does not display an error message.
        valid = true;
    }
    // Call the setElemValidity function to determine whether the state error message gets displayed.
    setElemValidity(id, valid, message);
}

function checkFormat(id, message, regex) {
    // This function applies a regex to determine if an element is valid.
    let elem = document.getElementById(id);
    let value = elem.value;
    // Test the element value against the regex, set valid to true if it passes.
    let valid = regex.test(value);
    // If the element (email, zip code, or phone) is valid, call setElemValidity. 
    setElemValidity(id, valid, message);
    return valid;
}

function checkRequired(id, message) {
    // This function makes sure that each input entry is not empty. 
    let elem = document.getElementById(id);
    let valid = false;
    let type = elem.type;
    // Switch between text input and checkbox input, check both.
    switch (type) {
        case 'text':
            // If input is not empty, set valid to true
            if (elem.value !== '') {
                valid = true;
            }
            break;
        case 'checkbox':
            // Get array of all checked checkboxes.
            let checkboxes = document.querySelectorAll(`input[type="checkbox"]:checked`);
            // If the array length is > 0, at least one checkbox has been checked.
            if (checkboxes.length > 0) {
                valid = true;
            }
            break;
    }
    // Call the setElemValidity function to determine whether the state error message gets displayed.
    setElemValidity(id, valid, message);
    return valid;
}

function setElemValidity(id, valid, message) {
    // This function gets an element, checks its valdity, and displays an error for invalid entries.
    let elem = document.getElementById(id);
    let errorDiv = elem.parentElement.querySelector('.errorMsg');
    // If the element is valid.
    if (valid) {
        elem.setCustomValidity(''); //Set to no error message and field gets 'valid' stat.
    } 
    // If the element is invalid.
    else {
        elem.setCustomValidity(message); //Set error message and field gets 'invalid' stat
        // Insert the error message into the error div.
        errorDiv.textContent = message;
    }
}
