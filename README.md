# Swift WebAssembly Playground with Fermyon Spin

A proof of concept for executing Swift code in WebAssembly using Fermyon Spin.

## Overview

This project demonstrates how Swift code can be executed in WebAssembly using Fermyon Spin. It provides a web-based playground interface where users can write Swift code and see the results of its execution.

## Features

- Monaco editor with Swift syntax highlighting
- Example Swift code snippets
- Server-side Swift execution powered by Fermyon Spin
- Real-time code execution via API

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
└── spin-integration/     # Fermyon Spin implementation
    ├── Cargo.toml
    ├── src/
    │   └── lib.rs
    ├── spin.toml
    └── web/
        ├── index.html
        ├── style.css
        ├── js/
        │   ├── main.js
        │   └── editor.js
        └── examples/
            ├── hello.swift
            └── fibonacci.swift
```

## Technical Implementation

This project provides two implementation approaches:

1. **Browser-only**: A simple proof of concept that runs entirely in the browser
2. **Spin Integration**: A more robust implementation using Fermyon Spin for server-side execution

### Current Limitations

This proof of concept has several limitations:

1. The Swift execution is simulated for demonstration purposes.
2. A full implementation would require integrating the SwiftWasm compiler with Spin.
3. The error handling is basic and could be improved.

## Getting Started

### Prerequisites

- [Fermyon Spin](https://developer.fermyon.com/spin/v3/install) (for Spin implementation)
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

## Integrating SwiftWasm

To fully implement Swift execution in WebAssembly:

1. Install the SwiftWasm toolchain: https://book.swiftwasm.org/getting-started/setup.html
2. Modify the `execute_swift_code` function in `src/lib.rs` to use the SwiftWasm compiler
3. Create a proper compilation and execution pipeline

## Resources

- [Fermyon Spin Documentation](https://developer.fermyon.com/spin/v3/)
- [SwiftWasm Project](https://swiftwasm.org/)
- [Swift Programming Language](https://swift.org/)
- [WebAssembly](https://webassembly.org/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.