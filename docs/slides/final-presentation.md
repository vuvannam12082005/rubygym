# Slide 1 - RubyGYM Final Presentation

- Team Project 12
- He thong quan ly phong gym RubyGYM
- Cong nghe: React, Express, MySQL, Docker

---

# Slide 2 - Project Goals

- Giai quyet nhu cau quan ly van hanh phong gym
- Ho tro 3 nhom nguoi dung: admin, trainer, member
- Tao mot san pham de demo ro quy trinh phat trien phan mem trong mon hoc

---

# Slide 3 - System Overview

- Frontend React voi role-based routing
- Backend Express theo REST API
- MySQL luu du lieu nghiep vu
- Docker Compose dung cho moi truong demo

---

# Slide 4 - Main Features

- Dang ky, dang nhap, JWT auth
- Quan ly trainers va members
- Quan ly schedule va rule van hanh
- Subscription voi loyalty/referral
- Monthly evaluations
- Public events

---

# Slide 5 - Business Rules Implemented

- Gio hoat dong duoc kiem tra o API lich tap
- Session toi da 2 gio
- Trainer toi da 8 gio/ngay
- Moi session toi da 3 hoi vien
- Loyal member duoc tang 3 thang
- Referral thanh cong tang 1 thang cho moi nguoi

---

# Slide 6 - Architecture and Design Choices

- Tien trinh backend don gian, de doc va de chay
- Tuyen API theo resource: `/api/trainers`, `/api/members`, ...
- Tuyen cong khai chi gom auth login/register va events GET
- Tach `index.js` de import vao test ma khong mo port

---

# Slide 7 - Demonstration Flow

- Dang nhap bang admin
- Xem dashboard va danh sach trainers/members
- Tao session moi va xem valid/invalid cases
- Dang ky subscription co bonus loyal/referral
- Xem event cong khai tren frontend

---

# Slide 8 - Quality Assurance

- Backend tests bang Jest + Supertest
- Mock DB de test route logic nhanh va on dinh
- Frontend build production thanh cong
- Docker compose config da validate thanh cong

---

# Slide 9 - Documents Delivered

- Test cases report
- Sprint plan 16 tuan / 6 sprint
- API documentation
- UML va bao cao bo sung trong thu muc docs

---

# Slide 10 - Lessons Learned

- Tach nho bai toan theo module giup de phan chia cong viec
- Role-based authorization can duoc thiet ke som
- Seed data va docs rat quan trong cho demo va thuyet trinh
- Tu dong hoa test/build giup giam loi truoc khi bao cao

---

# Slide 11 - Future Improvements

- Nang cap UI/UX
- Bo sung bo loc, tim kiem va bao cao chi tiet hon
- Tich hop security scanning vao pipeline trong giai doan tiep theo

---

# Slide 12 - Thank You

- Cam on giang vien va cac ban da lang nghe
- San sang demo va tra loi cau hoi
