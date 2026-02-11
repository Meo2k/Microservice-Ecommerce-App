# Kafka Setup Guide - Local Docker

## Quick Start

### 1. Start Kafka and Dependencies

```bash
# Start all services (Kafka, Zookeeper, PostgreSQL, Redis, Kafka UI)
docker-compose up -d

# Check if services are running
docker-compose ps
```

### 2. Verify Kafka is Running

```bash
# Check Kafka logs
docker logs ecommerce-kafka

# You should see: "Kafka Server started"
```

### 3. Access Kafka UI

Open browser: http://localhost:8080

You can monitor:
- Topics
- Messages
- Consumer groups
- Broker status

### 4. Update Environment Variables

Update your `.env` file:

```bash
# Kafka Configuration (Local Docker)
NX_KAFKA_BROKERS=localhost:9092
NX_KAFKA_CLIENT_ID=ecommerce-app
NX_KAFKA_USERNAME=
NX_KAFKA_PASSWORD=
NX_KAFKA_GROUP_ID=notification-service-group
```

### 5. Start Your Services

```bash
# Start backend services (including notification-service)
npm run be

# Start frontend
npm run fe
```

## Testing the Integration

### 1. Register a New User

1. Go to http://localhost:4200/register
2. Fill in the registration form
3. Click "Sign Up"

### 2. Monitor in Kafka UI

1. Open http://localhost:8080
2. Go to Topics → `user.registered`
3. You should see the published event

### 3. Check Logs

**Auth Service** (publishes event):
```
📤 Published event to topic "user.registered": user.registered
```

**Notification Service** (consumes event):
```
✅ Consumer connected: notification-service-group
📥 Received event from topic "user.registered": user.registered
📧 Sending OTP email to user@example.com
✅ OTP email sent successfully
```

## Docker Commands

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volumes (Clean Reset)
```bash
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f kafka
docker-compose logs -f zookeeper
```

### Restart Kafka
```bash
docker-compose restart kafka
```

## Troubleshooting

### Issue: Kafka not connecting

**Solution**: Make sure Kafka is fully started
```bash
docker logs ecommerce-kafka | grep "started"
```

### Issue: Topic not created

**Solution**: Kafka auto-creates topics by default. Check Kafka UI or:
```bash
docker exec -it ecommerce-kafka kafka-topics --list --bootstrap-server localhost:9092
```

### Issue: Consumer lag

**Solution**: Check consumer group status in Kafka UI or:
```bash
docker exec -it ecommerce-kafka kafka-consumer-groups --bootstrap-server localhost:9092 --group notification-service-group --describe
```

## Architecture

```
┌─────────────┐
│   User UI   │
└──────┬──────┘
       │ POST /register
       ▼
┌─────────────┐
│Auth Service │
└──────┬──────┘
       │ Publish event
       ▼
┌─────────────────────┐
│  Kafka (Docker)     │
│  Topic: user.reg... │
└──────┬──────────────┘
       │ Consume event
       ▼
┌──────────────────────┐
│ Notification Service │
│ - Generate OTP       │
│ - Send Email         │
│ - Store in Redis     │
└──────────────────────┘
```

## Benefits of Docker Kafka vs Confluent Cloud

✅ **Free**: No cloud costs
✅ **Fast**: Local development, no network latency
✅ **Offline**: Works without internet
✅ **Full Control**: Easy to debug and monitor
✅ **Kafka UI**: Visual interface included

## Production Deployment

For production, consider:
- Kafka cluster with multiple brokers (replication)
- Managed services (Confluent Cloud, AWS MSK, etc.)
- Proper security (SSL/TLS, SASL authentication)
- Monitoring and alerting
- Backup and disaster recovery
