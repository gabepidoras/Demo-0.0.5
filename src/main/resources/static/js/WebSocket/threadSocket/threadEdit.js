function updateThreadInUI(id, newTitle) {
    const cleanId = String(id).replace(/[^0-9]/g, '');
    const threadCard = document.getElementById('thread-' + cleanId);

    if (threadCard) {
        const titleEl = threadCard.querySelector('.js-thread-title') || threadCard.querySelector('.thread-title');
        if (titleEl) {
            titleEl.textContent = newTitle;
            highlightElement(titleEl);
        }

        const editBtn = threadCard.querySelector('button[data-type="thread"]');
        if (editBtn) editBtn.setAttribute('data-content', newTitle);
    }
}