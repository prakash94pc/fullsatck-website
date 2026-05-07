# NexGen Solutions - Full Stack Website on AWS Cloud ☁️

![AWS](https://img.shields.io/badge/AWS-EC2%20%7C%20VPC%20%7C%20S3-orange)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)
![Ubuntu](https://img.shields.io/badge/OS-Ubuntu%2022.04-red)
![Nginx](https://img.shields.io/badge/Server-Nginx-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🚀 Live Demo
**Website URL:** [http://13.201.12.22](http://13.201.12.22)

---

## 📋 Project Overview

A **production-ready full-stack website** deployed on AWS cloud infrastructure with automated CI/CD pipeline. Complete client registration system with responsive modern UI.

### Key Features
- ✅ Client registration form with validation
- ✅ Responsive design (Mobile + Desktop)
- ✅ Modern UI with animations and hover effects
- ✅ Automated deployment via GitHub Actions
- ✅ Nginx web server on Ubuntu EC2
- ✅ Custom VPC with private networking

---

## 🏗️ Architecture Diagram
┌─────────────────────────────────────────────────────────────┐
│ GitHub Repository │
│ (prakash94pc/fullsatck-website) │
└────────────────────────┬────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ GitHub Actions (CI/CD) │
│ Automatically deploys on git push │
└────────────────────────┬────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ AWS Cloud │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ VPC: 10.108.0.0/24 │ │
│ │ ┌─────────────────────────────────────────────┐ │ │
│ │ │ Public Subnet (10.108.0.0/25) │ │ │
│ │ │ ┌─────────────────────────────────────┐ │ │ │
│ │ │ │ EC2 Instance (Ubuntu 22.04) │ │ │ │
│ │ │ │ Nginx Server │ │ │ │
│ │ │ │ Port 80 (HTTP) Open │ │ │ │
│ │ │ └─────────────────────────────────────┘ │ │ │
│ │ └─────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘



---

## 🛠️ Technologies Used

| Category | Technology | Version |
|----------|-----------|---------|
| **Cloud Platform** | AWS EC2, VPC , IAM ROLE | - |
| **CI/CD** | GitHub Actions | - |
| **Web Server** | Nginx | Latest |
| **Operating System** | Ubuntu | 22.04 LTS |
| **Frontend** | HTML5, CSS3, JavaScript | ES6+ |
| **Version Control** | Git & GitHub | - |

---

## 📁 Project Structure
