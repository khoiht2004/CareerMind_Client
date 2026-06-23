# Smart Recruit Assistant (CareerMind) - Frontend

## 🚀 Giới thiệu dự án

Đây là ứng dụng web Frontend (dành cho ứng viên và nhà tuyển dụng) thuộc hệ thống **Smart Recruit Assistant (CareerMind)**. Ứng dụng cung cấp giao diện trực quan, mượt mà giúp người dùng dễ dàng tương tác với các tính năng tuyển dụng và ứng tuyển.

## 🛠️ Công nghệ sử dụng

Dự án được xây dựng trên các công nghệ hiện đại nhất:

- **Core Framework:** [React 19](https://react.dev/) kết hợp build tool [Vite](https://vitejs.dev/) cho tốc độ siêu nhanh.
- **Routing:** [React Router v7](https://reactrouter.com/) quản lý điều hướng.
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & React Redux.
- **Styling & UI Components:**
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/)
  - [Radix UI](https://www.radix-ui.com/)
  - Hỗ trợ Light/Dark mode với `next-themes`.
- **Form & Validation:** [React Hook Form](https://react-hook-form.com/) kết hợp với [Zod](https://zod.dev/) để validate dữ liệu.
- **Rich Text Editor:** [Tiptap](https://tiptap.dev/) dùng để soạn thảo văn bản đa dạng.
- **Tiện ích khác:**
  - `recharts` (Vẽ biểu đồ)
  - `socket.io-client` (Kết nối Real-time)
  - `date-fns` (Xử lý thời gian)
  - `react-pdf` (Hiển thị PDF)
  - `sonner` (Hiển thị Toast Notifications)
  - `axios` (Gọi API)

## 📦 Cài đặt và Khởi chạy

### Yêu cầu môi trường

- Node.js (khuyến nghị phiên bản 18+ hoặc 20+)
- npm hoặc yarn/pnpm

### Các bước chạy dự án

1. **Di chuyển vào thư mục frontend:**

   ```bash
   cd frontend
   ```

2. **Cài đặt các gói phụ thuộc (dependencies):**

   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường**:Tạo file `.env` (dựa trên `.env.example`) và cấu hình các biến cần thiết (ví dụ: `VITE_API_URL`).

4. **Chạy server ở chế độ Development:**

   ```bash
   npm run dev
   ```

   Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173` (mặc định của Vite).

### Build cho Production

Để tối ưu hóa ứng dụng trước khi deploy:

```bash
npm run build
```

Để preview bản build ở local:

```bash
npm run preview
```

## 📐 Cấu trúc thư mục (Tham khảo)

- `/src/components`: Chứa các component UI dùng chung (Shadcn UI, v.v.).
- `/src/pages`: Các trang chính của ứng dụng.
- `/src/store`: Quản lý state toàn cục.
- `/src/assets`: Chứa hình ảnh, CSS, fonts...