// I just wrote a recursive Fibonacci method, and now I'm going to write an iterative version of it for practice.

// I've actually only written Fibonacci recursively, so this will be a way for me to practice my thinking as well as my JavaScript.

// Wish me luck!

function iterativeFibonacci(n) {
    // The first thing we want to check is if there are any invalid inputs. We should only be able to find the nth Fibonacci number
    // for natural numbers n. We check this condition with the following if statement, just like I did in the recursive implementation.
    if (n < 1 || !Number.isInteger(n)) {
        let returnString = "iterativeFibonacci(n) only takes natural numbers n as its input. The input entered was "
        if (typeof n === "string")
            returnString += "\"" + n + "\"."
        else if (n instanceof Array)
            returnString += "[" + n + "]."
        else
            returnString += "\"" + n + "\", without quotation marks."
        return returnString
    }

    let previouslyComputedFibonacciNumbers = []
    previouslyComputedFibonacciNumbers[1] = 1   // Start array entries at 1, because it's more intuitive, just like I did in the recursive
    previouslyComputedFibonacciNumbers[2] = 1   // implementation. This should completely prevent writing something that causes off-by-one

    // We only need to compute the third Fibonacci number onwards, because we already have the first two saved.
    for (let i = 3; i <= n; i++)
        previouslyComputedFibonacciNumbers[i] = previouslyComputedFibonacciNumbers[i-1] + previouslyComputedFibonacciNumbers[i-2]

    return previouslyComputedFibonacciNumbers[n]
}

// And that's it! Here are some test cases.
console.log(iterativeFibonacci(28))             // Output: 317811
console.log(iterativeFibonacci(false))          // Output: ... The input entered was "false", without quotation marks.
console.log(iterativeFibonacci(undefined))      // Output: ... The input entered was "undefined", without quotation marks.
console.log(iterativeFibonacci('sdfdsf'))       // Output: ... The input entered was "sdfdsf".
console.log(iterativeFibonacci("35545b6fngfh")) // Output: ... The input entered was "35545b6fngfh".
console.log(iterativeFibonacci([7, 8, 9, 963])) // Output: ... The input entered was [7,8,9,963]. (My array checker works!)
console.log(iterativeFibonacci(87963.2222222))  // Output: ... The input entered was "87963.2222222", without quotation marks.
console.log(iterativeFibonacci(537))            // Output: 7.531436383873787e+111
console.log(iterativeFibonacci([]))             // Output: ... The input entered was [].
console.log(iterativeFibonacci())               // Output: ... The input entered was "undefined", without quotation marks.

// Nice! That took me significantly less time than it did to write the recursive implementation.
// The recursive implementation took me approximately one hour and 29 minutes to write. The iterative implementation has taken me about
// 37 minutes to get up to this point. So, it's taken me only about 33% of the time. I guess what they say about practice making perfect
// is true! Hope you find this helpful, enjoyable to read, or both.