# User Service - Pure Clean Architecture with Domain Entities

## 🎯 Approach

User Service áp dụng **Pure Clean Architecture** với Domain Entities thay vì Prisma types.

---

## 📁 Cấu trúc

```
apps/user-service/src/
├── domain/
│   ├── entities/                       ← Domain models (POJOs)
│   │   ├── user.entity.ts              → UserEntity
│   │   ├── address.entity.ts           → AddressEntity
│   │   ├── city.entity.ts              → CityEntity
│   │   └── country.entity.ts           → CountryEntity
│   │
│   └── repositories/                   ← Repository interfaces
│       └── user.repository.interface.ts → IUserRepository
│
├── application/
│   ├── use-cases/                      ← Business logic
│   └── dtos/                           ← Data Transfer Objects
│
└── infrastructure/
    ├── repositories/
    │   └── prisma-user.repository.ts   ← Maps Prisma → Domain entities
    ├── http/
    └── di/
```

---

## 🔄 Data Flow

```
HTTP Request
    ↓
Controller
    ↓
Use Case (works with Domain Entities)
    ↓
Repository Interface (expects Domain Entities)
    ↓
Prisma Repository (maps Prisma types → Domain Entities)
    ↓
Prisma ORM
    ↓
Database
```

---

## 💡 Key Concept: Mapping Layer

### Repository Implementation

```typescript
// Infrastructure/Repositories/prisma-user.repository.ts

// 1. Mapper functions convert Prisma → Domain
function toDomainUser(prismaUser: User): UserEntity {
    return new UserEntity(
        prismaUser.id,
        prismaUser.email,
        prismaUser.username,
        // ... all fields
    );
}

// 2. Repository methods use mappers
export class PrismaUserRepository implements IUserRepository {
    async findById(id: number): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user ? toDomainUser(user) : null;  // ← Map!
    }
    
    async findAll(): Promise<UserEntity[]> {
        const users = await prisma.user.findMany();
        return users.map(toDomainUser);  // ← Map array!
    }
}
```

---

## ✅ Benefits

### 1. **Domain Independence**
```typescript
// Domain layer KHÔNG phụ thuộc Prisma
export interface IUserRepository {
    findById(id: number): Promise<UserEntity | null>;  // ← Domain entity, not Prisma type
}
```

### 2. **Business Logic in Entities**
```typescript
export class UserEntity {
    // Domain methods
    isActive(): boolean {
        return this.isVerified && !this.isLocked;
    }
    
    canBeDeleted(): boolean {
        return !this.hasActiveOrders();
    }
}

// Use cases can use domain methods
const user = await this.userRepository.findById(1);
if (user.isActive()) {  // ← Domain logic
    // ...
}
```

### 3. **Easy Testing**
```typescript
// Mock với Domain entities (POJOs)
const mockUser = new UserEntity(
    1,
    "test@example.com",
    "user",
    null,
    null,
    "hash",
    true,
    false,
    1n,
    new Date(),
    new Date()
);

const mockRepo: IUserRepository = {
    findById: jest.fn().mockResolvedValue(mockUser)
};
```

### 4. **Framework Agnostic**
```typescript
// Có thể thay Prisma → TypeORM mà không ảnh hưởng domain/application
class TypeORMUserRepository implements IUserRepository {
    async findById(id: number): Promise<UserEntity | null> {
        const user = await this.typeORM.findOne(User, id);
        return user ? toDomainUser(user) : null;
    }
}
```

---

## 📊 Mapping Patterns

### Pattern 1: Single Entity
```typescript
async findById(id: number): Promise<UserEntity | null> {
    const prismaUser = await prisma.user.findUnique({ where: { id } });
    return prismaUser ? toDomainUser(prismaUser) : null;
}
```

### Pattern 2: Array of Entities
```typescript
async findAll(): Promise<UserEntity[]> {
    const prismaUsers = await prisma.user.findMany();
    return prismaUsers.map(toDomainUser);
}
```

### Pattern 3: Create/Update (Entity → Prisma)
```typescript
async update(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
    // Domain entity fields → Prisma data
    const updated = await prisma.user.update({ 
        where: { id }, 
        data: data as any  // Type assertion needed
    });
    
    // Prisma result → Domain entity
    return toDomainUser(updated);
}
```

---

## 🤔 Trade-offs

### Pros ✅
- Domain layer completely independent
- Can add rich domain logic
- Easy to swap frameworks
- Better for DDD (Domain-Driven Design)
- Clearer separation of concerns

### Cons ❌
- More boilerplate code (mapper functions)
- Performance overhead (mapping)
- More complex than pragmatic approach
- Overkill for simple CRUD apps

---

## 💭 When to Use This Approach?

### Use Pure Clean Architecture when:
✓ Complex business logic  
✓ Long-term project (>2 years)  
✓ Large team  
✓ Domain-Driven Design  
✓ Need to swap frameworks  
✓ Rich domain models  

### Use Pragmatic approach when:
✓ Simple CRUD  
✓ Small project  
✓ Quick MVP  
✓ Team prefers simplicity  
✓ Trust framework won't change  

---

## 🎯 Kết luận

User Service bây giờ dùng **Pure Clean Architecture** với:
- ✅ Domain entities (not Prisma types)
- ✅ Mapper layer trong repository
- ✅ Complete domain independence
- ✅ Tuân thủ Dependency Inversion 100%

**Trade-off**: More code, but better architecture! 🚀
