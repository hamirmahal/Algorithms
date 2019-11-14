// This program "flattens" an array, meaning it takes as its input an array of different objects,
// some of which can be arrays, and outputs only the individual elements of the input.
// For each of the original elements that is an array, this program outputs the elements of that array if they themselves are not arrays.
// Otherwise, it looks at elements that are arrays and tries to find their elements, outputting them only if those are not arrays.
// The solution to this problem should output elements "in order", meaning that an array consisting of integers, a String, an array,
// and then another String, should output the integers, the first String, the nonarray elements of the array, and finally the 
// second String, in that order.

// amilajack explained the solution to this problem for me and I wrote out its implementation in Node.js so that I could practice Node.js.
// amilajack's Github link is here. https://github.com/amilajack

var flattenedArray = [];             // This array is going to hold our solution, the flattened output array.
var flattenedArrayIndex = 0;    // This keeps track of the index of the flattened array, which we need to know where to put flattened array
                                // elements.

function arrayFlattener(arrayToFlatten) {
    for (var i = 0; i < arrayToFlatten.length; i++) {
        currentElementOfArrayToFlatten = arrayToFlatten[i];
        
        // If the current element in the input array is not an array, then we can just add it to the output array normally.
        if (!(currentElementOfArrayToFlatten instanceof Array))
            flattenedArray[flattenedArrayIndex++] = currentElementOfArrayToFlatten;
        else arrayFlattener(currentElementOfArrayToFlatten) // If we reach this block, that means the current element of arrayToFlatten is
                                                            // an array. So, we call this arrayFlattener method recursively on that array.
    }
}

// Upon termination, arrayFlattener() should have populated var flattenedArray with the appropriate elements.
// Thus, flattenedArray should contain our desired output solution.

// We create a test array called testArray to verify that the arrayFlattener function works as intended.
var testArray = [2, [true, ["far"]], 3];

// The below lines of code test whether or not arrayFlattener works correctly.
arrayFlattener(testArray)
console.log(flattenedArray);    // This should output [2, true, "far", 3].

// This gives us the desired output "> Array [2, true, "far", 3]", without quotation marks. Hope you enjoyed this!