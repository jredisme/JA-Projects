/*
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that if I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.

--CHANGES--
Added event listener for form validation
*/

/*
Event listener for visitor form
*/
document.addEventListener("DOMContentLoaded", function() {
    initialValidate("visitor-form")
});


function showSection(Id) {
    // This function shows the section that corresponds to the clicked link.
    // It also sets the fontWeight for the clicked link to bold. 
    // Also, it initially sets all section displays to none and 
    // it sets all font-weights to normal 
    const sections = document.getElementsByTagName('section');
    // Hide all sections
    for (const section of sections) {
        section.style.display = 'none';
    };
    // Reset the font-weight and color for all links
    const links = document.getElementsByTagName('a');
    for (const link of links) {
        link.style.fontWeight = 'normal';
        link.style.color = 'white';
    };
    // Show the content for the clicked section
    const clickedSection = document.getElementById(Id);
        clickedSection.style.display = 'block';
    // Make the clicked link text bold and grey
    //Uses template literal to find the correct ID
    const clickedLink = document.querySelector(`a[href="#${Id}"]`);
        clickedLink.style.fontWeight = 'bold';
        clickedLink.style.color = 'grey';
}

function toggleTheme() {
    // This function toggles the site theme between "dark" and "light" mode
    // It changes the stylesheet by changing the link href attribute
    const themeStyle = document.getElementById('theme');
    //If the stylesheet is currently set to default (dark)
    if (themeStyle.getAttribute('href') == 'CSS/main.css') {
        themeStyle.setAttribute('href', 'CSS/light.css');
    }
    else {
        themeStyle.setAttribute('href', 'CSS/main.css');
    }
}


