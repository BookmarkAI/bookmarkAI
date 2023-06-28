# BookmarkAI
## Deployment steps
1. `docker build -t supermark-prod-fastapi --platform linux/amd64 -f compose/prod/dockerfile .`
2. `docker tag supermark-prod-fastapi:latest us-west1-docker.pkg.dev/bookmarkai-c7f69/supermark/fastapi`
3. `docker push us-west1-docker.pkg.dev/bookmarkai-c7f69/supermark/fastapi`