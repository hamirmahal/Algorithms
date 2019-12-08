// As I mentioned in the DepthFirstSearch.js file that I wrote, I accidentally glimpsed the pseudocode for breadth-first search.

// I wanted to try writing an implementation of breadth-first search without looking at its pseudocode at all, since I think the two
// paragraphs preceding its pseudocode in Cracking the Coding Interview by Gayle Laakmann McDowell give me enough information to try writing
// an implementation.

// Anyway, here's my attempt at implementing breadth-first search in JavaScript.

// I'm new to the language, so there may be inefficiencies I write of which I am unaware. This is just to warn you so that you know this
// implementation may be suboptimal.

// Since the two paragraphs preceding the pseudocode for breadth-first search say breadth-first search uses a queue, we start by creating
// a Queue class from which I can construct Queue objects.

class Queue {
    constructor() {
        this.myElements = []
    }

    enqueue(addMe) {
        this.myElements.push(addMe)         // This shouldn't need to return anything, so it doesn't.
    }
    dequeue() {
        return this.myElements.shift();
    }
    isNotEmpty() {
        return this.myElements.length !== 0  // myElements.length should always be of type number, so there's no danger in using ===.
    }
}

let testerQueue = new Queue()

// This is just to test Queue().
testerQueue.enqueue(5)
testerQueue.enqueue(false)
testerQueue.enqueue('23423432')
testerQueue.enqueue("234324")
testerQueue.enqueue(null)
testerQueue.enqueue(undefined)
testerQueue.enqueue([345345,345345,[3453]])
testerQueue.enqueue([])
testerQueue.enqueue([234324])
testerQueue.enqueue("")
console.log(testerQueue.myElements)   // Output: [ 5,false,'23423432','234324',null,undefined,[ 345345, 345345, [ 3453 ] ],[],[ 234324 ],'' ]
while ( testerQueue.isNotEmpty() ) {
    testerQueue.dequeue()
    console.log(testerQueue.myElements)
}
// Woohoo! It works. Now, I can finally use it in my breadth-first search implementation.
// Output:
// [ 5,false,'23423432','234324',null,undefined,[ 345345, 345345, [ 3453 ] ],[],[ 234324 ],'' ]
// [   false,'23423432','234324',null,undefined,[ 345345, 345345, [ 3453 ] ],[],[ 234324 ],'' ]
// [         '23423432','234324',null,undefined,[ 345345, 345345, [ 3453 ] ],[],[ 234324 ],'' ]
// [                    '234324',null,undefined,[ 345345, 345345, [ 3453 ] ],[],[ 234324 ],'' ]
// [                             null,undefined,[ 345345, 345345, [ 3453 ] ],[],[ 234324 ],'' ]
// [                                  undefined, [ 345345, 345345, [ 3453 ] ], [], [ 234324 ], '' ]
// [                                             [ 345345, 345345, [ 3453 ] ], [], [ 234324 ], '' ]
// [                                                                           [], [ 234324 ], '' ]
// [                                                                               [ 234324 ], '' ]
// [                                                                                           '' ]
// [                                                                                              ]
// => undefined

// I should also define a node class on which breadthFirstSearch(node) can operate.
function Node(val) {
    this.val = val
    this.neighbors = []             // We have to initialize this as an empty array, or else we get an error when calling BFS on a single node
    this.visited                    // Because !undefined is true, the check to see if we've visited unvisited nodes will work properly.
}

// I'm just going to create a node called testerNode to help check whether I wrote the node class properly.
let testerNode = new Node(5)
console.log(testerNode)             // Looks like it works! Output: Node { val: 5, neighbors: [], visited: false } => undefined

function breadthFirstSearch(node) { // We don't necessarily start at the root, assuming the graph even has one, so that's why it's "node".
    if ( !(node instanceof Node) )
        return "breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was " + node + "."

    let nodesToVisit = new Queue()  // We start off by creating a new Queue object that will hold all the nodes left to visit.
    nodesToVisit.enqueue(node)      // Of course, the Queue object just created better not be empty, otherwise the while loop won't run.

    while (nodesToVisit.isNotEmpty()) {                             // While we still have nodes left to visit...
        let nextNodeInLine = nodesToVisit.dequeue()                 // Take the next node we have to look at...
        if (!nextNodeInLine.visited) {                              // And, if we haven't already visited it...
          console.log(nextNodeInLine)                               // We "visit" the node, which is just printing the node in this case.
          nextNodeInLine.visited = true                             // We just "visited" the node, so we change its visited value to true.
          for (let i = 0; i < nextNodeInLine.neighbors.length; i++) // For each of nextNodeInLine's neighbors...
            nodesToVisit.enqueue(nextNodeInLine.neighbors[i])       // Add them to the queue so that we can visit them.
        }
    }
}

// To make sure that breadthFirstSearch(node) only runs for arguments passed in that are nodes, here are some test cases and their outputs.
console.log(breadthFirstSearch(234))
// Output: breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was 234.
console.log(breadthFirstSearch([]))
// Output: breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was .
console.log(breadthFirstSearch())
// Output: breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was undefined.
console.log(breadthFirstSearch(null))
// Output: breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was null.
console.log(breadthFirstSearch(undefined))
// Output: breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was undefined.
console.log(breadthFirstSearch(false))
// Output: breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was false.
console.log(breadthFirstSearch("sfsdfdsf"))
// Output: breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was sfsdfdsf.
console.log(breadthFirstSearch( [ 345345, [], [34435, 34543], [] ] ))
// Output: breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was 345345,,34435,34543,.
console.log(breadthFirstSearch('dg232lk23j234'))
// Output: breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was dg232lk23j234
console.log(breadthFirstSearch( [546, "ddfg", true, false] ))
// Output: breadthFirstSearch can only run if the argument passed in is a node. The argument passed in was 546,ddfg,true,false.
// Looks like that component is working fine! Excellent.

// I need to create some test graphs to verify whether my breadthFirstSearch(node) function works correctly.
let parentOfFourChildren = new Node(1)
let firstChild = new Node(2)
let secondChild = new Node(3)
let thirdChild = new Node(4)
let fourthChild = new Node(5)
parentOfFourChildren.neighbors = [firstChild, secondChild, thirdChild, fourthChild]
firstChild.neighbors = [parentOfFourChildren]
secondChild.neighbors = [parentOfFourChildren]
thirdChild.neighbors = [parentOfFourChildren]
fourthChild.neighbors = [parentOfFourChildren]

// We first try running the BFS function I wrote on the very simple test case of a single node. It should just print the contents of the node.
breadthFirstSearch(testerNode)  // Success! Output: Node { val: 5, neighbors: [] }

// Okay, now let's try it on a "star" graph that has parentOfFourChildren as its center. It should print the nodes with values 1, 2, 3, 4, 5.
breadthFirstSearch(parentOfFourChildren)
/*
Success! Output below...
Node {
  val: 1,
  neighbors:
   [ Node { val: 2, neighbors: [Array] },
     Node { val: 3, neighbors: [Array] },
     Node { val: 4, neighbors: [Array] },
     Node { val: 5, neighbors: [Array] } ] }
Node {
  val: 2,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 3,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 4,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 5,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
*/

// What if we try something a little more... strange?
// If we call breadthFirstSearch(firstChild), does it still print out the contents of the whole graph, as it should?
// I ran through the logic of the breadthFirstSearch(node) function I wrote, and this should work.
// It should print out firstChild, parentOfFourChildren, secondChild, thirdChild, and then fourthChild, in that order! Let's see if it works.
breadthFirstSearch(firstChild)
/*
Boo-ya! Everything's looking good so far! Output below...
Node { val: 2, neighbors: [ Node { val: 1, neighbors: [Array] }] }
Node {
  val: 1,
  neighbors:
   [ Node { val: 2, neighbors: [Array], visited: true },
     Node { val: 3, neighbors: [Array] },
     Node { val: 4, neighbors: [Array] },
     Node { val: 5, neighbors: [Array] } ] }
Node {
  val: 3,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 4,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 5,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
*/

breadthFirstSearch(secondChild)
/*
Output is excellent! Working as expected. You can see it below...
Node { val: 3, neighbors: [ Node { val: 1, neighbors: [Array] }] }
Node {
  val: 1,
  neighbors:
   [ Node { val: 2, neighbors: [Array] },
     Node { val: 3, neighbors: [Array], visited: true },
     Node { val: 4, neighbors: [Array] },
     Node { val: 5, neighbors: [Array] } ] }
Node {
  val: 2,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 4,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 5,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
*/

breadthFirstSearch(thirdChild)
/*
Working as expected. Output below...
Node { val: 4, neighbors: [ Node { val: 1, neighbors: [Array] }] }
Node {
  val: 1,
  neighbors:
   [ Node { val: 2, neighbors: [Array] },
     Node { val: 3, neighbors: [Array] },
     Node { val: 4, neighbors: [Array], visited: true },
     Node { val: 5, neighbors: [Array] } ] }
Node {
  val: 2,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 3,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 5,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
*/

breadthFirstSearch(fourthChild)
/*
Everything's looking good! Output below...
Node { val: 5, neighbors: [ Node { val: 1, neighbors: [Array] }] }
Node {
  val: 1,
  neighbors:
   [ Node { val: 2, neighbors: [Array] },
     Node { val: 3, neighbors: [Array] },
     Node { val: 4, neighbors: [Array] },
     Node { val: 5, neighbors: [Array], visited: true } ] }
Node {
  val: 2,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 3,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
Node {
  val: 4,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
*/

// Okay, before looking at the implementation in Gayle Laakmann McDowell's book, I want to look at if the breadthFirstSearch(node)
// function I wrote works properly on directed graphs, because up until now I've been visualizating its implementation on undirected graphs.

// I'm going to recreate the graph on page 107 of her textbook. It's directed. It's one of the same test graphs I used to test my
// depth-first search implementation.
let zero = new Node(0)
let one = new Node(1)
let two = new Node(2)
let three = new Node(3)
let four = new Node(4)
let five = new Node(5)

zero.neighbors = [one, four, five]
one.neighbors = [three, four]
two.neighbors = [one]
three.neighbors = [two, four]

breadthFirstSearch(zero)  // This should print out the nodes zero, one, four, five, three, and then two, in that order.
/*
Success! The output is below.
Node {
  val: 0,
  neighbors:
   [ Node { val: 1, neighbors: [Array] },
     Node { val: 4, neighbors: [] },
     Node { val: 5, neighbors: [] } ] }
Node {
  val: 1,
  neighbors:
   [ Node { val: 3, neighbors: [Array] },
     Node { val: 4, neighbors: [] } ] }
Node { val: 4, neighbors: [] }
Node { val: 5, neighbors: [] }
Node {
  val: 3,
  neighbors:
   [ Node { val: 2, neighbors: [Array] },
     Node { val: 4, neighbors: [], visited: true } ] }
Node {
  val: 2,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
*/

breadthFirstSearch(one) // This should print out the nodes one, three, four and then two, in that order.
/*
Success! It worked as expected. Output below...
Node { val: 5, neighbors: [] }
Node {
  val: 1,
  neighbors:
   [ Node { val: 3, neighbors: [Array] },
     Node { val: 4, neighbors: [] } ] }
Node {
  val: 3,
  neighbors:
   [ Node { val: 2, neighbors: [Array] },
     Node { val: 4, neighbors: [] } ] }
Node { val: 4, neighbors: [] }
Node {
  val: 2,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true} ] }
*/

breadthFirstSearch(two) // This should just print out nodes two, one, three, and then four, in that order.
/* Success! Here's the output...
Node { val: 2, neighbors: [ Node { val: 1, neighbors: [Array] }] }
Node {
  val: 1,
  neighbors:
   [ Node { val: 3, neighbors: [Array] },
     Node { val: 4, neighbors: [] } ] }
Node {
  val: 3,
  neighbors:
   [ Node { val: 2, neighbors: [Array], visited: true },
     Node { val: 4, neighbors: [] } ] }
Node { val: 4, neighbors: [] }

(To exit, press ^C again or type .exit) */

breadthFirstSearch(three) // This should print nodes three, two, four, and then one, in that order.
/* Success! Printed as expected, output below...
Node { val: 5, neighbors: [] }
Node {
  val: 3,
  neighbors:
   [ Node { val: 2, neighbors: [Array] },
     Node { val: 4, neighbors: [] } ] }
Node { val: 2, neighbors: [ Node { val: 1, neighbors: [Array] }] }
Node { val: 4, neighbors: [] }
Node {
  val: 1,
  neighbors:
   [ Node { val: 3, neighbors: [Array], visited: true },
     Node { val: 4, neighbors: [], visited: true } ] }
*/

breadthFirstSearch(four)  // This should just print out node four, by itself. Success! Output: Node { val: 4, neighbors: [] }
breadthFirstSearch(five)  // This should just print out node four, by itself. Success! Output: Node { val: 5, neighbors: [] }

// Okay, I think that just about does it for test cases. I'm going to read the implementation Gayle Laakmann McDowell wrote in her book,
// and any paragraphs immediately following that implementation pertaining to breadth-first search, and then I'll move onto another topic.