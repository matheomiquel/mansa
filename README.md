# TESTs

## Start db

### Prod
```
docker run -e POSTGRES_PASSWORD=password -d -p5432:5432 postgres
```

### Test
```
docker run -e POSTGRES_PASSWORD=password -d -p5434:5432 postgres
```

## Migrate

### Prod

```
npm run migrate
```

### Test

```
npm run migrate_test
```

## Note

If you have some question don't hesitate to send me an email