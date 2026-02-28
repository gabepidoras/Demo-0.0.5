function addNewPostToThreadUI(post) {
    const container = document.getElementById(`posts-container-${post.threadId}`);
    const template = document.getElementById('post-template');

    if (!container || !template) return;

    const emptyMsg = container.querySelector('.js-empty-msg'); // Добавьте этот класс в HTML или ищите по тексту
    if (emptyMsg) emptyMsg.remove();

    Array.from(container.children).forEach(el => {
        if (el.textContent.includes("最初のメッセージを投稿しよう")) el.remove();
    });

    const clone = template.content.cloneNode(true);
    const postEl = clone.querySelector('.post-item');
    postEl.id = 'post-' + post.id;

    clone.querySelector('.js-post-number').textContent = post.postNumber;
    clone.querySelector('.js-post-author').textContent = post.authorName;
    clone.querySelector('.js-post-date').textContent = post.createdAt ? formatDate(new Date(post.createdAt)) : formatDate(new Date());
    clone.querySelector('.js-post-content').textContent = post.content;

    if (typeof currentUsername !== 'undefined' && currentUsername === post.authorName) {
        const controls = clone.querySelector('.js-post-owner-controls');
        if (controls) {
            controls.style.display = 'flex';

            const editBtn = controls.querySelector('.js-post-edit-btn');
            editBtn.setAttribute('data-id', post.id);
            editBtn.setAttribute('data-content', post.content);
            editBtn.onclick = function() { openEditModal(this); };

            const deleteBtn = controls.querySelector('.js-post-delete-btn');
            deleteBtn.onclick = function() { deletePost(post.id); };
        }
    }

    const formContainer = container.querySelector('form')?.closest('div');
    if (formContainer) {
        container.insertBefore(clone, formContainer);
    } else {
        container.appendChild(clone);
    }
}