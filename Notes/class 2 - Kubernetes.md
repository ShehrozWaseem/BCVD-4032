# INTR TO KUBERNETES
- automating the managing stuff required for containers (which container to down which to stop etc)
- use for resilience scaling or any failover mechanism 
- define the deployment pattern in your yml file and apply them to your container
- review kubernetes features
- consider 100 cont we have to manage with kuberenetes
- k provide worker node (everything runing k is part of the nodes) each node has multiple pod and each pod can have multiple containers
- this araises seperation of concern so you have to manage the config for prod acc
- k provide control panel which is an admin for all the nodes and pds
- the control panel can be used via api provided by k 
- etcd is k-v storage where the whole clustered data is stored along with config and secrets
- for job scheudling like php cms for manual config u can use scheduling
- control manager give control to multiple feature
- kubeproxy is the proxy server that enables access to pods and conts
- explore more config options on your own
- pods -> provide run time envr to run a container
 
# N/W N LOAD BALANCING
- cluster -> multiple nodes -> multiple pods -> multiple container .... AJEEEEEEEB

# CLUSTER ARCH
- cluster with multiple nodes
- all nodes are controlled by a centeral entity known as Control Plane
- node with pod are called worker node as they provide the runtime env for cont
- kv store database os called etcd which is used to manage cluster state (like what are the pods, where are the pods, how they are being mantained)

# MASTER NODE
- provide svc of control plane
- each control plane has each its own role for the cluster
- scheduler assign jobs to node
- api server is the rest api being used by the user
- through master node we interact with cluster
- if single master node goes down cluster wont be accessible
- to overcome zero down time you add redunndancy to the master nodes so once the master node goes down another replice will be started to manage the cluster

## MASTER NODE COMP
- all the api kub cluster provide with are the rest api called as REST calls
- whenever a config change is performed over the deployment the change in cluster will also be needed
- creating cluster is just like a script for movie
- scheduler is used to assign object to these node, act as supervisor
- in object we define the config for the cluser
- state for cluster is always stored in etcd 
- CONTROLLER:
- controller is monitor that is checking wheter the pods are working are not
- for changing nay config we have to go through first controller
- control will act whenever the pods go offline
- controller always keep checking if the health is ok or not
- so as the pod goes offline controller will check whats the config defined and if theres anything missing according to it will perform action accordingly so it make sure that the Worker node is working in its defined envr
- etcd is just like a database its kv pair, it will mantain the cluster state
- controller is the one which can access directly the etcd values
- if etcd goes down so its run in High Availability mode to support fault tolerance

# WROKER NODE:
- its managed by master node

- KUBELET:
- kubelet communicate with the container runtime via controller runtime interface and communicate the info to worker node  
- kubeproxy manages netwrok config for each node with in a worker node
- need to understand DNS

# MINIKUBE:
- virtual env to run cluster

# KUBECTL
- cli to see cluster info  

- minikube start
- minikube dashboard
- go to nodes

- `kubectl get pods` will return pods for minikube cluster that we started
- `kubectl describe nodes minikube` -> will output the clusture structure
- `kubectl get deployments` -> will show you the deployment
- `kubectl proxy` -> it will start the proxy server  | it will tell you about the apis available for managing cluster | metrics will show you the monitoring and to read this data you need monitoring tools
- `minkube stop` to stop the cluster

# DEPLOYMENT 
- we have the master node which uses service to communicate with worker node
- first in minkube you need to set the cont envr -> `slide`
- now you need to make your node enabled as service
- now you can query the service url n port

- `kubectl run hello-minikube --image=<img-imfo> --port 8080` running this cluster in a container and creating the hello-minkube pod
- `kubectl get deployment` upon checking ull get to know that you dont have any deployment till yet
- `kubectl create deployment hello-minikube --image=<img-imfo> --port 8080` -? now first deploy
- now if you check the deployment u'll have a container deployed
- now expose/enable your deployment as a service -> `kubectl expose deployment hello-minikube --type=NodePort`
- to see list of avl svcs -> `kubectl get services`
- to see pod info do `kubectl get pod`
- `kubectl describe service <service-name>` 
- `minikube ip` 

- `minikube service <service-name> --url` -> will give you the url to access the service
- the kubectl run cmd created the deployment object (default yml file)
- overview of the deployment file

- DEPLOYING KUBERNETES CLUSTER
- see kubernetes hosted solutions
- 


