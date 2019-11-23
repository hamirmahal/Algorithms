// Because I'm new to JavaScript, I'm going to try writing a recursive Fibonacci method. This file holds the contents of that attempt.

let previouslyComputedFibonacciNumbers = []
previouslyComputedFibonacciNumbers[1] = 1
previouslyComputedFibonacciNumbers[2] = 1


function recursiveFibonacci(n) {
    if (n < 1 || !(Number.isInteger(n))) {  // This if statement allows this method to only process integers greater than or equal to 1.
        if (typeof n === "string")
            console.log("This method only finds the ith Fibonacci number if i is a natural number. The argument passed in was \"" + n + "\".")
        else
            console.log("This method only finds the ith Fibonacci number if i is a natural number. The argument passed in was \"" + n + "\", without quotation marks.")
        return
    }
    
    if (n === 1 || n === 2)
        return previouslyComputedFibonacciNumbers[2]
    
    if (!previouslyComputedFibonacciNumbers[n])
        previouslyComputedFibonacciNumbers[n] = recursiveFibonacci(n-1) + recursiveFibonacci(n-2)
    
    return previouslyComputedFibonacciNumbers[n]
}

// Here are some sample test cases and their outputs.
console.log(recursiveFibonacci(10))                 // Output: 55
console.log(recursiveFibonacci("sdf"))              // Output: ... The argument passed in was "sdf".
console.log(recursiveFibonacci(96784563456.444))    // Output: ... The argument passed in was "96784563456.444", without quotation marks.
console.log(recursiveFibonacci(9875.5))             // Output: ... The argument passed in was "9875.5", without quotation marks.
console.log(recursiveFibonacci(true))               // Output: ... The argument passed in was "true", without quotation marks.
console.log(recursiveFibonacci(null))               // Output: ... The argument passed in was "null", without quotation marks.
console.log(recursiveFibonacci(undefined))          // Output: ... The argument passed in was "undefined", without quotation marks.
console.log(recursiveFibonacci(53))                 // Output: 53316291173
console.log(recursiveFibonacci(0))                  // Output: ... The argument passed in was "0", without quotation marks.
console.log(recursiveFibonacci(1))                  // Output: 1

// Looks like everything works! Hope you enjoyed this, found it helpful, or both.