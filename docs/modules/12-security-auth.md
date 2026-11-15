# Module 12: Enterprise Security & Auth (নিরাপত্তা ও অথেন্টিকেশন)

## Overview
Enterprise backend and client-side defensive security layer.

## Defense Capabilities
1. **Password Hashing**: Bcrypt with configurable salt rounds. Passwords over 128 characters are rejected to eliminate Bcrypt DoS attacks.
2. **Session Integrity**: Stateless JOSE JWT tokens with strict HMAC verification and sliding refresh.
3. **Brute-Force Rate Limiting**: Multi-dimensional IP and Account sliding window. Blocks attackers after 5 invalid attempts for 60 seconds.
4. **Anti-XSS & HTML Sanitization**: DOMPurify sanitizes user input, stripping `onload`, `onerror`, `<script>`, and SVGs.
5. **Zero Plaintext Leakage**: Serializers strip sensitive hash and salt properties before sending user objects to the client.
6. **Strict CSP & Security Headers**: Nonce-based script execution, frame restriction (`SAMEORIGIN`), XSS protection, and MIME sniffing prevention.
