# codeApp (nonsensitive)

## Use
This project was quickly put together in july 2022 to keep track of coding of student questionare responses in the norwegian part of the ICCS project. This is a repocitory trying to revive the project removing sensitive info from the original repo, and migrating it to Next14 (still with /pages). It still does not quite work in next14 however.

## Dev
Run
```
docker compose -f docker-compose.dev.yml up --build
```

## Deploy
This project was simply deployed to vercel, so there exists no config for deploying it anywhere else. But to make a build, run:

```bash
npm run build
```

Then to deploy the build locally:

```bash
npm run start
```
