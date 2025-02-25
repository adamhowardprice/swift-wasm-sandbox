// Fibonacci Sequence example
func fibonacci(n: Int) -> [Int] {
    var sequence = [0, 1]
    
    guard n > 1 else {
        return Array(sequence.prefix(n + 1))
    }
    
    for i in 2...n {
        let next = sequence[i-1] + sequence[i-2]
        sequence.append(next)
    }
    
    return sequence
}

let fib = fibonacci(n: 9)
print("Fibonacci Sequence:")
print(fib.map { String($0) }.joined(separator: ", "))