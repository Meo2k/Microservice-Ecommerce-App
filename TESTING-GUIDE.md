# 🧪 Testing Kafka Integration

## Bước 1: Đăng ký User mới

1. Mở browser: **http://localhost:4200/register**
2. Điền thông tin:
   - Email: `test@example.com`
   - Password: `Test123!@#`
3. Click **"Sign Up"**

## Bước 2: Kiểm tra Kafka UI

1. Mở tab mới: **http://localhost:8080**
2. Click vào **Topics** (menu bên trái)
3. Tìm topic: **`user.registered`**
4. Click vào topic đó
5. Click tab **"Messages"**
6. Bạn sẽ thấy event vừa được publish:

```json
{
  "eventType": "user.registered",
  "email": "test@example.com",
  "username": "test@example.com",
  "timestamp": "2026-02-10T10:01:00.000Z"
}
```

## Bước 3: Kiểm tra Logs

### Auth Service Log (Terminal `npm run be`)
Tìm dòng:
```
📤 Published event to topic "user.registered": user.registered
```

### Notification Service Log (Terminal `npm run be`)
Tìm các dòng:
```
✅ Consumer connected: notification-service-group
📥 Received event from topic "user.registered": user.registered
📧 Sending OTP email to test@example.com
✅ OTP email sent successfully
✅ Successfully processed event: user.registered
```

## Bước 4: Kiểm tra Email

Vào email của bạn (hoặc Ethereal nếu dùng test email) để xem OTP đã được gửi.

---

## 🛑 Cách tắt Kafka và Docker Services

### Tắt tất cả Docker services:
```bash
docker compose down
```

### Tắt và xóa volumes (clean reset):
```bash
docker compose down -v
```

### Chỉ tắt Kafka (giữ lại PostgreSQL, Redis):
```bash
docker compose stop kafka zookeeper kafka-ui
```

### Khởi động lại Kafka:
```bash
docker compose start kafka zookeeper kafka-ui
```

### Xem logs của Kafka:
```bash
docker compose logs -f kafka
```

---

## 📊 Monitor Consumer Group

### Kiểm tra consumer lag trong Kafka UI:
1. Mở http://localhost:8080
2. Click **"Consumers"** (menu bên trái)
3. Tìm group: **`notification-service-group`**
4. Xem **Lag** (phải = 0 nếu service đang chạy)

### Hoặc dùng command line:
```bash
docker exec -it ecommerce-kafka kafka-consumer-groups \
  --bootstrap-server localhost:9092 \
  --group notification-service-group \
  --describe
```

---

## ✅ Kết quả mong đợi

Sau khi đăng ký user:

1. ✅ **Frontend**: Hiển thị "Registration successful! Check your email for OTP"
2. ✅ **Auth Service**: Log "Published event to topic user.registered"
3. ✅ **Kafka**: Event xuất hiện trong topic `user.registered`
4. ✅ **Notification Service**: Log "Received event" → "OTP email sent"
5. ✅ **Email**: Nhận được OTP trong inbox

---

## 🐛 Troubleshooting

### Không thấy event trong Kafka UI?
- Kiểm tra auth-service logs có publish event không
- Refresh Kafka UI page
- Check topic có tồn tại: http://localhost:8080/ui/clusters/local/topics

### Không thấy log "Received event"?
- Kiểm tra notification-service có chạy không: `ps aux | grep notification`
- Check consumer group status trong Kafka UI
- Xem logs: `docker compose logs -f kafka`

### Email không được gửi?
- Check notification-service logs có lỗi không
- Verify Redis connection (OTP được lưu trong Redis)
- Check email configuration trong `.env`

---

## 🔄 Reset và Test lại

```bash
# 1. Tắt tất cả
docker compose down -v
npm run be  # Ctrl+C để stop
npm run fe  # Ctrl+C để stop

# 2. Khởi động lại
docker compose up -d
npm run be
npm run fe

# 3. Test lại từ đầu
```
