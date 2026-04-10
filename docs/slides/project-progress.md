# Slide 1 - RubyGYM Progress Update

- Giai doan bao cao: Week 11-12
- Muc tieu: cap nhat tien do thuc hien, demo cac module da hoan thanh, neu ro ke hoach con lai

---

# Slide 2 - Completed Modules

- Auth register/login voi JWT
- CRUD trainers, members, schedule
- CRUD subscriptions, evaluations, events
- Role-based authorization cho admin, trainer, member

---

# Slide 3 - Backend Highlights

- Express app tach `index.js` va `server.js`
- SQL dung parameterized query
- Business rules schedule da duoc validate trong API
- Subscription co loyalty + referral bonus
- Evaluation chi cho trainer danh gia dung client

---

# Slide 4 - Frontend Progress

- React app khoi tao bang create-react-app
- Router theo role
- AuthContext luu token/user
- Axios interceptor tu dong gan JWT
- Da co trang dashboard, danh sach, chi tiet, form tao moi

---

# Slide 5 - Testing Progress

- Jest + Supertest cho backend
- Mock database de khong phu thuoc MySQL that
- Da bao phu cac nhom test:
  - auth
  - trainers
  - schedule
  - subscriptions

---

# Slide 6 - Docker and Deployment

- Backend da co Dockerfile
- Frontend da co multi-stage Dockerfile
- `docker-compose.yml` da gom db, backend, frontend
- DB nap schema va seed data tu thu muc `docker/`

---

# Slide 7 - Demo Screens to Show

- Dang nhap bang admin
- Dashboard theo role
- Tao buoi tap hop le va bi chan khi sai rule
- Dang ky goi tap co bonus loyal/referral
- Xem danh sach su kien cong khai

---

# Slide 8 - Current Risks

- Frontend hien dang toi uu cho demo, chua tap trung UX nang cao
- Chua lam phan security scanning tu dong trong CI/CD o giai doan nay
- Can tiep tuc rehearsal de tranh loi luong demo

---

# Slide 9 - Plan Until Final Defense

- On dinh luong demo va seed data
- Hoan tat report va slide cuoi ky
- Chay lai test/backend build/frontend build
- Chuan bi script thuyet trinh theo role va business value

---

# Slide 10 - Request for Feedback

- UI da du de demo chua?
- Can bo sung luong nghiep vu nao truoc final?
- Co can dieu chinh chia noi dung thuyet trinh cho cac thanh vien khong?
