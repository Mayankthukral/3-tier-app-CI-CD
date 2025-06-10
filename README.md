# 3-Tier App CI/CD

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Running Tests](#running-tests)
- [CI/CD Workflows](#cicd-workflows)
  - [Testing Workflow](#testing-workflow)
  - [Production Workflow](#production-workflow)
- [Infrastructure Management](#infrastructure-management)
- [Security Scans](#security-scans)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

This project implements a 3-tier application (frontend, backend, database) with **automated CI/CD** using **GitHub Actions**, **Terraform**, and **Helm**. Workflows are split into two pipelines for **testing** and **production** environments.

## Features

- **Automated build & test** of frontend and backend on Node.js & Python
- **SonarCloud** static code analysis
- **Docker build & push** to Docker Hub
- **Trivy** vulnerability scanning with SARIF upload
- **Terraform** provisioning of Azure AKS clusters
- **Helm** deployments: NGINX Ingress, Prometheus, Grafana
- **Separate pipelines**: `ci-testing.yml` (branch `testing`) and `ci-production.yml` (branch `master`)

## Repository Structure

```
├── .github/workflows       # CI/CD definitions
│   ├── ci-testing.yml      # Testing environment pipeline
│   └── ci-production.yml   # Production environment pipeline
├── task-manager-frontend   # Frontend app & Dockerfile
├── task-manager-backend    # Backend service & Dockerfile
├── kubernetes_manifests    # Kubernetes YAMLs and Helm templates
├── testing                 # Terraform code for testing environment
├── production              # Terraform code for production environment
├── docker-compose.yml      # Local development multi-container setup
└── README.md               # This documentation
```

## Getting Started

### Prerequisites

- Git
- Docker & Docker Compose
- Node.js v14+
- Python 3.10+
- Terraform CLI
- Azure CLI
- kubectl & Helm

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/Mayankthukral/3-tier-app-CI-CD.git
   cd 3-tier-app-CI-CD
   ```

2. Start all services locally:

   ```bash
   docker-compose up --build
   ```

3. Access:

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000/api](http://localhost:4000/api)

### Running Tests

```bash
cd task-manager-frontend && npm install && npm test
cd task-manager-backend && npm install && npm test
```

## CI/CD Workflows

### Testing Workflow

- **Trigger:** Push to `testing` branch or manual dispatch
- **Definition:** `.github/workflows/ci-testing.yml`

### Production Workflow

- **Trigger:** Push to `master` branch or manual dispatch
- **Definition:** `.github/workflows/ci-production.yml`

## Infrastructure Management

Terraform code is located in the `testing/` and `production/` directories:

```bash
terraform init
terraform validate
terraform plan
terraform apply -auto-approve
```

Secrets and tokens for Azure and Terraform are configured via GitHub Secrets.

## Security Scans

- **SonarCloud:** Configured with `SONAR_TOKEN`, organization/project keys
- **Trivy:** Scans container images and uploads SARIF reports to GitHub Security

## Deployment

After CI builds and infrastructure provisioning, Helm charts deploy:

- **NGINX Ingress** for routing
- **Prometheus** for monitoring
- **Grafana** for dashboards



