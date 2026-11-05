# Đếm ngược Tết Âm lịch

Trang web đếm ngược đến giao thừa Tết Âm lịch theo giờ Việt Nam (UTC+7). Giao diện tông xanh nước biển, cập nhật ngày, giờ, phút, giây mỗi giây. Không dùng thư viện ngoài.

Mốc gần nhất sau ngày 5/11/2026 là **Tết Đinh Mùi**, Mùng 1 vào **Thứ Bảy, 6 tháng 2 năm 2027**.

## Cách chạy

Mở `index.html` trực tiếp trong trình duyệt.

Hoặc vào đường link: https://anpham-sudo.github.io/DEM-NGUOC-TET-AM-LICH/DemNguocTET/



## Cấu trúc

| File | Vai trò |
| --- | --- |
| `index.html` | Khung trang: tiêu đề, bốn ô đếm, lời chúc và các nút |
| `style.css` | Giao diện xanh biển, đèn lồng, hoa rơi, hiệu ứng khi rê chuột vào nút |
| `app.js` | Lịch Tết, logic đếm ngược và xử lý nút bấm |

## Chức năng

- Đếm tới 00:00 ngày Mùng 1 theo múi giờ `Asia/Ho_Chi_Minh`.
- Tự chọn mốc Tết kế tiếp trong danh sách từ 2026 đến 2036.
- Trong 24 giờ đầu của Mùng 1, đồng hồ về `00` và hiện **Chúc Mừng Năm Mới!**
- **Lời chúc** lần lượt hiện ba câu chúc.
- **Sao chép** chép tên Tết và số ngày còn lại, rồi đổi nhãn thành “Đã chép”.
- **Hoa rơi** tắt hoặc bật lại cánh hoa trên nền.

## Thêm mốc Tết

Sửa mảng `TET_DATES` trong `app.js`. Mỗi phần tử cần giờ giao thừa kèm offset `+07:00`:

```js
{ at: "2037-02-15T00:00:00+07:00", name: "Tết Đinh Tỵ", year: "Năm Tỵ" }
```

Khi đã qua mốc cuối trong danh sách, trang báo hết dữ liệu và nhắc bổ sung năm mới.
