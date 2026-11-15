# REST API Specification — Madrasa Management System

## Overview
All REST API endpoints are served under `/api` and accept/return `application/json`.

---

## 1. Authentication Endpoints

### 1.1 Login
- **Endpoint:** `POST /api/auth/login`
- **Rate Limit:** 5 requests per 60 seconds (IP & Account targeted)
- **Request Body:**
```json
{
  "email": "admin@gmail.com",
  "password": "admin1234",
  "remember": true
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOi...",
  "user": {
    "id": "1",
    "name": "Super Admin",
    "email": "admin@gmail.com",
    "role": "Super Admin"
  }
}
```

### 1.2 Registration
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
```json
{
  "name": "হাফেজ আযম নূর",
  "email": "azam@example.com",
  "phone": "01847657580",
  "role": "Super Admin",
  "password": "securepassword123"
}
```

### 1.3 User Profile
- **Endpoint:** `GET /api/auth/me`
- **Headers:** `Authorization: Bearer <token>`

---

## 2. Student Endpoints

### 2.1 Get Students
- **Endpoint:** `GET /api/students` or `GET /get-students`
- **Query Params:**
  - `jamat`: Filter by jamat name (e.g. `হিফজ বিভাগ`)
  - `search`: Search by student name, roll, or regNo

### 2.2 Create Student
- **Endpoint:** `POST /api/students`
- **Request Body:**
```json
{
  "name": "মুহাম্মদ আবু বকর",
  "roll": "১০১",
  "regNo": "20261089",
  "jamat": "হিফজ বিভাগ",
  "phone": "01820050095",
  "monthlyFee": 1500,
  "khurakiFee": 2000
}
```

---

## 3. Financial & Voucher Endpoints

### 3.1 Voucher Entry
- **Endpoint:** `POST /api/vouchers`
- **Request Body:**
```json
{
  "type": "deposit",
  "category": "মাসিক বেতন",
  "amount": 1500.00,
  "accountId": "cash",
  "paymentMethod": "নগদ",
  "receivedBy": "মাওলানা কফিল উদ্দিন",
  "notes": "নভেম্বর মাসের বেতন"
}
```

---

## 4. SMS Balance & Notification Endpoints

### 4.1 Check SMS Balance
- **Endpoint:** `GET /admin/settings/check-sms-balance`
- **Response (200 OK):**
```json
{
  "balance": 0.00,
  "currency": "BDT"
}
```
