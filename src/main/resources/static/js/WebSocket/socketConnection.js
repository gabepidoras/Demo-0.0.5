const SocketManager = {
    stompClient: null,
    reconnectDelay: 5000,

    subscriptions: [
        {
            topic: '/topic/threads',
            handler: 'addNewThreadToList',
            json: true
        },
        {
            topic: '/topic/threads/delete',
            handler: 'removeThreadFromUI',
            json: false
        },
        {
            topic: '/topic/threads/edit',
            handler: 'updateThreadInUI',
            json: true,
            transform: (d) => [d.id, d.title]
        },
        {
            topic: '/topic/posts',
            handler: 'addNewPostToThreadUI',
            json: true
        },
        {
            topic: '/topic/posts/delete',
            handler: 'removePostFromUI',
            json: false
        },
        {
            topic: '/topic/posts/edit',
            handler: 'updatePostInUI',
            json: true,
            transform: (d) => [d.id, d.content]
        }
    ],

    init() {
        console.log("🔌 WebSocket に接続中…");
        const socket = new SockJS('/ws-guide');
        this.stompClient = Stomp.over(socket);

        this.stompClient.debug = null;

        this.stompClient.connect({},
            (frame) => this.onConnect(frame),
            (error) => this.onError(error)
        );
    },

    onConnect(frame) {
        console.log('✅ WebSocket に接続しました!');

        this.subscriptions.forEach(sub => {
            this.stompClient.subscribe(sub.topic, (response) => {
                this.handleMessage(sub, response);
            });
        });
    },

    onError(error) {
        console.error('❌ WebSocket エラー、または接続が切断されました:', error);
        console.log(`⏳ ${this.reconnectDelay / 1000} 秒後に再接続を試みます...`);

        setTimeout(() => this.init(), this.reconnectDelay);
    },

    handleMessage(sub, response) {
        const func = window[sub.handler];

        if (typeof func !== 'function') {
            console.warn(`⚠️ ハンドラ関数 '${sub.handler}' が見つかりません！`);
            return;
        }

        try {
            let data = response.body;

            if (sub.json) {
                data = JSON.parse(data);
            }

            if (sub.transform) {
                const args = sub.transform(data);
                func(...args);
            } else {
                func(data);
            }
        } catch (e) {
            console.error(`❌ ${sub.topic} からのメッセージ処理中にエラーが発生しました:`, e);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    SocketManager.init();
});

function formatDate(date) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function highlightElement(element) {
    element.style.color = '#00ffff';
    element.style.transition = 'color 1s ease';
    setTimeout(() => { element.style.color = ''; }, 1000);
}