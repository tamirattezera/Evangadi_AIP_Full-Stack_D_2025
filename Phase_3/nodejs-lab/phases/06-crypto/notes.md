# Phase 06 — Node.js Crypto Notes

## 1. What Is the `crypto` Module?

The Node.js `crypto` module provides built-in cryptographic functionality.

```javascript
import crypto from "crypto";
```

No external package is required for the core APIs covered in this phase.

The module provides functionality for:

- Hashing
- HMAC
- Secure random values
- UUID generation
- Encryption
- Decryption
- Key derivation
- Digital signatures
- Signature verification

The important engineering principle is:

> Do not choose a cryptographic API first. Identify the security requirement first.

---

# 2. Core Mental Model

Think about cryptography in terms of security properties.

```text
Security Problem
       ↓
Security Property
       ↓
Cryptographic Primitive
       ↓
Node.js API
```

Examples:

```text
Detect whether data changed
       ↓
Integrity
       ↓
Hash
       ↓
crypto.createHash()
```

```text
Generate an unpredictable token
       ↓
Unpredictability
       ↓
Secure Randomness
       ↓
crypto.randomBytes()
```

```text
Verify that a message came from a trusted service
       ↓
Authentication + Integrity
       ↓
HMAC
       ↓
crypto.createHmac()
```

```text
Protect data from being read
       ↓
Confidentiality
       ↓
Encryption
       ↓
Cipher API
```

---

# 3. Hashing

A cryptographic hash transforms input data into a fixed-size digest.

```text
Input
  ↓
Hash Function
  ↓
Digest
```

Example:

```javascript
import crypto from "crypto";

const hash = crypto.createHash("sha256").update("Hello World").digest("hex");

console.log(hash);
```

Important properties:

- Deterministic
- One-way
- Fixed output size for a given algorithm
- Small input changes produce significantly different outputs

---

# 4. `crypto.createHash()`

Basic structure:

```javascript
crypto.createHash("sha256").update(data).digest("hex");
```

The stages are:

```text
createHash()
      ↓
Select algorithm

update()
      ↓
Provide data

digest()
      ↓
Produce final hash
```

Example:

```javascript
const hash = crypto.createHash("sha256").update("Tamirat").digest("hex");
```

---

# 5. Deterministic Hashing

The same input produces the same hash.

```javascript
const firstHash = crypto.createHash("sha256").update("Tamirat").digest("hex");

const secondHash = crypto.createHash("sha256").update("Tamirat").digest("hex");

console.log(firstHash === secondHash);
```

Output:

```text
true
```

This property makes hashing useful for integrity verification.

---

# 6. Hash Changes When Input Changes

These are different inputs:

```text
Hello
```

and:

```text
hello
```

Therefore:

```text
Hash("Hello") !== Hash("hello")
```

Even a tiny change can produce a substantially different digest.

This behavior is commonly described as the avalanche effect.

---

# 7. Hashing vs Encryption

This distinction must be understood clearly.

## Hashing

```text
Original Data
     ↓
   Hash
     ↓
Digest
```

The digest is not intended to be reversed into the original data.

## Encryption

```text
Plaintext
     ↓
Encryption + Key
     ↓
Ciphertext
     ↓
Decryption + Key
     ↓
Plaintext
```

Therefore:

```text
Hashing ≠ Encryption
```

Use hashing when you need a fingerprint or verification mechanism.

Use encryption when you need confidentiality and the original data must later
be recovered.

---

# 8. Hashing and File Integrity

A file can be represented by its hash.

```text
File
 ↓
Hash
 ↓
Digest
```

Example:

```javascript
import fs from "fs";
import crypto from "crypto";

const data = fs.readFileSync("example.txt");

const hash = crypto.createHash("sha256").update(data).digest("hex");

console.log(hash);
```

If the file changes:

```text
Original File
     ↓
   Hash A

Modified File
     ↓
   Hash B
```

Then:

```text
Hash A !== Hash B
```

This allows an application to detect changes.

---

# 9. Hashing and Buffers

Node.js file APIs often return a `Buffer` when no encoding is specified.

Example:

```javascript
const data = fs.readFileSync("example.txt");
```

The result is binary data.

That data can be passed directly into a hash:

```javascript
const hash = crypto.createHash("sha256").update(data).digest("hex");
```

This connects the concepts from:

```text
File System
    +
Buffers
    +
Crypto
```

---

# 10. Secure Randomness

Security-sensitive values should not depend on predictable randomness.

Node.js provides:

```javascript
crypto.randomBytes();
```

Example:

```javascript
import crypto from "crypto";

const randomValue = crypto.randomBytes(32);

console.log(randomValue);
```

The result is a `Buffer`.

---

# 11. Secure Random Tokens

Random bytes can be converted into a string.

```javascript
const token = crypto.randomBytes(32).toString("hex");

console.log(token);
```

Conceptually:

```text
Secure Random Bytes
       ↓
Encoding
       ↓
Token
```

Possible uses:

```text
Password reset token
Email verification token
Invitation token
Temporary credential
API secret
```

The security requirements of the specific application determine how the token
should be generated, stored, transmitted, and expired.

---

# 12. `randomBytes()` vs `Math.random()`

Do not use:

```javascript
Math.random();
```

for security-sensitive tokens.

For example, this is not an appropriate security-token design:

```javascript
const token = Math.random();
```

Use:

```javascript
crypto.randomBytes();
```

when cryptographically secure randomness is required.

The distinction is:

```text
General-purpose randomness
        ≠
Cryptographically secure randomness
```

---

# 13. UUID Generation

Node.js provides:

```javascript
crypto.randomUUID();
```

Example:

```javascript
const id = crypto.randomUUID();

console.log(id);
```

A UUID provides a convenient unique identifier.

Example structure:

```text
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Common uses:

- Resource identifiers
- Request IDs
- Correlation IDs
- Distributed systems
- Database identifiers

Important:

```text
Unique
    ≠
Automatically suitable for every security purpose
```

A UUID and a secure authentication token are not necessarily interchangeable.

---

# 14. Encoding

Encoding changes how data is represented.

Common encodings include:

```text
utf8
hex
base64
```

Encoding does not provide confidentiality.

```text
Encoding
    ↓
Changes representation
```

Whereas:

```text
Encryption
    ↓
Protects confidentiality
```

Therefore:

```text
Base64 ≠ Encryption
```

---

# 15. Hexadecimal Encoding

Hexadecimal represents binary data using:

```text
0-9
a-f
```

Example:

```javascript
const token = crypto.randomBytes(16).toString("hex");

console.log(token);
```

Hex is convenient because it is:

- Human-readable
- Easy to log during development
- Commonly used for hashes
- Easy to compare

---

# 16. Base64 Encoding

Base64 represents binary data using a text format.

Example:

```javascript
const value = crypto.randomBytes(16).toString("base64");

console.log(value);
```

Base64 is useful when binary data needs to be transported through systems
that expect text.

Again:

```text
Base64
   ↓
Encoding

Encryption
   ↓
Confidentiality
```

They solve different problems.

---

# 17. HMAC

HMAC means:

> Hash-based Message Authentication Code

HMAC combines:

```text
Secret Key
    +
Message
    ↓
HMAC
    ↓
Authentication Tag
```

Node.js provides:

```javascript
crypto.createHmac();
```

Example:

```javascript
import crypto from "crypto";

const secret = "my-secret";

const message = "important-payload";

const signature = crypto
  .createHmac("sha256", secret)
  .update(message)
  .digest("hex");

console.log(signature);
```

---

# 18. Why HMAC Is Useful

Imagine an external service sends a webhook:

```text
POST /webhooks/payment
```

The receiving server needs to determine:

```text
Did this message come from the trusted service?
Was the message modified?
```

The sender can calculate:

```text
Payload
   +
Secret
   ↓
HMAC
   ↓
Signature
```

The receiver performs the same calculation.

```text
Received Payload
      +
Shared Secret
      ↓
Calculate HMAC
      ↓
Compare Signatures
```

If they match:

```text
Valid
```

Otherwise:

```text
Invalid
```

---

# 19. HMAC Verification

A simplified verification flow:

```javascript
const expectedSignature = crypto
  .createHmac("sha256", secret)
  .update(message)
  .digest("hex");
```

Then compare the expected signature with the received signature.

For security-sensitive comparisons, Node.js provides:

```javascript
crypto.timingSafeEqual();
```

The exact comparison implementation should also account for equal buffer
lengths and appropriate encoding.

---

# 20. HMAC Architecture

A typical webhook flow looks like:

```text
External Service
       ↓
Payload + Secret
       ↓
     HMAC
       ↓
   Signature
       ↓
    Network
       ↓
    Backend
       ↓
Recalculate HMAC
       ↓
    Compare
       ↓
 ┌─────┴─────┐
 ↓           ↓
Valid      Invalid
 ↓           ↓
Process     Reject
```

This is authentication/integrity logic.

It is separate from URL routing.

---

# 21. Encryption

Encryption protects confidentiality.

```text
Plaintext
    ↓
Encryption
    +
Key
    ↓
Ciphertext
```

The ciphertext can later be transformed back into plaintext using the required
key and cryptographic parameters.

---

# 22. Symmetric Encryption

Symmetric encryption uses the same secret key for encryption and decryption.

```text
                 Secret Key
                     │
                     ▼
Plaintext → Encryption → Ciphertext
                     │
                     ▼
                Decryption
                     │
                     ▼
                 Plaintext
```

The secret key must be protected.

---

# 23. Initialization Vector / Nonce

Many encryption modes require an initialization vector (IV) or nonce.

Conceptually:

```text
Plaintext
    +
Secret Key
    +
IV / Nonce
    ↓
Ciphertext
```

The IV/nonce usually does not need to be secret, but it must be generated,
stored, transmitted, and reused according to the requirements of the selected
algorithm.

Do not invent your own encryption scheme.

---

# 24. Encryption vs Hashing

| Property                  | Hashing                 | Encryption               |
| ------------------------- | ----------------------- | ------------------------ |
| Reversible                | No                      | Yes                      |
| Requires secret key       | Usually no              | Yes                      |
| Primary purpose           | Integrity / fingerprint | Confidentiality          |
| Original data recoverable | No                      | Yes                      |
| Typical example           | File hash               | Protected sensitive data |

---

# 25. Password Security

Passwords require special handling.

Never store:

```text
mypassword123
```

directly in a database.

Bad:

```javascript
const user = {
  username: "tamirat",
  password: "mypassword123",
};
```

Instead, a password should be transformed using a password-hashing or
password-based key-derivation approach designed for password security.

Node.js provides APIs such as:

```javascript
crypto.scrypt();
crypto.scryptSync();
```

Specialized password-hashing libraries may also be used in production systems.

---

# 26. Password Hashing vs Normal Hashing

A general-purpose hash such as SHA-256 is extremely fast.

That is useful for integrity checks.

However, password storage requires deliberately expensive password processing
to make large-scale guessing attacks more difficult.

Therefore:

```text
File Integrity
      ↓
Fast cryptographic hash
```

while:

```text
Password Storage
      ↓
Password hashing / key derivation
      ↓
Salt + computational cost
```

Do not simply use:

```javascript
sha256(password);
```

as a complete production password-storage strategy.

---

# 27. Salt

A salt is additional random data used during password processing.

Conceptually:

```text
Password
   +
Random Salt
   ↓
Password Derivation
   ↓
Stored Verifier
```

A unique salt helps ensure that identical passwords do not automatically produce
identical stored representations.

The salt does not need to be secret.

---

# 28. Password Verification

Registration:

```text
User Password
      ↓
Password Derivation
      ↓
Stored Verifier
```

Login:

```text
Entered Password
      ↓
Password Verification
      ↓
Compare Against Stored Verifier
      ↓
Match?
```

Result:

```text
Match
  ↓
Authenticate

No Match
  ↓
Reject
```

The system should not need to decrypt the user's original password.

---

# 29. Secret vs Token

These concepts should remain separate.

## Secret

A secret is sensitive information that should remain confidential.

Examples:

```text
API key
Database password
Encryption key
Webhook secret
Signing secret
```

## Token

A token is a value used to represent something such as:

```text
Identity
Authorization
Temporary access
Verification
Session state
```

Tokens often need strong unpredictability.

---

# 30. Secrets Must Not Be Hardcoded

Avoid:

```javascript
const apiKey = "real-production-secret";
```

inside source code.

Why?

Because source code may be:

```text
Committed to Git
Pushed to GitHub
Copied to another machine
Included in backups
Viewed by collaborators
Exposed through logs
```

Later phases will introduce environment configuration and better secret
management patterns.

---

# 31. Cryptographic Primitive Selection

Use this mental table:

| Requirement                   | Typical Primitive      |
| ----------------------------- | ---------------------- |
| Detect data modification      | Hash                   |
| Generate unpredictable value  | Secure random bytes    |
| Generate unique identifier    | UUID                   |
| Verify shared-secret message  | HMAC                   |
| Protect confidentiality       | Encryption             |
| Protect passwords             | Password hashing / KDF |
| Represent binary data as text | Encoding               |

This table is a starting point, not a substitute for security design.

---

# 32. Common Mistakes

## Mistake 1 — Using Hashing as Encryption

Wrong:

```text
Hash data → expect to decrypt later
```

Hashing is not designed for recovery.

---

## Mistake 2 — Using Base64 as Security

Wrong:

```text
Base64(password)
```

Base64 is reversible encoding.

It does not protect confidentiality.

---

## Mistake 3 — Using `Math.random()` for Security Tokens

Wrong:

```javascript
const token = Math.random();
```

Use cryptographically secure randomness when unpredictability matters.

---

## Mistake 4 — Storing Plaintext Passwords

Never store:

```text
password = "mypassword123"
```

directly.

---

## Mistake 5 — Using SHA-256 Alone for Password Storage

A fast hash is not automatically a suitable password-storage algorithm.

Use a password-focused derivation/hashing approach.

---

## Mistake 6 — Hardcoding Secrets

Avoid:

```javascript
const secret = "production-secret";
```

in source code.

---

## Mistake 7 — Creating Custom Cryptography

Do not invent:

```text
Custom encryption
Custom hashing
Custom authentication
Custom token algorithm
```

Use established cryptographic primitives.

---

## Mistake 8 — Logging Secrets

Avoid:

```javascript
console.log(apiKey);
console.log(password);
console.log(encryptionKey);
```

Production logs can become a security boundary.

---

# 33. Crypto and Full-Stack Architecture

Crypto becomes more useful when combined with other Node.js modules.

For example:

```text
HTTP
 ↓
URL
 ↓
Router
 ↓
Authentication
 ↓
Authorization
 ↓
Business Logic
 ↓
Database
```

Crypto can participate at several points:

```text
Authentication
      ↓
Password verification

Webhook
      ↓
HMAC verification

Sensitive data
      ↓
Encryption

File upload
      ↓
Hash / integrity

Token generation
      ↓
Secure randomness
```

Each responsibility should remain separated.

---

# 34. Separation of Concerns

Crypto logic should not be mixed unnecessarily with business logic.

Avoid:

```text
Controller
    ↓
Everything
    ↓
Database
```

Prefer:

```text
Controller
    ↓
Service
    ↓
Crypto Utility
```

Example:

```text
Webhook Controller
       ↓
Webhook Service
       ↓
Signature Verification
       ↓
crypto
```

The router decides:

```text
Which handler?
```

The service decides:

```text
What should happen?
```

The crypto utility decides:

```text
How should the cryptographic operation be performed?
```

---

# 35. Crypto and AI Systems

AI-powered applications often interact with:

```text
LLM APIs
Embedding APIs
Vector Databases
Cloud Services
Payment Systems
OAuth Providers
Webhooks
Private Documents
User Accounts
```

This creates additional security boundaries.

Example:

```text
User
 ↓
Frontend
 ↓
Backend
 ↓
Authentication
 ↓
Authorization
 ↓
AI Service
 ↓
Private Data
```

Secrets such as AI API keys should remain on the server side.

For example:

```text
Frontend
   ↓
Backend
   ↓
AI Provider
```

not:

```text
Frontend
   ↓
AI Provider
```

when doing so would expose a private server-side API credential.

---

# 36. Crypto + URL + Process

The previous phases now begin connecting.

```text
05-url
    ↓
Parse request URL

04-process
    ↓
Understand running application

06-crypto
    ↓
Protect application boundaries
```

Later:

```text
06-crypto
    ↓
11-http-server
    ↓
14-rest-api
    ↓
16-authentication
```

The concepts will eventually work together inside a real backend.

---

# 37. Useful APIs

Core APIs for this phase:

```javascript
crypto.createHash();
```

```javascript
crypto.createHmac();
```

```javascript
crypto.randomBytes();
```

```javascript
crypto.randomUUID();
```

```javascript
crypto.scrypt();
```

```javascript
crypto.scryptSync();
```

```javascript
crypto.timingSafeEqual();
```

Encryption APIs depend on the algorithm and mode being used.

---

# 38. Example — SHA-256

```javascript
import crypto from "crypto";

const input = "Node.js Crypto";

const digest = crypto.createHash("sha256").update(input).digest("hex");

console.log(digest);
```

Flow:

```text
Input
 ↓
createHash()
 ↓
update()
 ↓
digest()
 ↓
Hash
```

---

# 39. Example — Secure Token

```javascript
import crypto from "crypto";

const token = crypto.randomBytes(32).toString("hex");

console.log(token);
```

Flow:

```text
randomBytes()
      ↓
Buffer
      ↓
hex
      ↓
Token
```

---

# 40. Example — UUID

```javascript
import crypto from "crypto";

const id = crypto.randomUUID();

console.log(id);
```

---

# 41. Example — HMAC

```javascript
import crypto from "crypto";

const secret = "application-secret";

const message = "important-payload";

const signature = crypto
  .createHmac("sha256", secret)
  .update(message)
  .digest("hex");

console.log(signature);
```

---

# 42. Engineering Questions

Before selecting a cryptographic operation, ask:

### What am I protecting?

```text
Password?
File?
Message?
Secret?
Token?
Sensitive data?
```

### What security property do I need?

```text
Integrity?
Confidentiality?
Authentication?
Unpredictability?
```

### Does the original data need to be recovered?

If yes, hashing is probably not the correct primitive.

### Does the value need to be unpredictable?

If yes, use cryptographically secure randomness.

### Does another service need to authenticate a message?

Consider HMAC or an appropriate digital-signature mechanism.

---

# 43. Key Takeaways

```text
Hashing
    ↓
Integrity / fingerprint
```

```text
Encryption
    ↓
Confidentiality
```

```text
HMAC
    ↓
Authentication + integrity
```

```text
Secure Randomness
    ↓
Unpredictable values
```

```text
UUID
    ↓
Unique identifiers
```

```text
Encoding
    ↓
Data representation
```

```text
Password Hashing / KDF
    ↓
Password verification
```

---

# 44. Final Mental Model

Do not ask:

```text
"What crypto function do I know?"
```

Ask:

```text
"What security property does this system require?"
```

Then:

```text
Security Requirement
        ↓
Correct Primitive
        ↓
Correct Node.js API
        ↓
Correct Implementation
        ↓
Secure System
```

That is the core engineering mindset for the `crypto` module.
