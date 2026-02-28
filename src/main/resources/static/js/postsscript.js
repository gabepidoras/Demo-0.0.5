function togglePosts(button) {
    const threadId = button.getAttribute('data-thread-id');
    const container = document.getElementById('posts-container-' + threadId);

    if (container.style.display === 'none') {
        container.style.display = 'block';
        button.style.transform = 'rotate(180deg)';
    } else {
        container.style.display = 'none';
        button.style.transform = 'rotate(0deg)';
    }
}