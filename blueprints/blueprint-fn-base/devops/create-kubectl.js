// run it with 'npm run create-kubectl'

const fs = require('fs')

const appName = process.env.npm_package_name
const appVersion = process.env.npm_package_version
const appPort = process.env.npm_package_config_port
const imageRegistry = process.env.npm_package_config_imageregistry
const imagePullSecret = process.env.npm_package_config_imagepullsecret
const replicas = process.env.npm_package_config_replicas

const template = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fn-${appName}-deployment
spec:
  selector:
    matchLabels:
      app: fn-${appName}
  replicas: ${replicas ? replicas : '2'}
  minReadySeconds: 15
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  template:
    metadata:
      labels:
        app: fn-${appName}
    spec:
      containers:
        - name: fn-${appName}
          image: ${imageRegistry}/fn-${appName}:${appVersion}
          imagePullPolicy: Always
          ports:
            - containerPort: ${appPort}
          readinessProbe:
            httpGet:
              path: /health
              port: ${appPort}
            initialDelaySeconds: 15
            periodSeconds: 10
            successThreshold: 1
      imagePullSecrets:
        - name: ${imagePullSecret}

---

kind: Service
apiVersion: v1
metadata:
  name: fn-${appName}-service
spec:
  selector:
    app: fn-${appName}
  ports:
    - port: ${appPort}
`

try {
  fs.writeFileSync('./devops/kubectl-config.yaml', template)
} catch (err) {
  console.error(err)
}
