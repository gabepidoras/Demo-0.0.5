window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const errorParams = ['error', 'auth_error'];

    let hasError = errorParams.some(param => urlParams.has(param));

    // if (window.location.search.includes('error=auth_required') || window.location.search.includes('error=true')) {
    if (hasError) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path: cleanUrl}, '', cleanUrl);
    }

    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        const validationErrors = document.querySelectorAll('.valid-error');
        validationErrors.forEach(err => err.style.display = 'none');
    }
    // const alerts = document.querySelectorAll('.error-alert, [id^="msg"], .js-error, .error-hint');
    //
    // if (alerts.length > 0) {
    //     setTimeout(() => {
    //         alerts.forEach(alert => {
    //             alert.style.transition = "opacity 0.5s ease";
    //             alert.style.opacity = "0";
    //             setTimeout(() => alert.style.display = "none", 500);
    //         });
    //     }, 5000);
    // }
};