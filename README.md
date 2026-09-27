## So sánh lựa chọn Zustand store so với Redux Toolkit

Việc chọn **Zustand** cho tính năng "Sản phẩm yêu thích" mang lại sự tinh gọn tối đa vì không cần khai báo slice, actions, reducer riêng hay bọc `<Provider>` quanh ứng dụng. Component chỉ cần gọi hook `useFavoritesStore` với selector để truy xuất và cập nhật state trực tiếp, giúp mã nguồn ngắn hơn đáng kể và tự động tối ưu re-render.

Tuy nhiên, so với Redux Toolkit, Zustand không có cấu trúc phân lớp nghiêm ngặt, thiếu hệ sinh thái middleware mạnh mẽ (như logger, saga) và quản lý async thunk chuẩn hóa theo 3 trạng thái. Do đó, giải pháp kết hợp song song: dùng Redux Toolkit cho luồng nghiệp vụ phức tạp (giỏ hàng, đơn hàng) và dùng Zustand cho module phụ độc lập (yêu thích) là mô hình lý tưởng và thực tế.
