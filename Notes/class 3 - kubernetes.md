# Kubernetes Objects
- object tells the state of kub cluster
- it solves the problem of container orchestration like scheduling and self-healing
- namespace?
- objects are created in a yaml file - declarative way
- and once yu run those yaml file its mean you created the obj in an imperative way
- **OBJECTS - DECLARATIVE WAY**
- 3 key values that are mandatory: apiVersion, kind, metadata
- `kubectl apply -f file_name.yaml`
**IMPERATIVE WAY**
- `kubectl create pods/deployment <config with flags>`

# Kubernetes Deployment
- deployment object can handle replicas as well like how  many pod how many container you want and you can also define this in replicasets
- rollout and rolling back with deployment  
- whatever deployment object you create it will create a sub object for replica sets, daemon etc

# ReplicaSets
- In deployment you have other options then deployments
- in replicasets will only focus on the replicas for pod giving more control to work directly with pods
- **self healing** self healing is apllied via replication controller - it deploys the object and take control of the pod thats runing the container - it also ensure once the container crashes so would start a new container
- she demonstarted a replicaset creation in dec way - `kubectl get rs` - they have three states
- kubectl get pods - it iwll show you three pods running 
- now lets bring one pod `kubectl delete pod <pod-name>` 
- now observe and you'll see once you down the pod it will create another pod

# stateful sets
- for eg a database or a file system that you want to persist
- or you have a container and you want to persist the state of it
- so for stateful appliucation a statefulsets worload is used
- call center (once call drop you'll get another representative on the line - stateless - every req is a new phone-call)vs amazon shopping cart (state is saved for the cart) 
- study more

# deamon set
- you need to understand the diff between replica set and daemon set
- learn more 

# TO DO
minikube stop
minikube stater --nodes 2 multinode-demo 
kubectl get nodes
minikube stop <node-name>

**statefulset.yaml demo**
kubectl appy -f statfuleset.yaml
try to up all three pods and delete a pod and see what will happen whats the state of pods now
then we ahve demonsets where we do healthcheck and resource limit

as we have everything in deployment so see how we can do in deployment(like the replicas, health checks etc)
understand health checks resoruce limit and other stuff
wsl with vscode using remote explorer