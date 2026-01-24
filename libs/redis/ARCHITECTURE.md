# @org/redis Library - Repository Pattern

## 🎯 Philosophy

**@org/redis** là một **infrastructure library** cung cấp **data access layer** cho Redis.

Áp dụng **Repository Pattern** vì:
- ✅ Phần lớn code là **data access** (CRUD với Redis)
- ✅ Đây là **infrastructure layer**, không phải application layer
- ✅ Repository pattern phù hợp cho data access abstraction

---

## 📁 Cấu trúc

```
libs/redis/src/
├── interfaces/                 # Repository interfaces (contracts)
│   ├── email.interface.ts      → IEmailRepository
│   ├── otp.interface.ts        → IOtpRepository
│   └── temporary.interface.ts  → ITemporaryRepository
│
├── repositories/               # Repository implementations
│   ├── email.repository.ts     → EmailRepository
│   ├── otp.repository.ts       → OtpRepository
│   ├── temporary.repository.ts → TemporaryRepository
│   └── index.ts                → Barrel export
│
├── redis.ts                    # Redis client config
└── index.ts                    # Public exports
```

**Repository Pattern**: Encapsulates data access logic with interfaces + implementations ✅

---

## 🔌 Public API

```typescript
// Interfaces (Contracts)
export interface IEmailRepository {
    sendOtpToEmail(to: string, templateName: string): Promise<void>;
}

export interface IOtpRepository {
    findOtpByEmail(email: string): Promise<{ otp: string | null }>;
    checkOtpRestrictions(email: string): Promise<void>;
    handleFailedAttempts(email: string): Promise<void>;
    resetOTP(email: string): Promise<void>;
}

export interface ITemporaryRepository {
    getKey(key: string): Promise<string | null>;
    setKey(key: string, payload: object, options: {ex: number}): Promise<void>;
    deletePattern(pattern: string): Promise<void>;
}

// Implementations
export class EmailRepository implements IEmailRepository { }
export class OtpRepository implements IOtpRepository { }
export class TemporaryRepository implements ITemporaryRepository { }

// Redis client
export { redis } from './redis'
```

---

## 💡 Cách sử dụng

### Option 1: Direct usage
```typescript
import { EmailRepository, OtpRepository } from "@org/redis";

const emailRepo = new EmailRepository();
const otpRepo = new OtpRepository();

await emailRepo.sendOtpToEmail("user@example.com", "template");
```

### Option 2: Interface-based (Testable)
```typescript
import { 
    IEmailRepository, 
    IOtpRepository, 
    EmailRepository, 
    OtpRepository 
} from "@org/redis";

const emailRepo: IEmailRepository = new EmailRepository();
const otpRepo: IOtpRepository = new OtpRepository();

// Easy to mock in tests
const mockEmailRepo: IEmailRepository = {
    sendOtpToEmail: jest.fn()
};
```

### Option 3: With Adapter (trong Auth Service)
```typescript
// Auth service định nghĩa service port
interface IEmailService {
    sendOtpToEmail(email: string, template: string): Promise<void>;
}

// Adapter chuyển đổi Repository → Service
class RedisEmailServiceAdapter implements IEmailService {
    private emailRepo = new EmailRepository(); // từ @org/redis
    
    sendOtpToEmail(email, template) {
        return this.emailRepo.sendOtpToEmail(email, template);
    }
}
```

---

## 📦 Repositories Available

### 1. **EmailRepository**
Data access for email-based OTP operations.

```typescript
const emailRepo = new EmailRepository();
await emailRepo.sendOtpToEmail("user@example.com", "otp.template");
```

**Features**:
- Generates OTP
- Sends email
- Stores in Redis with TTL
- Implements cooldown

---

### 2. **OtpRepository**
Data access for OTP with validation and locking logic.

```typescript
const otpRepo = new OtpRepository();

// Find OTP
const { otp } = await otpRepo.findOtpByEmail("user@example.com");

// Check restrictions
await otpRepo.checkOtpRestrictions("user@example.com");

// Handle failed attempts
await otpRepo.handleFailedAttempts("user@example.com");

// Reset
await otpRepo.resetOTP("user@example.com");
```

**Features**:
- OTP retrieval
- Attempt tracking
- Auto-locking after max attempts
- Reset operations

**Note**: Contains some business logic (`handleFailedAttempts`) but this is acceptable for infrastructure repositories.

---

### 3. **TemporaryRepository**
Generic key-value data access.

```typescript
const tempRepo = new TemporaryRepository();

// Set with TTL
await tempRepo.setKey("session:123", { userId: 1 }, { ex: 3600 });

// Get
const value = await tempRepo.getKey("session:123");

// Delete
await tempRepo.deletePattern("session:123");
```

---

## 🤔 Repository vs Service?

### Repository Pattern (Used here)
**Responsibility**: Data access + minimal validation logic

```typescript
class OtpRepository {
    // ✅ Data access
    async findOtpByEmail(email) {
        return await redis.get(`otp:${email}`);
    }
    
    // ✅ Data access with validation (acceptable)
    async handleFailedAttempts(email) {
        // Increment attempts, lock if needed
        // Still focused on data operations
    }
}
```

**When to use**: Infrastructure libraries, data access layers

---

### Service Pattern
**Responsibility**: Business logic orchestration

```typescript
class OtpService {
    constructor(private otpRepo: OtpRepository) {}
    
    // ✅ Business logic
    async verifyOtp(email, otp) {
        const stored = await this.otpRepo.findOtpByEmail(email);
        
        if (stored.otp !== otp) {
            await this.otpRepo.handleFailedAttempts(email);
            throw new Error("Invalid OTP");
        }
        
        await this.otpRepo.resetOTP(email);
        return true;
    }
}
```

**When to use**: Application layer (auth-service, user-service)

---

## 🏗️ Layered Architecture

```
Auth Service (Application)
    ↓ uses
RedisEmailServiceAdapter (Infrastructure → Application Port)
    ↓ uses
EmailRepository (from @org/redis - Infrastructure Library)
    ↓ uses
Redis Client
```

**Separation**:
- `@org/redis` = Infrastructure lib (Repository pattern)
- `auth-service` = Application (Service pattern with Use Cases)

---

## ✅ Kết luận

**@org/redis** uses **Repository Pattern** vì:
- ✅ Primary focus: Data access
- ✅ Infrastructure layer
- ✅ Some business logic OK (tightly coupled with data)
- ✅ Flexible: Export interfaces + implementations

**Perfect for infrastructure libraries!** 🎯
