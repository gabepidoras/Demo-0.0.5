function updatePostInUI(id, newContent) {
    const cleanId = String(id).replace(/[^0-9]/g, '');
    const postElement = document.getElementById('post-' + cleanId);

    if (postElement) {
        const contentDiv = postElement.querySelector('.js-post-content') || postElement.querySelector('.post-content');

        if (contentDiv) {
            contentDiv.textContent = newContent;
            highlightElement(contentDiv);
        }

        const editBtn = postElement.querySelector('button[data-type="post"]');
        if (editBtn) editBtn.setAttribute('data-content', newContent);
    }
}