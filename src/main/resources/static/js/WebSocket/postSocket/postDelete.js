function deletePost(id) {
    if (!confirm("このメッセージを削除しますか？")) return;
    fetch('/post/delete/' + id, { method: 'POST' })
        .catch(err => alert("Connection error"));
}

function removePostFromUI(postId) {
    const cleanId = String(postId).replace(/[^0-9]/g, '');
    const postElement = document.getElementById('post-' + cleanId);

    if (postElement) {
        postElement.style.transition = "all 0.4s ease";
        postElement.style.opacity = "0";
        postElement.style.transform = "translateX(20px)";
        setTimeout(() => postElement.remove(), 400);
    }
}