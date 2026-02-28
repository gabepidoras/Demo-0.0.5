# 🎓 Graduation Project: Modernized Real-time Bulletin Board (掲示板)
### 東京テクニカルカレッジ 卒業制作 — レガシー技術のモダン化とリアルタイム通信の実装

This is a completed **Real-time Bulletin Board (掲示板)** application. 
The project showcases the transition from legacy Java tech (JDBC、JSP、Servlet) to a modern architecture using **Spring Boot 4**, **Java 21**, and **WebSockets** for instant content delivery without page refreshes.

このプロジェクトは、東京テクニカルカレッジの卒業制作として完成した「リアルタイム掲示板」です。
授業で習得したレガシー技術（JDBC、JSP、Servlet）から、最新の **Spring Boot 4**、**Java 21**、および **WebSocket** を用いた現代的な設計へと進化させ、ページ更新なしで投稿が反映される双方向通信を実現しました。

---

## 🚀 Technical Evolution / 技術的進化のポイント
| Feature / 機能 | Legacy (Curriculum / 旧来) | Modern (This Project / 本プロジェクト) |
| :--- | :--- | :--- |
| **Communication** | Classic HTTP (Request-Response) | **WebSockets (Real-time / 双方向通信)** |
| **Persistence** | JDBC (Manual SQL) | **Spring Data JPA / Hibernate** |
| **View Engine** | JSP (Java Server Pages) | **Thymeleaf + JavaScript (Dynamic UI)** |
| **Language** | Java 8 / 11 | **Java 21 (LTS)** |
| **Validation** | Manual string checks | **Hibernate Validator & JS Client-side** |
| **Security** | Plain Text / web.xml | **Spring Security & BCrypt Hashing** |

---

## 🛠 Tech Stack / 使用技術

### Backend / バックエンド
- **Language:** Java 21 (LTS)
- **Framework:** Spring Boot 4.0.2
- **Security:** Spring Security (Session-based, BCrypt Hashing)
- **Database:** MySQL 8 (Spring Data JPA, Hibernate)
- **Real-time:** Spring WebSocket (STOMP)

### Frontend / フロントエンド
- **Language:** JavaScript (ES6+)
- **Protocol:** STOMP.js & SockJS (Real-time Communication) / 非同期通信・DOM操作
- **Styling:** HTML5 & CSS3 (Modern UI/UX)
- **View Engine:** Thymeleaf (Server-Side Rendering)

---

## 📑 Core Features (Completed) / 実装済み機能

### 1. Real-time Communication / リアルタイム通信 (WebSocket)
- [x] **Live Post Updates:** New messages appear instantly on all clients via WebSocket. / WebSocketにより、リロードなしで新規投稿が全ユーザーに即時反映。
- [x] **Dynamic DOM Manipulation:** JavaScript handles real-time content injection without refreshing. / JSによるDOM操作で、スムーズなユーザー体験を実現。

### 2. Authentication & Security / 認証とセキュリティ
- [x] **Secure Access:** Login/Registration managed by Spring Security. / セキュアなログイン・ユーザー管理。
- [x] **Password Protection:** BCrypt hashing for sensitive data. / BCryptによるパスワードの暗号化。
- [x] **CSRF Safety:** Prevention of malicious cross-site requests. / 不正リクエスト防止。

### 3. Data Integrity & Validation / バリデーション (入力検証)
- [x] **Dual-layer Validation:** 
    - **Server:** Java Bean Validation (`@Valid`, `@NotBlank`). / サーバー側での厳格な検証。
    - **Client:** Real-time JavaScript checks for improved UX. / JSによるフロントエンドでの入力チェック。
- [x] **Custom Error Messaging:** User-friendly alerts for invalid inputs. / 入力エラー時の分かりやすい通知。

### 4. Database & Forum Logic / データベースと掲示板機能
- [x] **CRUD Operations:** Full management of threads and comments. / スレッド・コメントの作成・取得・編集・削除機能。
- [x] **JPA Relations:** Optimized User-Post mapping. / JPAによるユーザーと投稿の効率的な紐付け。

---

## ⚙️ Getting Started / 起動方法

### 1. Database Setup / データベースの設定
Create a MySQL schema / MySQLでスキーマを作成します:
```sql
CREATE DATABASE demo_forum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
