

`@org/shared-fe` là thư viện dùng chung cho tất cả các ứng dụng frontend (user-ui, seller-ui, etc.) trong monorepo. Thư viện này cung cấp:

- **Types**: TypeScript type definitions
- **API Client**: Axios instance với interceptors
- **Hooks**: React Query hooks (queries & mutations)
- **Utils**: Utility functions

## 🚀 Cài đặt

Thư viện đã được cấu hình sẵn trong monorepo. Chỉ cần import:

```typescript
import { useLogin, authApi, LoginRequest } from '@org/shared-fe';
```


## 🚧 Mở rộng

Khi cần thêm API mới:

1. Thêm types vào `types/`
2. Thêm API functions vào `api/`
3. Thêm hooks vào `hooks/queries/` hoặc `hooks/mutations/`
4. Export từ `index.ts`

Tất cả apps (user-ui, seller-ui) sẽ tự động có access!
