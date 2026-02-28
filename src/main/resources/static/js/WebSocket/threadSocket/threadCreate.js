function addNewThreadToList(thread) {
    const threadList = document.getElementById('thread-list');
    const template = document.getElementById('thread-template');

    if (!threadList || !template) return;

    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.thread-card');

    card.id = 'thread-' + thread.id;

    clone.querySelector('.js-thread-title').textContent = thread.title;
    clone.querySelector('.js-thread-author').textContent = thread.authorName;
    clone.querySelector('.js-thread-date').textContent = formatDate(new Date());

    const toggleBtn = clone.querySelector('.js-toggle-btn');
    toggleBtn.setAttribute('data-thread-id', thread.id);
    toggleBtn.onclick = function() { togglePosts(this); };

    const postsContainer = clone.querySelector('.js-posts-container');
    postsContainer.id = 'posts-container-' + thread.id;

    const replyForm = postsContainer.querySelector('form');
    if (replyForm) {
        replyForm.action = `/threads/${thread.id}/post`;
    }

    if (typeof currentUsername !== 'undefined' && currentUsername === thread.authorName) {
        const controls = clone.querySelector('.js-owner-controls');
        if (controls) {
            controls.style.display = 'flex';

            const editBtn = controls.querySelector('.js-edit-btn');
            editBtn.onclick = function() {
                openEditModal(this);
            };
            editBtn.setAttribute('data-id', thread.id);
            editBtn.setAttribute('data-content', thread.title);

            const deleteBtn = controls.querySelector('.js-delete-btn');
            deleteBtn.onclick = function() { deleteThread(thread.id); };
        }
    }

    threadList.prepend(clone);
}