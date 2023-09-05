// waits for all the js to load 
window.addEventListener('load', () => {
    const btn = document.querySelector(".submitUpdate");

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // this is used to get the email input
        const email = document.querySelector('section.wrapper form .formControl input[type="email"]');
        const error = document.querySelector('section.wrapper form div.error');
        const message = document.querySelector('section.wrapper form div.error .error-message');

        if (email.value == '' || email.value == null) {
            error.style.display = "block"
            message.textContent = "Please enter email!"

            setTimeout(() => {
                error.remove();
            }, 3000);
            return;
        }
        window.location.href = `dashboard.html`;
    })

});