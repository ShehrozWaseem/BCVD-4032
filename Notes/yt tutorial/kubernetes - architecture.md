# ARCHITECTURE

- **API SERVER:** it is the main server that is going to talk to all other three components of control plane along with the user or administrator who will be working or managing the kuberemtes cluster

- **CONTROL MANAGER:** From this you'll talk to the API server, the control manager tells the API server actual state desired for pods being runing in the cluster, it gets the information commmunicated from the api server
    - make sure actual state matched with the desire state of cluster
    - DIFFERENT CONTROLLER FOR DIFFEREN PURPOSE (Node controller, Route Controller, Service Controller, Volume Controller etc)


- **SCHEDULER:** It performs all the necessary actions required to keep the system according to the defined configuration, but how does it so? so it listens the API server and the API server gets that information from 
    - handle pod creation and management it does all the stuff - create and manage the pods

- **ETCD CLUSTER:** It is kind of a database it stores the state defined or the current state maybe (idk) of the nodes. It stores it in form of KV pair. this also gets informed by the API server
    - it stores meta data and state of the cluster
    - fully replicated (entire state is available for all the nodes in the cluset)
    - secure and fast
- **WORKER NODES:** it has three manin components:
    - **KUBELET**: its the one which talks to the control plane 
        - agent running on the node
        - works with container engine 
    - **KUBE-PROXY**: assigne ip address to each pod
        - ip address being assigned is dynamics 
    - **POD**: its a container run time envr as the containers are packed in pods so the nodes manage the pods. as those container are docker images and it can be different every time so pod is a general way to manage those containers as all the dns and network protocl set by the kuberentes infrastructre are applied on the pod. The best practice is to keep a 1 container with in 1 pod. as with * containers the containers are tightly coupled with in a single pod so if a single pod goes down all these container will go down. and once a pod goes down then when the new pod is created its created from completely scratch so no history is mantained for a pod a new DNS is assigned to the pod. *Q? so how does volume keep them associated with the pod once it is recreated how do kub get to know that certain volume is refered to that pod.*
        - in multi conatiners they will share the same memory, so if a single container damages the memory it will impact all the other conts
        - auto-healing/auto-scaling be def is not added to pods (it can be achieved by adding high level k8s obj)
        - as soons as a pod is created it is scheduled to run on the cluster
        - pod stays until the node is failed after a timeout/any process terminated or pod is deleted
        - it says volume also gets delete with pods
        - via controller you can add self healing and auto scaling to pods
- **HIGHER LEVEL OBJ K8s**
    - through replicationset you can achieve auto scaling and auto healing for the pods
    - through deployment you can achieve versioning and rollback 

