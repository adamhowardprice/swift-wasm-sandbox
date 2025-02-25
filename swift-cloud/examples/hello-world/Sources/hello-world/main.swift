import Compute

// Define our main worker handler
struct HelloWorld: Worker {
    // Handle the incoming request
    func onIncomingRequest(_ req: IncomingRequest) async throws -> OutgoingResponse {
        // Get the URL from the request
        let url = req.url
        
        // Get any query parameters
        let name = url.queryParameters["name"] ?? "World"
        
        // Create a JSON response
        let responseData: [String: Any] = [
            "message": "Hello, \(name)!",
            "timestamp": Date().timeIntervalSince1970,
            "method": req.method.rawValue,
            "url": url.absoluteString
        ]
        
        // Convert our data to JSON and return the response
        return try JSONEncoder().encode(responseData).httpResponse()
            .withHeader(.contentType, "application/json")
            .withHeader(.cacheControl, "no-store")
    }
}

// Start the worker
try await HelloWorld().start()
