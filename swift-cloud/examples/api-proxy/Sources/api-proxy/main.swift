import Compute
import Foundation

// This example demonstrates an API proxy with caching using Swift Cloud Compute.
// It proxies requests to a public JSON API and caches responses at the edge.

struct APIProxy: Worker {
    // Define constants
    let API_URL = "https://jsonplaceholder.typicode.com"
    let CACHE_TTL = 60 * 30 // 30 minutes cache time
    
    func onIncomingRequest(_ req: IncomingRequest) async throws -> OutgoingResponse {
        // Get the path from the request URL
        let path = req.url.path
        
        // Create a cache key based on the path
        let cacheKey = "api-proxy:\(path)"
        
        // Try to get the response from the cache
        if let cachedResponse = try? await Compute.cache.get(key: cacheKey) {
            // Return the cached response with a header indicating it was cached
            return cachedResponse.httpResponse()
                .withHeader("X-Cache", "HIT")
                .withHeader(.contentType, "application/json")
        }
        
        // If not in cache, forward the request to the API
        guard let apiURL = URL(string: "\(API_URL)\(path)") else {
            return OutgoingResponse(status: .badRequest, body: "Invalid API path")
        }
        
        // Create a new request to the API
        var apiRequest = OutgoingRequest(url: apiURL, method: req.method)
        
        // Forward relevant headers
        for (name, value) in req.headers where name.lowercased().hasPrefix("accept") {
            apiRequest.headers.append(name: name, value: value)
        }
        
        // Send the request to the API
        let apiResponse = try await apiRequest.fetch()
        
        // Check if the API request was successful
        guard apiResponse.status.isSuccessful else {
            return apiResponse.withHeader("X-Cache", "BYPASS")
                .withHeader(.contentType, "application/json")
        }
        
        // Get the response body data
        guard let responseData = apiResponse.body else {
            return OutgoingResponse(status: .noContent)
                .withHeader("X-Cache", "BYPASS")
        }
        
        // Store the response in the cache
        try? await Compute.cache.put(
            key: cacheKey,
            value: responseData,
            expirationTtl: CACHE_TTL
        )
        
        // Return the response with a header indicating it was not cached
        return responseData.httpResponse()
            .withHeader("X-Cache", "MISS")
            .withHeader(.contentType, "application/json")
            .withHeader(.cacheControl, "public, max-age=\(CACHE_TTL)")
    }
}

// Start the worker
try await APIProxy().start()
