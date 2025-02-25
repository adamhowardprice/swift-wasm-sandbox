# Swift Cloud Compute Integration

This directory contains examples and tools for working with Swift Cloud Compute in our WebAssembly sandbox.

## What is Swift Cloud Compute?

[Swift Cloud Compute](https://github.com/swift-cloud/Compute) is a Swift framework for serverless edge computing. It allows you to write Swift code that can be compiled to WebAssembly and deployed to edge networks.

## Examples

The `examples` directory contains sample Swift Cloud Compute functions that demonstrate how to:
- Handle HTTP requests
- Work with JSON data
- Connect to external services
- Manipulate data at the edge

## Development Workflow

1. Write your Swift Cloud Compute function in the playground
2. Test it locally using the sandbox environment
3. Compile to WebAssembly using the Swift Cloud toolchain
4. Deploy to your edge network of choice

## Getting Started

To use Swift Cloud Compute, you'll need to:

1. Install the Swift Cloud CLI:
   ```
   brew install swift-cloud/tap/swift-cloud
   ```

2. Set up your Swift Cloud account (if deploying to Swift Cloud):
   ```
   swift cloud login
   ```

3. Initialize a new project:
   ```
   swift cloud init my-project
   ```

## Swift Cloud Compute vs. Fermyon Spin

Both Swift Cloud Compute and Fermyon Spin provide ways to run code at the edge using WebAssembly, but they have different approaches:

- **Swift Cloud Compute**: Write your serverless functions directly in Swift, compile to WebAssembly
- **Fermyon Spin**: Use a runtime environment that can execute WebAssembly modules (including Swift-compiled ones)

Our sandbox demonstrates both approaches to give you flexibility in your development workflow.
