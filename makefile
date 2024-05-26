up:
	docker compose up -d
stop:
	docker compose stop
docker-build:
	docker build -f docker/app/Dockerfile . -t sliusarchyn/node-app:latest

docker-push:
	docker push sliusarchyn/node-app:latest

k8s-ingress-apply:
	kubectl apply -f k8s/ingress-deployment.yaml

k8s-ingress-delete:
	kubectl apply -f k8s/ingress-deployment.yaml

k8s-app-apply:
	kubectl apply -f k8s/deployment.yaml

k8s-app-delete:
	kubectl delete -f k8s/deployment.yaml

k8s-pods:
	kubectl get pods
