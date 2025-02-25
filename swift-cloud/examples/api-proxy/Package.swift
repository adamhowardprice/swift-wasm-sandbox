// swift-tools-version:5.8
import PackageDescription

let package = Package(
    name: "api-proxy",
    platforms: [
        .macOS(.v12)
    ],
    dependencies: [
        .package(url: "https://github.com/swift-cloud/Compute", from: "2.15.0")
    ],
    targets: [
        .executableTarget(
            name: "api-proxy",
            dependencies: [
                .product(name: "Compute", package: "Compute")
            ]
        )
    ]
)
