---
title: "FAQ"
description: "Frequently Asked Questions"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "overview"
weight: 121
toc: true
---


## What frameworks/languages does mirrord support?

mirrord works by [hooking libc](https://metalbear.co/blog/mirrord-internals-hooking-libc-functions-in-rust-and-fixing-bugs/), so it should work with any language/framework that uses libc (vast majority).

This includes: Rust, Node, Python, Java, Kotlin, Ruby, and others (most languages use libc).

mirrord also has specific support for the following languages that don't use libc: [Go](https://metalbear.co/blog/hooking-go-from-rust-hitchhikers-guide-to-the-go-laxy/)

## Does mirrord install anything on the cluster?

No, mirrord doesn't install anything on the cluster, nor does it have any persistent state. It does spawn a short-living pod/container to run the proxy, which is automatically removed when mirrord exits. mirrord works using the Kubernetes API, and so the only prerequisite to start using mirrord is to have kubectl configured for your cluster.

If you have any restrictions for pulling external images inside your cluster, you have to allow pulling of ghcr.io/metalbear-co/mirrord image.
## Can I intercept traffic instead of duplicating it?

Yes, you can use the `--steal` flag to intercept traffic instead of duplicating it.

## Does mirrord support clusters with a service mesh like Istio or Linkerd?

Yes. However, traffic mirroring isn't currently supported - you can use the --steal argument to steal traffic instead.

## I've run my program with mirrord, but it seems to have no effect, what could be the issue?

There are currently two known cases where mirrord cannot load into the application's process:
1. Statically linked binaries. Since mirrord uses the dynamic linker to load into the application's process,
   it cannot load if the binary is statically linked. Support for statically linked
   binaries is planned for the long term, but for now you would have to make sure your binaries are dynamically
   linked in order to run them with mirrord. With Go programs, for example, it is as simple as adding `import "C"` to
   your program code.
2. If you are running mirrord via an IDE extension/plugin on MacOS, and the executable you are running is protected by
   [SIP](https://en.wikipedia.org/wiki/System_Integrity_Protection) (the application you are developing wouldn't be,
   but the binary that is used to execute it, e.g. `bash` for a bash script, might be protected), mirrord would not be
   able to load into it. If that is the case, you could try
   [running mirrord from the command line](https://mirrord.dev/docs/overview/quick-start/#cli-tool) (where SIP
   bypassing is already implemented) instead of in the IDE. Alternatively, you could try copying the binary you're
   trying to run to an unprotected directory (e.g. anywhere in your home directory), changing the run configuration
   to use the copy instead of the original binary, and trying again. If it still doesn't work, also remove the signature
   from the copy with:

   ```sudo codesign --remove-signature ./<your-binary>```

   Please let us know if you are affected by this issue. Support for running SIP binaries from an IDE is tracked in
   [issue #747](https://github.com/metalbear-co/mirrord/issues/747).

## Why not just use a remote debugger?

When you use a remote debugger, you still have to deploy new code to the cluster. When you plug local code into the cloud with mirrord, you don't have to wait for cloud deployment. Using mirrord is also less disruptive to the cluster, since the stable version of the code is still running and handling requests.

## Why not just run a copy of the cluster on my machine with e.g. minikube?

Our assumption is that some environments are too complex to run wholly on your local machine (or their components are just not virtualizable). If that's the case with your environment, you can only run the microservice you're currently working on locally, but connect it to your cloud environment with mirrord. Note that mirrord can also be used to connect your non-containerized process to your local Kubernetes cluster.

## How does mirrord protect against disrupting my shared environment with my local code?

* By letting you mirror traffic rather than intercept it, the stable version of the code can still run in the cluster and handle requests.
* By letting you control which functionality runs locally and which runs in the cloud, you can configure mirrord in the way that's safest for your architecture. For example, you can configure mirrord to read files and receive incoming traffic from the cloud, but write files and send outgoing traffic locally.
Our main goal in future versions of mirrord is to reduce the risk of disruption of the shared environment when using mirrord. This will be achieved by providing more granular configuration options (for example, filtering traffic by hostname or protocol), and advanced functionality like copy-on-write for databases.

## How is mirrord different from Telepresence?

The main differences are:
* mirrord works on the process level, meaning it doesn't require you to run a "daemon" locally and it doesn't change your local machine settings. For example, if you run another process, it *won't* be affected by mirrord.
* mirrord doesn't require you to install anything on the cluster.
* mirrord duplicates traffic and doesn't intercept/steal it by default.

More details can be found in this [GitHub discussion.](https://github.com/metalbear-co/mirrord/discussions/154#discussioncomment-2972127)
