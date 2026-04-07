# RubyGYM

Fitness center management system with integrated security testing in CI/CD pipeline.

## Team - Project 12

| Name | Role |
|------|------|
| Vũ Văn Nam | Project Manager, CI/CD & Security |
| Nguyễn Công Sơn | Backend Developer |
| Trần Bình Minh | Frontend / UI Designer |
| Dương Ngô Hoàng Vũ | Business Analyst / Tester |
| Chu Văn An | Database / DevOps |

**Course:** Introduction to Software Engineering (IT3180)  
**Instructor:** Dr. Bùi Thị Mai Anh  
**Institution:** SOICT - Hanoi University of Science and Technology

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Security Tools:** Semgrep (SAST), OWASP ZAP (DAST), Trivy (Container Scan)

## Project Structure

```
rubygym/
├── backend/           # Node.js + Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middlewares/
│   │   └── config/
│   └── tests/
├── frontend/          # React app
├── docker/            # Docker configs
├── .github/workflows/ # CI/CD pipeline
└── docs/              # UML, reports, slides
```

## Getting Started

```bash
# Clone
git clone https://github.com/vuvannam12082005/rubygym.git
cd rubygym

# Backend
cd backend
npm install
npm run dev

# Docker
docker-compose up -d
```

## Security Pipeline

This project integrates automated security scanning into the CI/CD pipeline:

- **SAST:** Semgrep scans source code on every push
- **Container Scan:** Trivy scans Docker images for vulnerabilities
- **DAST:** OWASP ZAP scans running application on staging
