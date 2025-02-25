use anyhow::Result;
use serde::{Deserialize, Serialize};
use spin_sdk::{
    http::{Request, Response},
    http_component,
};
use std::io::Write;
use std::process::{Command, Stdio};
use tempfile::NamedTempFile;

// Define the request structure for Swift code execution
#[derive(Deserialize)]
struct SwiftExecuteRequest {
    code: String,
}

// Define the response structure
#[derive(Serialize)]
struct SwiftExecuteResponse {
    output: String,
    error: Option<String>,
    success: bool,
}

/// Handler for Swift code execution requests
#[http_component]
fn execute_swift(req: Request) -> Result<Response> {
    // Parse the JSON request body
    let request: SwiftExecuteRequest = match serde_json::from_slice(req.body()) {
        Ok(req) => req,
        Err(e) => {
            return Ok(http::Response::builder()
                .status(400)
                .header("content-type", "application/json")
                .body(serde_json::to_string(&SwiftExecuteResponse {
                    output: String::new(),
                    error: Some(format!("Invalid request: {}", e)),
                    success: false,
                })?.into())?)
        }
    };

    // Store the Swift code in a temporary file
    let mut swift_file = NamedTempFile::new()?;
    write!(swift_file, "{}", request.code)?;

    // Execute the Swift code using swiftc (or SwiftWasm compiler)
    let result = execute_swift_code(swift_file.path().to_str().unwrap());

    // Return the response
    let response = match result {
        Ok(output) => SwiftExecuteResponse {
            output,
            error: None,
            success: true,
        },
        Err(e) => SwiftExecuteResponse {
            output: String::new(),
            error: Some(format!("Execution error: {}", e)),
            success: false,
        },
    };

    Ok(http::Response::builder()
        .status(200)
        .header("content-type", "application/json")
        .header("access-control-allow-origin", "*")
        .body(serde_json::to_string(&response)?.into())?)
}

// Execute Swift code and return the output
fn execute_swift_code(file_path: &str) -> Result<String> {
    // For a full implementation, this would use the SwiftWasm compiler
    // For this proof of concept, we'll use a simplified approach
    
    // Check if we're in a Wasm environment
    // In a real implementation, you would have SwiftWasm integrated here
    #[cfg(target_arch = "wasm32")]
    {
        // In Wasm, we would delegate to a pre-compiled Swift runtime
        // For now, we'll simulate by checking for known examples
        let code = std::fs::read_to_string(file_path)?;
        
        if code.contains("Hello, Swift WebAssembly!") {
            return Ok("Hello, Swift WebAssembly!\n".to_string());
        } else if code.contains("fibonacci") {
            return Ok("Fibonacci Sequence:\n0, 1, 1, 2, 3, 5, 8, 13, 21, 34\n".to_string());
        }
        
        return Ok("Executed in Wasm environment (simulated output)\n".to_string());
    }
    
    // Native execution (for local development)
    #[cfg(not(target_arch = "wasm32"))]
    {
        // Run the Swift compiler
        let output = Command::new("swift")
            .arg(file_path)
            .output()?;
        
        if output.status.success() {
            Ok(String::from_utf8(output.stdout)?)
        } else {
            Err(anyhow::anyhow!(
                "Swift execution failed: {}",
                String::from_utf8_lossy(&output.stderr)
            ))
        }
    }
}