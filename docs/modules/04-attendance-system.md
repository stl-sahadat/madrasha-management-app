# Module 04: Attendance Matrix (দৈনিক হাজিরা ও রিপোর্ট)

## Overview
Live 1:1 reverse-engineered attendance system matching `madrasha.hostzonebd.com`.

## Routes
- `/admin/attendance/student` — Student daily attendance marking
- `/admin/attendance/student/report` — Student attendance monthly report
- `/admin/attendance/teacher` — Teacher daily attendance marking
- `/admin/attendance/teacher/report` — Teacher attendance monthly report

## Status Codes
- `উপস্থিত (Present)`
- `অনুপস্থিত (Absent)`
- `ছুটি (Leave)`
- `দেরি (Late)`

## Capabilities
- One-click "সকলকে উপস্থিত করুন" (Mark all present) quick action.
- Monthly attendance percentages and automated SMS trigger for absent students.
