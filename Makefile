temp-sh:
	docker run --rm -ti -v ./:/app -w /app node:alpine /bin/sh 

api-gateway-sh:
	docker compose exec api-gateway /bin/sh

auth-sh:
	docker compose exec auth /bin/sh