// I'm new to JavaScript, so I write the solution to this problem using arrow function notation for my own practice.
// The solution I wrote returns a value to print out via the console to verify the correctness of the written solution.

// Arrow function notation may not be the ideal way to write this solution, but I do it for practice.

// amilajack (https://github.com/amilajack) sent me this problem and I initially came up with a brute-force algorithm
// involving a for loop nested within another for loop. That solution takes O(n^2) time. I improved upon that solution
// so that it solves the problem in one pass of the input arrays of n elements each. In other words, the improved
// solution takes O(n) time, and it's what I write below.

// Here is the problem statement amilajack sent me, copied-and-pasted.

// We have an array of objects A and an array of indexes B.
// Reorder objects in array A with given indexes in array B.
// Do not change array A's length.

// example:
// const A = [C, D, E, F, G];
// const B = [3, 0, 4, 1, 2];

// sort(A, B);
// A is now [D, F, G, C, E];

// [C, D, E, F, G];
// [3, 0, 4, 1, 2];

// [F, D, E, C, G];
// [1, 0, 4, 3, 2];

// [D, F, E, C, G];
// [0, 1, 4, 3, 2];

// [D, F, G, C, E];
// [0, 1, 2, 3, 4];

// Before getting started, here's a general guide of the solution.

// The important information is in the array of indices.

// Looking at the given array of objects alone for this problem does not provide a roadmap to the desired results.

// So, we start by looking at the indices array.

const sortedArrays = (objectArray, indexArray) => {
  for (let i = 0; i < indexArray.length; i++) {
    // The first thing we want to do is move indexArray[i]to its proper location, and, with it, the 
    // corresponding entry in the array of objects, which is objectArray[i].

    // To where do we move indexArray[i]? The element indexArray[indexArray[i]], not the element indexArray[i],
    // actually tells us where to move indexArray[i] and objectArray[i]. We want to move both to
    // indexArray[indexArray[i]] and objectArray[indexArray[i]], respectively.

    // indexArray[i] belongs in indexArray[indexArray[i]], and objectArray[i] belongs in objectArray[indexArray[i]], so we move both of them.

    // There's just one issue: doing so overwrites indexArray[indexArray[i]], and objectArray[indexArray[i]], and we would have no way
    // of accessing that information unless we saved the information in indexArray[indexArray[i]], and objectArray[indexArray[i]], first.

    // So, we save indexArray[indexArray[i]] and objectArray[indexArray[i]] by storing them in their
    // own respective dedicated temporary variables, first.
    previouslyInIOfIndexArrayOfIndexArray = indexArray[indexArray[i]]
    previouslyInIOfIndexArrayOfObjectArray = objectArray[indexArray[i]]
    
    // Then, we place indexArray[i] and objectArray[i] in their proper positions, which are indexArray[indexArray[i]], and
    // objectArray[indexArray[i]], respectively, as mentioned above.
    indexArray[indexArray[i]] = indexArray[i]
    objectArray[indexArray[i]] = objectArray[i]

    // The elements originally in indexArray[i] and objectArray[i] are now in each in the correct index, namely, 
    // the index indexArray[indexArray[i]], and this program never needs to move the elements originally
    // in indexArray[i] and objectArray[i] again.

    // The elements originally in indexArray[indexArray[i]] and objectArray[indexArray[i]] have to go somewhere,
    // and there's a space for each of them available in indexArray[i] and objectArray[i]. Utilizing that space
    // helps this algorithm solve the problem in-place, without requiring additional storage besides the storage given in the problem.
    indexArray[i] = previouslyInIOfIndexArrayOfIndexArray
    objectArray[i] = previouslyInIOfIndexArrayOfObjectArray

    // And we're done! After each iteration of the for loop, elements that were inititally in indexArray[i] and
    // objectArray[i] at the start of the for loop are now in their proper index, which is the index indexArray[indexArray[i]], 
    // and upon termination of this for loop, all the elements indexArray[0 ... indexArray.length - 1], and
    // objectArray[0 ... indexArray.length - 1], are in their correct positions.
    
    // In other words, this algorithm sorts the entire input array objectArray according to the constraints of this problem.
  }

  return objectArray
}

// This is to show that this algorithm works on the example input amilajack sent to me.

// example:
// const A = [C, D, E, F, G];
// const B = [3, 0, 4, 1, 2];

console.log(sortedArrays(['C','D','E','F','G'], [3, 0, 4, 1, 2]))

// Output : [ 'D', 'F', 'G', 'C', 'E' ]
// Expected output : [D, F, G, C, E]

// It works. Hooray!

// If anyone is curious, here is pseudocode of my O(n^2) and O(n) solutions, copied-and-pasted from an email chain with amilajack.

// I think the language the pseudocode is most similar to is Java.

/*
for (int i = 0; i < A.length; i++)
 for (int j = i; j < B.length; i++)
  if B[j] == i
  {
    char aTemp = A[i]
    int bTemp = B[i]
    A[i] = A[j]
    B[i] = i
    A[j] = aTemp
    B[j] = bTemp
  }
*/

/*
for (int i = 0; i < A.length; i++)
{
1   char charTemp = A[B[i]] // We need to save this because we're about to overwrite it.
2    A[B[i]] = A[i]         // Assigns the value in the ith index into its "proper" position. We shouldn't have to move A[B[i]] again.
3    A[i] = charTemp        // The ith character of A is now the character that used to be in position A[B[i]].

4   int intTemp = B[B[i]]   // Now we need to save B[B[i]] because we're about to overwrite it.
5   B[B[i]] = B[i]          // We need to update B[B[i]] because A[B[i]] now contains what A[i] used to be, and B should reflect changes in A.
6   B[i] = intTemp          // The ith character of B is now the integer that used to be in B[B[i]].
}

First iteration: i = 0
After line 2, A looks like this A = [C, D, E, C, G];
After line 3, A looks like this A = [F, D, E, C, G];

After line 5, B looks like this B = [3, 0, 4, 3, 2];
After line 6, B looks like this B = [1, 0, 4, 3, 2];

Second iteration: i = 1
After line 2, A looks like this A = [D, D, E, C, G];
After line 3, A looks like this A = [D, F, E, C, G];

After line 5, B looks like this B = [0, 0, 4, 3, 2];
After line 6, B looks like this B = [0, 1, 4, 3, 2];

Third iteration: i = 2
After line 2, A looks like this A = [D, F, E, C, E];
After line 3, A looks like this A = [D, F, G, C, E];

After line 5, B looks like this B = [0, 1, 4, 3, 4];
After line 6, B looks like this B = [0, 1, 2, 3, 4];

Fourth iteration: i = 3
After line 2, A looks like this A = [D, F, G, C, E];
After line 3, A looks like this A = [D, F, G, C, E];

After line 5, B looks like this B = [0, 1, 2, 3, 4];
After line 6, B looks like this B = [0, 1, 2, 3, 4];

Fifth iteration: i = 4
After line 2, A looks like this A = [D, F, G, C, E];
After line 3, A looks like this A = [D, F, G, C, E];

After line 5, B looks like this B = [0, 1, 2, 3, 4];
After line 6, B looks like this B = [0, 1, 2, 3, 4];
*/