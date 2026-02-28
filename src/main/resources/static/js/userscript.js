function toggle(id) {
    document.getElementById('login').className = 'form-container';
    document.getElementById('reg').className = 'form-container';
    document.getElementById(id).className = 'form-container active';
}

// --- ВАЛИДАЦИЯ ---

function validateUser() {
    const input = document.getElementById('regUser');
    const msg = document.getElementById('msgUser');
    const val = input.value;

    if (val.length > 0 && (val.length < 3 || val.length > 15)) {
        setStatus(input, msg, false);
    } else if (val.length >= 3) {
        setStatus(input, msg, true);
    } else {
        resetStatus(input, msg);
    }
}

function validatePass() {
    const input = document.getElementById('regPass');
    const msg = document.getElementById('msgPass');
    const val = input.value;

    if (val.length > 0 && val.length < 6) {
        setStatus(input, msg, false);
    } else if (val.length >= 6) {
        setStatus(input, msg, true);
    } else {
        resetStatus(input, msg);
    }
    validateConfirm();
}

function validateConfirm() {
    const pass = document.getElementById('regPass').value;
    const confirmInput = document.getElementById('regConfirm');
    const msg = document.getElementById('msgConfirm');
    const val = confirmInput.value;

    if (val.length > 0) {
        if (val !== pass) {
            setStatus(confirmInput, msg, false);
        } else {
            setStatus(confirmInput, msg, true);
        }
    } else {
        resetStatus(confirmInput, msg);
    }
}

function setStatus(field, msgSpan, isValid) {
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        msgSpan.style.display = 'none';
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        msgSpan.style.display = 'block';
    }
}

function resetStatus(field, msgSpan) {
    field.classList.remove('invalid');
    field.classList.remove('valid');
    msgSpan.style.display = 'none';
}