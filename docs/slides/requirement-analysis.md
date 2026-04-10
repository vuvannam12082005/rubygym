# Slide 1 - RubyGYM

- De tai: He thong quan ly phong gym RubyGYM
- Mon hoc: IT3180 - Introduction to Software Engineering
- Muc tieu: Xay dung web app quan ly phong gym va tao quy trinh phat trien ro rang

---

# Slide 2 - Problem Statement

- Quan ly phong gym thu cong gay kho cho viec theo doi lich tap, hoi vien, goi tap
- HLV kho quan ly client, lich va danh gia hang thang
- Ban quan tri can dashboard va su kien de van hanh trung tam

---

# Slide 3 - Stakeholders

- Admin: quan ly HLV, hoi vien, su kien, dashboard
- Trainer: quan ly client, lich tap, monthly evaluation
- Member: xem lich tap, danh gia, goi tap, su kien
- Giang vien va nhom hoc tap: theo doi tien do va san pham demo

---

# Slide 4 - Scope

- Trong pham vi:
  - Auth dang ky/dang nhap
  - Trainer, member, schedule, subscription, evaluation, event
  - React frontend + Express backend + MySQL
- Ngoai pham vi:
  - Thanh toan online
  - Mobile app
  - Dinh duong, wearable, quan ly thiet bi

---

# Slide 5 - Business Rules

- Gio hoat dong: 05:00-11:30, 13:30-20:00
- Buoi tap toi da 2 gio
- Moi HLV toi da 8 gio/ngay
- Moi buoi tap toi da 3 hoi vien
- Hoi vien loyal sau 1 nam duoc tang 3 thang khi gia han
- Moi hoi vien duoc gioi thieu thanh cong tang 1 thang mien phi

---

# Slide 6 - Functional Requirements

- Quan ly tai khoan va phan quyen theo role
- Quan ly huynh luyen vien va hoi vien
- Tao/cap nhat/xoa lich tap
- Dang ky goi tap va xu ly loyalty/referral
- Tao danh gia hang thang
- Hien thi su kien cong khai

---

# Slide 7 - Non-Functional Requirements

- Giao dien don gian, de demo tren lop
- API REST su dung JWT
- SQL parameterized query
- Co the chay bang Docker Compose
- De test backend ma khong can MySQL that

---

# Slide 8 - Proposed Architecture

- Frontend: React + React Router + Axios interceptor
- Backend: Node.js + Express
- Database: MySQL
- Deploy/demo: Docker Compose
- Cau truc tach `index.js` va `server.js` de test de dang

---

# Slide 9 - Use Cases

- Admin dang nhap va quan ly toan bo tai nguyen
- Trainer tao lich tap va danh gia cho client cua minh
- Member xem thong tin ca nhan, lich tap, goi tap, danh gia
- Khach vang lai xem su kien

---

# Slide 10 - Expected Deliverables

- Web app chay duoc
- Backend CRUD day du
- Frontend co role-based routing
- Test cases, API docs, sprint plan
- Bao cao tien do cho cac moc giua ky va cuoi ky
