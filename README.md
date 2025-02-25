# Swift WebAssembly Playground with Fermyon Spin

A proof of concept for executing Swift code in WebAssembly using multiple approaches including Fermyon Spin and Swift Cloud Compute.

## Overview

This project demonstrates how Swift code can be executed in WebAssembly using different approaches. It provides a web-based playground interface where users can write Swift code and see the results of its execution.

## Features

- Monaco editor with Swift syntax highlighting
- Example Swift code snippets
- Server-side Swift execution powered by Fermyon Spin
- Real-time code execution via API
- Swift Cloud Compute integration for edge deployment

## Project Structure

```
swift-wasm-sandbox/
├── README.md
├── browser-only/         # Browser-only implementation
│   ├── index.html
│   ├── style.css
│   └── js/
│       ├── main.js
│       ├── swift-wasm-loader.js
│       └── editor.js
├── spin-integration/     # Fermyon Spin implementation
│   ├── Cargo.toml
│   ├── src/
│   │   └── lib.rs
│   ├── spin.toml
│   └── web/
│       ├── index.html
│       ├── style.css
│       ├── js/
│       │   ├── main.js
│       │   └── editor.js
│       └── examples/
│           ├── hello.swift
│           └── fibonacci.swift
└── swift-cloud/          # Swift Cloud Compute integration
    ├── README.md
    └── examples/
        ├── hello-world/  # Basic hello world example
        └── api-proxy/    # API proxy with caching example
```

## Approaches to Running Swift in WebAssembly

This project showcases three different approaches to running Swift code in WebAssembly:

1. **Browser-only**: A simple proof of concept that runs entirely in the browser.
2. **Fermyon Spin**: Uses Fermyon Spin to execute Swift code in WebAssembly components.
3. **Swift Cloud Compute**: Uses Swift Cloud's Compute framework for edge deployment.

Each approach has its advantages:

- **Browser-only**: Simplest to get started with, requires no server-side components.
- **Fermyon Spin**: Provides a robust server-side environment with isolation and security.
- **Swift Cloud Compute**: Designed specifically for Swift and edge deployment scenarios.

## Getting Started

### Prerequisites

- [Fermyon Spin](https://developer.fermyon.com/spin/v3/install) (for Spin implementation)
- [Swift Cloud CLI](https://github.com/swift-cloud/cli) (for Swift Cloud implementation)
- Rust toolchain with WebAssembly target (for Spin implementation)
- A modern web browser with WebAssembly support
- For local testing of Swift integration: Swift compiler

### Running the Browser-only Version

1. Navigate to the browser-only directory:
   ```
   cd browser-only
   ```

2. Serve the files using a local web server:
   ```
   python -m http.server
   ```
   
3. Open your browser and navigate to `http://localhost:8000`

### Running the Spin Version

1. Navigate to the spin-integration directory:
   ```
   cd spin-integration
   ```

2. Build and run the Spin application:
   ```
   spin build
   spin up
   ```
   
3. Open your browser and navigate to `http://localhost:3000`

### Using Swift Cloud Compute

1. Navigate to the swift-cloud directory:
   ```
   cd swift-cloud
   ```

2. Choose an example and build it:
   ```
   cd examples/hello-world
   swift build
   ```

3. Run the example locally:
   ```
   swift cloud dev
   ```

## Integrating SwiftWasm

To fully implement Swift execution in WebAssembly:

1. Install the SwiftWasm toolchain: https://book.swiftwasm.org/getting-started/setup.html
2. Modify the `execute_swift_code` function in `src/lib.rs` to use the SwiftWasm compiler
3. Create a proper compilation and execution pipeline

## Resources

- [Fermyon Spin Documentation](https://developer.fermyon.com/spin/v3/)
- [Swift Cloud Compute](https://github.com/swift-cloud/Compute)
- [SwiftWasm Project](https://swiftwasm.org/)
- [Swift Programming Language](https://swift.org/)
- [WebAssembly](https://webassembly.org/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.