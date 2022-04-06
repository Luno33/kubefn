# KubeFN

Save time writing your Kubernetes microservices, coding only what truly matters.

# Quick Start

## Install via NPM:

```
npm install -g kubefn
```

## Initialize your microservice

```bash
kubefn bootstrap microservice-name
```

Navigate into the newly created directory

```bash
cd microservice-name
```

## Compile your microservice

Use this command to copy your `./src` directory into the expressjs blueprint

```bash
kubefn compile
```

## Run locally your microservice

Use this command to copy your `./src` directory into the expressjs blueprint and run the expressjs server locally

```bash
kubefn run
```
