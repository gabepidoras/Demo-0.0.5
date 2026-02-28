function openEditModal(button) {
    const id = button.getAttribute('data-id');
    const currentText = button.getAttribute('data-content');
    const type = button.getAttribute('data-type'); // 'thread' или 'post'

    const form = document.getElementById('editForm');
    const input = document.getElementById('editInput');
    const title = document.getElementById('modalTitle');
    const label = document.getElementById('modalLabel');

    if (type === 'thread') {
        title.innerText = "スレッド編集";
        label.innerText = "新しいタイトル:";
        form.action = "/threads/edit/" + id;
        input.name = "title";
    } else {
        title.innerText = "投稿編集";
        label.innerText = "メッセージ:";
        form.action = "/post/edit/" + id;
        input.name = "content";
    }

    input.value = currentText;
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    const modal = document.getElementById('editModal');

    if (modal) {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('editModal');

    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editForm');

    if (editForm) {
        editForm.onsubmit = function(e) {
            e.preventDefault();

            const input = document.getElementById('editInput');
            const newContent = input.value;

            const actionUrl = this.action;

            const paramName = input.name;

            const url = actionUrl + "?" + paramName + "=" + encodeURIComponent(newContent);

            fetch(url, {
                method: 'POST',
            }).then(async response => {
                if (response.ok) {
                    console.log("✅ 保存が完了しました");
                    closeEditModal();
                } else {
                    const errorType = await response.text();

                    if (errorType === "thread_too_long") {
                        alert("内容は30文字以内で入力して下さい");
                    } else if (errorType === "post_too_long") {
                        alert("内容は300文字以内で入力してください");
                    } else if (errorType === "blank") {
                        alert("内容を入力して下さい");
                    } else {
                        alert("保存のエラー: " + response.status);
                    }
                }
            }).catch(err => {
                console.error("接続のエラー:", err);
            });
        };
    }
});