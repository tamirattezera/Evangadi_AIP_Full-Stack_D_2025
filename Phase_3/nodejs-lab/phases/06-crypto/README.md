# Phase 06 — Node.js Crypto Module

> Cryptographic Foundations for Secure Full-Stack Systems

---

## Overview

Phase 06 introduces Node.js's built-in `crypto` module and establishes the
cryptographic foundations required for building secure backend systems.

The goal is not to become a cryptographer.

The goal is to understand the engineering problems that cryptographic
primitives solve and to use Node.js cryptographic APIs correctly.

This phase focuses on:

- Cryptographic hashing
- File integrity
- Secure random values
- UUID generation
- Encoding
- HMAC
- Encryption and decryption
- Password security
- Secrets and tokens
- Cryptographic decision-making

The concepts introduced here will later support authentication, APIs,
webhooks, sessions, secure identifiers, and AI-powered applications.

---

# Learning Philosophy

This phase follows the same engineering progression used throughout the
Node.js lab:

```text
Understand
    ↓
Experiment
    ↓
Implement
    ↓
Validate
    ↓
Apply
    ↓
Engineer
```

Each concept is first explored in isolation.

The examples demonstrate the native Node.js API.

The exercises then combine multiple concepts into small utilities.

Later phases will apply these foundations to real backend systems.

---

# Learning Objectives

By the end of this phase, the learner should be able to:

- Explain what cryptographic hashing is.
- Explain the difference between hashing and encryption.
- Generate cryptographically secure random values.
- Generate UUIDs.
- Understand hexadecimal and Base64 encoding.
- Generate and verify HMAC signatures.
- Understand symmetric encryption and decryption.
- Understand why passwords should not be stored as plaintext.
- Distinguish passwords, tokens, hashes, encryption keys, and signatures.
- Recognize common cryptographic mistakes.
- Select an appropriate primitive for a specific engineering problem.
- Use Node.js's built-in `crypto` module safely.

---

# Why Crypto Matters

Modern applications constantly handle information that should not be trusted,
exposed, or modified without detection.

Examples include:

```text
Passwords
API keys
Session tokens
Webhook payloads
Authentication credentials
Private user information
Financial information
AI service credentials
Database credentials
Uploaded files
Configuration secrets
```

A secure system therefore needs mechanisms for:

```text
Confidentiality
Integrity
Authentication
Unpredictability
Identity
```

Cryptography provides many of the primitives used to achieve these properties.

---

# Core Mental Model

Do not think of the `crypto` module as a collection of unrelated methods.

Think in terms of security problems.

```text
Problem
   ↓
Security requirement
   ↓
Cryptographic primitive
   ↓
Node.js API
```

For example:

```text
Detect whether data changed
        ↓
Integrity
        ↓
Hash
        ↓
crypto.createHash()
```

Or:

```text
Generate an unpredictable token
        ↓
Unpredictability
        ↓
Cryptographically secure randomness
        ↓
crypto.randomBytes()
```

---

# Hashing vs Encryption vs HMAC

One of the most important concepts in this phase is understanding that these
operations solve different problems.

## Hashing

Hashing produces a deterministic fingerprint of data.

```text
Input
  ↓
Hash function
  ↓
Fixed-size digest
```

Example:

```text
"hello"
   ↓
SHA-256
   ↓
digest
```

Common uses:

- File integrity
- Data fingerprints
- Content identification
- Password verification when used with an appropriate password-hashing
  algorithm

---

## Encryption

Encryption protects confidentiality.

```text
Plaintext
   ↓
Encryption + key
   ↓
Ciphertext
```

The ciphertext can later be decrypted using the appropriate key.

Common uses:

- Sensitive stored information
- Protected communication
- Confidential application data

---

## HMAC

HMAC combines a secret key with a message to produce an authentication tag.

```text
Secret key
     +
Message
     ↓
    HMAC
     ↓
Signature
```

Common uses:

- Webhook verification
- API request authentication
- Message integrity
- Service-to-service authentication

---

# Phase Architecture

```text
06-crypto/
│
├── README.md
│
├── notes.md
│
├── examples/
│   │
│   ├── 01-hash.js
│   ├── 02-hash-file.js
│   ├── 03-random-bytes.js
│   ├── 04-random-uuid.js
│   ├── 05-encoding.js
│   ├── 06-hmac.js
│   ├── 07-encryption.js
│   ├── 08-decryption.js
│   └── 09-password-hashing.js
│
└── exercises/
    │
    ├── 01-file-integrity.js
    ├── 02-secure-token.js
    ├── 03-webhook-signature.js
    ├── 04-secret-manager.js
    └── 05-password-security.js
```

---

# Examples

The `examples/` directory contains focused experiments.

Each file should answer one technical question.

---

## 01 — Hashing

File:

```text
examples/01-hash.js
```

Concepts:

- `crypto.createHash()`
- SHA-256
- Hash input
- Digest output
- Deterministic hashing

Engineering question:

> How can an application create a fingerprint of data?

---

## 02 — File Hashing

File:

```text
examples/02-hash-file.js
```

Concepts:

- File data
- Hashing
- File integrity
- Buffer integration

Engineering question:

> How can an application detect whether a file has changed?

---

## 03 — Secure Random Bytes

File:

```text
examples/03-random-bytes.js
```

Concepts:

- `crypto.randomBytes()`
- Cryptographically secure randomness
- Tokens
- Secrets

Engineering question:

> How can an application generate unpredictable values?

---

## 04 — UUID Generation

File:

```text
examples/04-random-uuid.js
```

Concepts:

- `crypto.randomUUID()`
- Unique identifiers
- UUIDs

Engineering question:

> How can an application generate a strong unique identifier?

---

## 05 — Encoding

File:

```text
examples/05-encoding.js
```

Concepts:

- Hexadecimal
- Base64
- Buffers
- Binary representation

Engineering question:

> How can binary data be represented safely as text?

---

## 06 — HMAC

File:

```text
examples/06-hmac.js
```

Concepts:

- `crypto.createHmac()`
- Secret keys
- Message authentication
- Signature generation
- Signature verification

Engineering question:

> How can one system verify that a message came from a trusted source
> and was not modified?

---

## 07 — Encryption

File:

```text
examples/07-encryption.js
```

Concepts:

- Symmetric encryption
- Keys
- Initialization vectors
- Cipher objects

Engineering question:

> How can sensitive data be protected from unauthorized reading?

---

## 08 — Decryption

File:

```text
examples/08-decryption.js
```

Concepts:

- Ciphertext
- Decryption
- Keys
- Initialization vectors

Engineering question:

> How can encrypted data be safely recovered?

---

## 09 — Password Security

File:

```text
examples/09-password-hashing.js
```

Concepts:

- Password handling
- Salt
- Password hashing
- Verification
- Security boundaries

Engineering question:

> How should an application protect user passwords?

---

# Exercises

Exercises combine concepts and require independent implementation.

They are intentionally more application-oriented than the examples.

---

## Exercise 01 — File Integrity

File:

```text
exercises/01-file-integrity.js
```

Build a utility that:

1. Reads a file.
2. Calculates its hash.
3. Displays the digest.
4. Calculates the hash again.
5. Determines whether the content changed.

Architecture:

```text
File
 ↓
Read
 ↓
Hash
 ↓
Digest
 ↓
Compare
 ↓
Integrity result
```

---

## Exercise 02 — Secure Token

File:

```text
exercises/02-secure-token.js
```

Build a secure token generator.

The implementation should:

- Generate cryptographically secure random data.
- Encode the result.
- Allow configurable token length.
- Return the generated token.

Possible applications:

```text
Password reset
Email verification
Session identifiers
Invitation links
API credentials
```

---

## Exercise 03 — Webhook Signature

File:

```text
exercises/03-webhook-signature.js
```

Build a simplified webhook verification system.

Architecture:

```text
Payload
   +
Secret
   ↓
HMAC
   ↓
Signature
   ↓
Verification
```

The system should demonstrate both:

```text
Generate signature
Verify signature
```

This exercise introduces a pattern commonly used by payment systems,
webhooks, and service integrations.

---

## Exercise 04 — Secret Manager

File:

```text
exercises/04-secret-manager.js
```

Build a small utility that demonstrates secure handling of application
secrets.

The exercise should reinforce the distinction between:

```text
Secret
Token
Hash
Encryption key
Configuration
```

The goal is not to build a production secrets manager.

The goal is to understand the architecture of secret handling.

---

## Exercise 05 — Password Security

File:

```text
exercises/05-password-security.js
```

Build a small password-verification demonstration.

The system should demonstrate:

```text
Password
   ↓
Password hashing
   ↓
Stored representation
   ↓
Verification attempt
   ↓
Match / mismatch
```

The exercise should emphasize that passwords must not be stored as plaintext.

---

# Important Security Distinctions

These concepts must remain separate.

| Concept       | Purpose                     |
| ------------- | --------------------------- |
| Hash          | Integrity / fingerprint     |
| Password hash | Password verification       |
| Encryption    | Confidentiality             |
| HMAC          | Authentication + integrity  |
| Random bytes  | Secure unpredictable values |
| UUID          | Unique identifier           |
| Encoding      | Representation of data      |
| Secret key    | Cryptographic secret        |

A common engineering mistake is selecting a primitive because its name sounds
appropriate rather than because it solves the actual security requirement.

---

# Common Mistakes

## Storing Plaintext Passwords

Bad:

```javascript
const password = "mypassword123";
```

Passwords should never be stored directly.

---

## Using Ordinary Randomness for Security

Do not assume that a general-purpose random function is suitable for security
tokens.

Security-sensitive randomness should use cryptographically secure APIs.

---

## Treating Hashing as Encryption

A hash cannot simply be "decrypted."

```text
Hashing ≠ Encryption
```

---

## Hardcoding Secrets

Avoid:

```javascript
const secret = "my-secret-key";
```

inside application source code.

Later phases will introduce proper environment and secret-management patterns.

---

## Creating Custom Cryptography

Do not invent your own:

```text
Hash algorithm
Encryption algorithm
Token algorithm
Authentication scheme
```

Use established cryptographic primitives and well-reviewed libraries/APIs.

---

# AI Engineering Connection

Cryptography is also part of AI product engineering.

An AI-powered system may interact with:

```text
LLM APIs
Embedding APIs
Vector databases
Payment systems
OAuth providers
Cloud services
Webhooks
User accounts
Private documents
```

These systems introduce security boundaries.

For example:

```text
User
 ↓
Application
 ↓
Authentication
 ↓
Authorization
 ↓
AI service
 ↓
Private data
```

Cryptographic primitives can support:

```text
API authentication
Webhook verification
Secure tokens
Secret protection
File integrity
Encrypted sensitive data
```

The important principle is:

> AI intelligence does not remove traditional application-security requirements.

In fact, AI systems often increase the importance of protecting data, credentials,
and external service integrations.

---

# Connection to the Node.js Roadmap

The previous phases established the runtime foundation:

```text
00-node-runtime
      ↓
01-modules
      ↓
02-path
      ↓
03-os
      ↓
04-process
      ↓
05-url
```

Phase 06 adds security primitives:

```text
06-crypto
```

Later these concepts will connect to:

```text
07-file-system
      ↓
08-events
      ↓
09-buffers
      ↓
10-streams
      ↓
11-http-server
      ↓
13-express
      ↓
14-rest-api
      ↓
16-authentication
```

The eventual architecture becomes:

```text
HTTP Request
     ↓
URL / Router
     ↓
Authentication
     ↓
Authorization
     ↓
Business Logic
     ↓
Database / AI Services
     ↓
Response
```

Crypto therefore isn't an isolated topic.

It becomes part of the security foundation underneath the later backend phases.

---

# Engineering Standard

Each example should answer:

```text
What problem does this solve?
        ↓
What primitive solves it?
        ↓
Which Node.js API implements it?
        ↓
What are the security assumptions?
        ↓
Where would this appear in a real system?
```

Each exercise should answer:

```text
Can the concept be implemented?
        ↓
Can it be tested?
        ↓
Can it be separated into reusable logic?
        ↓
Can it be applied to a realistic backend problem?
```

---

# Completion Criteria

Phase 06 is complete when the learner can confidently explain:

- What hashing does.
- Why hashes cannot be decrypted.
- Why passwords require specialized password-hashing approaches.
- Why cryptographically secure randomness matters.
- When to use HMAC.
- When encryption is appropriate.
- The difference between confidentiality and integrity.
- Why secrets should not be hardcoded.
- Why encoding is not encryption.
- How cryptography fits into authentication and backend architecture.

The final goal is not memorizing the `crypto` API.

The final goal is being able to look at a security requirement and reason:

```text
Security requirement
        ↓
Correct cryptographic primitive
        ↓
Correct Node.js API
        ↓
Correct implementation
        ↓
Secure system
```

---

# Phase 06 → Engineering Mindset

The most important lesson of this phase is simple:

> **Security starts with choosing the correct primitive for the problem.**

A strong engineer does not ask:

```text
"What crypto function should I use?"
```

A stronger engineer asks:

```text
"What security property does this system require?"
```

Then selects the appropriate primitive.

That distinction becomes increasingly important as systems move from simple
scripts to production APIs, authentication systems, distributed services,
and AI-powered products.

---

# Next

Start with:

```text
examples/01-hash.js
```

## Lesson 01

**Cryptographic Hashing with `crypto.createHash()`**

The lesson will focus on understanding:

```text
Input
  ↓
Hash Function
  ↓
Digest
```

before moving into file integrity, secure tokens, HMAC, encryption, and
authentication.
