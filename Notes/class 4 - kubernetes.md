# CONFIG MAPS:
- config files that you want to share accross multiple yaml files
- secrets - for sensisitve info
- the purpose is to inc reusability accross different yaml and pods and to not store config/properties in code base but in the infrastructure
- the file size are limited so you can only store info that can take space less than 1 mb if you wana do more you go create afile in the volume
- .immutable -> false [ means the config file can be edite you dont have to reapply it ]
- | -> multiple lines of statement [ the keys which haave pipe symbol with them]
- it will override the var define in the dockerfile

# RBAC:
- role based operations in kubernetes
- ~/.kube/config
- so in config each user has client-cert and client-key
- gen a pub and pvt key using openssl
- then create a cert signing req with the keep via openssl in the subject you have to mention the details
- set an user and then try to access those resources
- `kubectl config use-context user_name` -? cmd to active user in the cmd
- create a user and bind a role to it (C,R,U,D) i.e role bind
- `role.yaml` -> file hwere you define the roles
- `kubectl apply -f role.yaml`
- now append this role to a user
- `role-binding.yaml` another object that you'll create
- 