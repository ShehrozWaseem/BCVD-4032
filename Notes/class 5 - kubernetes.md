# SERVICES
- serive and load balance are req to manage the pods when they are re created
# LOAD BALANCING 
- 1 sv running 1 app (manageable with 100 req) but once the req reaches 1000 sv wont be able to respond 
- so use a proxy server to distribute the network among different resources
- dist traffic for better availability and scalabiltiy
- internal load balancer: the traffic is balance with in a kub cluster
- external lb when you get traffic from outside the cluster envr (like an org accessing an app deployed on kub)
# CLUSTER IP
- enable 3 pods as a cluster ip 
- default kubernetes service
- ip add are allocated which are stable to the cluster
- once pod is available as cluster ip they can communicate with each other
- cluster ip doesn't provide external access as the proxy server set doesn't perfectly exist outside the kub cluster
- so when you need application to communicate internally (like when you need FE to communicate with BE - you'll expose the BE as clsuterIP and to access FE you'll expose it as NodePort service)
# DEMO - CLUSTER IP 
- targetPort -> whatever port val u have mentioned in the deployment container port and port -> the one on which you want to enable the service
- now do `kubectl get svc` and try curl by mentioning the clusterIP `1.1.1:port`
- we wont be able to access it as we are doing externla access so for this we have to go inside the pod
- `kubectl exec -it pod-name -- sh` now curl here / you can also do the curl with svc name (preferred way of doing it) `curl svc-name:port`
- `kubectl port-forward service/nginx-service 8083:8090/port`
- now it will forward the req from 8083 to 8090 (which is with in the cluster) and now the pod is access with in the system via port forward 

- cluster ip internal load balance - here upon 100 req it has share to internally
- first to view logs into both replicas/pod on two sep terminal run `kubectl logs pod-name -f`
- now one of the pod is already port forwarded
- exec -it with other pod
- run a while loop with 20 req in this exec pod
- in the while loop body `curl nginx-serice:8090`
- so so when you'll see the logs there will be few calls on the first pod and few on others
- so this tells that clsuterIp comes with internal load balancing

# NODEPORT SVC
- for lcuster ip the access is only with in the pods
- now you want to enable the access outside the cluster like within the system 
- so you have service defined with nodeport and through nodeport you'll access the clusterIp
- DEMO:
- define nodeport in yml service
- acess it via minikube ip 

# LOAD BALANCER SVC
- it sits on top of the kub cluster
- when you want to enable it to external internet traffic 
- cant work with minikube

# INGRESS
- first see nodeport
- to use ingress first enable it with minikube
- `minikube addons enable ingress`
- `kubectl get pods -n ingress-nginx`
- controller will manage the routing and filtering aspec
-  `kubectl create deployment web --image=...` run a hellow world img
- now expose the deployment - service
**YAML EXPLAINATION:**
- annotations -> we want everything on main route
- rules -> the routing config is defined here
- host -> this is what youll get as host name
- apply and get
- curl cmd to access the host
- first the req is rec by controller and then it will route it to one of the rpelicas
- now lets say you want to deploy another svc with same ingress
- everything with in ingress env is first exposed as NodePort svc and then it is handled by the ingress controller
- so anew path will be set for the svc 2
