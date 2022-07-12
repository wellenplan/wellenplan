# Wellenplan - Broadcast Management: Helm Chart

[![Wellenplan banner](https://github.com/wellenplan/.github/raw/main/assets/banner.jpg)](https://wellenplan.io)

![Version: 0.0.0](https://img.shields.io/badge/Version-0.0.0-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: v0.0.0](https://img.shields.io/badge/AppVersion-v0.0.0-informational?style=flat-square)

Wellenplan on Kubernetes

**Homepage:** <https://wellenplan.io>

## Source Code

* <https://github.com/wellenplan/wellenplan>

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| https://charts.cockroachdb.com/ | cockroachdb | ~8.1.3 |
| https://charts.min.io/ | minio | ~4.0.5 |
| https://enapter.github.io/charts/ | keydb | ~0.41.0 |

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| replicaCount | int | `1` | Amount of main Wellenplan Pods to be started. |
| image.repository | string | `"ghcr.io/wellenplan/wellenplan"` | Wellenplan container image. |
| image.pullPolicy | string | `"IfNotPresent"` | Image pullPolicy, may be Always or IfNotPresent. |
| image.tag | string | `""` | Overrides the image tag whose default is the chart appVersion. |
| imagePullSecrets | list | `[]` | Inject secrets you need to pull a local fork of the Wellenplan container image. |
| nameOverride | string | `""` | Override the `name` part of `metadata.name`. |
| fullnameOverride | string | `""` | Override all of `metadata.name` and other derived values. |
| serviceAccount.create | bool | `true` | Specifies whether a service account should be created. |
| serviceAccount.annotations | object | `{}` | Annotations to add to the service account. |
| serviceAccount.name | string | `""` | The name of the service account to use. If not set and create is true, a name is generated using the fullname template. |
| podAnnotations | object | `{}` | Specify additional annotations for the Wellenplan Pod. |
| podSecurityContext | object | `{}` | Configure a Pod security context for Wellenplan. It is recommended to set a sensible fsGroup (ie. `{"fsGroup": 2000}`). |
| securityContext.capabilities | object | drop `ALL` | Wellenplan drops all capabilities out of the box. |
| securityContext.readOnlyRootFilesystem | bool | `true` | The Wellenplan root filesystem is ephemeral. |
| securityContext.runAsNonRoot | bool | `true` | Wellenplan does not run as uid=0 (root). |
| service.type | string | `"ClusterIP"` | How to expose Wellenplan in your cluster. |
| service.port | int | `80` | Port that Wellenplan is reachable on in your cluster. Gets mapped to 8055 in the container. |
| ingress.enabled | bool | `false` | Enable Ingress creation. |
| ingress.className | string | `""` | Choose an Ingress class name. |
| ingress.annotations | object | `{}` | Annotate you Ingress resource. |
| ingress.hosts[0].host | string | `"chart-example.local"` | Set Wellenplan hostname. |
| ingress.hosts[0].paths | list | `/` | Configure subpath for Wellenplan installation. It's recommended to host Wellenplan on it's own subdomain and not touch this. |
| ingress.tls | list | `[]` | Configure TLS for Ingress resource. It's preferrable for your Ingress controller to just default to TLS everywhere and leave this empty. |
| autoscaling.enabled | bool | `false` | Enable autoscaling Wellenplan. See `values.yaml` for further knobs that need tuning for autoscaling. |
| env.db.client | string | `"cockroachdb"` | `DB_CLIENT` env variable |
| env.db.host | string | `"cockroachdb"` | `DB_HOST` env variable |
| env.db.port | int | `26257` | `DB_PORT` env variable |
| env.db.database | string | `"wellenplan"` | `DB_DATABASE` env variable |
| env.db.user | string | `"wellenplan"` | `DB_USER` env variable |
| env.db.filename | string | `""` | `DB_FILENAME` env variable. Used for testing. |
| env.rateLimiter.enabled | bool | `true` | `RATE_LIMITER_ENABLED` env variable |
| env.rateLimiter.points | int | `25` | `RATE_LIMITER_POINTS` env variable |
| env.rateLimiter.duration | int | `1` | `RATE_LIMITER_DURATION` env variable |
| env.rateLimiter.store | string | `"redis"` | `RATE_LIMITER_STORE` env variable |
| env.rateLimiter.host | string | `"keydb"` | `RATE_LIMITER_REDIS_HOST` env variable |
| env.rateLimiter.port | int | `6379` | `RATE_LIMITER_REDIS_PORT` env variable |
| env.cache.enabled | bool | `true` | `CACHE_ENABLED` env variable |
| env.cache.store | string | `"redis"` | `CACHE_STORE` env variable |
| env.cache.host | string | `"keydb"` | `CACHE_REDIS_HOST` env variable |
| env.cache.port | int | `6379` | `CACHE_REDIS_PORT` env variable |
| env.storage.locations | string | `"minio"` | `STORAGE_LOCATIONS` env variable |
| env.security.key | string | `""` | `KEY` env variable |
| env.extraEnv | object | `{}` | Configure extra raw environment variables for Wellenplan. |
| secret.enabled | bool | `true` | Enable Secret creation. Creating Secrets with Helm is **NOT RECOMMENDED FOR PRODUCTION**. |
| secret.db.password | string | `"changeme"` | `DB_PASSWORD` env variable. |
| secret.db.clientSecretName | string | `"cockroachdb-client-secret"` | Name of db client secret |
| secret.rateLimiter.password | string | `"changeme"` | `RATE_LIMITER_REDIS_PASSWORD` env variable. |
| secret.cache.password | string | `"changeme"` | `CACHE_REDIS_PASSWORD` env variable. |
| secret.security.secret | string | `""` | SECRET env variable. |
| cockroachdb.enabled | bool | `true` | Enable CockroachDB. The default CockroachDB deployment is **NOT RECOMMENDED FOR PRODUCTION**. |
| keydb.enabled | bool | `true` | Enable KeyDB. The default KeyDB deployment is **NOT RECOMMENDED FOR PRODUCTION**. |
| keydb.password | string | `"changeme"` | KeyDB password |
| minio.enabled | bool | `true` | Enable minio The default minio deployment is **NOT RECOMMENDED FOR PRODUCTION**. |
| minio.mode | string | `"standalone"` | minio mode, i.e. standalone or distributed or gateway |
| minio.replicas | int | `1` | Number of minio containers running, needs to be tuned for production, see [minio limits documentation](https://github.com/minio/minio/blob/master/docs/minio-limits.md) |
| minio.users[0].accessKey | string | `"wellenplan"` | S3 key for minio |
| minio.users[0].secretKey | string | `"changeme"` | S3 secret for minio |
| minio.users[0].policy | string | `"readwrite"` | minio policy |

## License

This Helm chart is free software: you can redistribute it and/or modify it under the terms
of the GNU Affero General Public License as published by the Free Software Foundation,
version 3 of the License.

----------------------------------------------
Autogenerated from chart metadata using [helm-docs](https://github.com/norwoodj/helm-docs)
