function deleteThread(id) {
    if (!confirm("本当に削除しますか？")) return;

    fetch('/threads/delete/' + id, { method: 'POST' })
        .then(response => {
            if (!response.ok) alert("エラーが発生しました: " + response.status);
        })
        .catch(err => console.error(err));
}

function removeThreadFromUI(threadId) {
    const cleanId = String(threadId).replace(/[^0-9]/g, '');
    const threadCard = document.getElementById('thread-' + cleanId);

    if (threadCard) {
        threadCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        threadCard.style.opacity = '0';
        threadCard.style.transform = 'scale(0.9)';

        setTimeout(() => threadCard.remove(), 500);
    }
}