// I just read a pseudocode implementation of Depth-First Search (DFS) in Gayle Laakmann McDowell's Cracking the Coding Interview,
// and now I am going to try to program it in JavaScript.

// I'm new to the language, so do not be surprised if my implementation is suboptimal. Alright, here goes!

function depthFirstSearch (node) {
  if ( ! (node instanceof Node) ) {
    let returnString = "depthFirstSearch(node) is unable to run because the argument passed in was "
    if (typeof node === "string")
      returnString += "\"" + node + "\""
    else
      returnString += node
    return returnString += ". depthFirstSearch(node) can only take nodes as its input."
  }
  console.log(node)   // For this implementation, all we do when we visit each node is print it out. This can change to another method.
  node.visited = true // We set the visited attribute of node to true so we know that we don't need to visit it later.
  for (let i = 0; i < node.neighbors.length; i++)   // Because of this for loop, depthFirstSearch (node) should never call
    if (node.neighbors[i].visited === false)        // depthFirstSearch (node) when node.neighbors[i] is null.
      depthFirstSearch(node.neighbors[i])
}

// I'm doing things in sort of a weird order. I wrote the algorithm, following Gayle Laakmann McDowell's pseudocode, first, and now I'm going
// to define a Node class that I can hopefully use to test whether or not I wrote the depth-first search function correctly.

function Node(val) {
    this.val = val
    this.neighbors = []
    this.visited = false
}

// To start things off simply, I'll just create a root node with two children. This will be an undirected graph, so if there is an edge
// from node a to node b, there is also an edge from node b to node a.
let firstNode = new Node(5)
let secondNode = new Node(2.5)
let thirdNode = new Node(10)

// We're going to let firstNode be the root, and secondNode and thirdNode will be its two children.
firstNode.neighbors[0] = secondNode
firstNode.neighbors[1] = thirdNode

secondNode.neighbors[0] = firstNode
thirdNode.neighbors[0] = firstNode

// Of course, can't forget to call depthFirstSearch (node)!
depthFirstSearch(firstNode)     // Should output all three nodes in the following order: firstNode, secondNode, thirdNode.
/*
Output:
Node {
  val: 5,
  neighbors:
   [ Node { val: 2.5, neighbors: [Array], visited: false },
     Node { val: 10, neighbors: [Array], visited: false } ],
  visited: false }
Node {
  val: 2.5,
  neighbors: [ Node { val: 5, neighbors: [Array], visited: true } ],
  visited: false }
Node {
  val: 10,
  neighbors: [ Node { val: 5, neighbors: [Array], visited: true } ],
  visited: false }
=> undefined
*/
depthFirstSearch(secondNode)    // Should output only the secondNode.
/*
Interesting! Because of the way I wrote the description of the graph, and I am specifically referring to the fact that I referred to firstNode
as a root and secondNode and thirdNode as its children, I believed that depthFirstSearch(secondNode) would only output seoncdNode because I
thought it would have no way of "traversing up" to the root. Then, I remembered that the graph I created is specifically undirected, and,
thus, the "shape" of the graph, regardless of my thinking it 'looked like' a tree, is irrelevant. Id est (i.e.), the graph I created could
just as easily look like this: secondNode < - > firstNode < - > thirdNode. I'm actually glad something unexpected happened here, but only
because I understood why!
Output:
Node {
  val: 2.5,
  neighbors: [ Node { val: 5, neighbors: [Array], visited: false } ],
  visited: false }
Node {
  val: 5,
  neighbors:
   [ Node { val: 2.5, neighbors: [Array], visited: true },
     Node { val: 10, neighbors: [Array], visited: false } ],
  visited: false }
Node {
  val: 10,
  neighbors: [ Node { val: 5, neighbors: [Array], visited: true } ],
  visited: false }
=> undefined
*/
depthFirstSearch(thirdNode)    // Should actually output the entire graph, because it's undirected! Just like for secondNode.
/*
Woohoo! It printed out exactly what I expected, this time.
Output:
Node {
  val: 10,
  neighbors: [ Node { val: 5, neighbors: [Array], visited: false } ],
  visited: false }
Node {
  val: 5,
  neighbors:
   [ Node { val: 2.5, neighbors: [Array], visited: false },
     Node { val: 10, neighbors: [Array], visited: true } ],
  visited: false }
Node {
  val: 2.5,
  neighbors: [ Node { val: 5, neighbors: [Array], visited: true } ],
  visited: false }
=> undefined
*/

// In her book, there's a graph that Gayle Laakmann McDowell uses to illustrate DFS and BFS. I'm going to model that graph in this program
// and call my depth-first search implementation on it before continuing, to really make sure my implementation is working as expected.

//  0   ->  1   <-  2
//  |  \    |   \   ^
// \/   _\, \/  _\, |
//  5       4   <-  3

// My ASCII arrow-drawing skills need work. To make it explicit, node 0 has edges to nodes 1, 4, and 5.
// Node 1 has edges to nodes 4 and 3. Node 2 has an edge to node 1. Node 3 has edges to nodes 2 and 4.
// Node 4 does not have any outgoing edges. The same is true of node 5. It should be clear by this point: this is a directed graph.

// Now, time to create the graph in this file.
let nodeZero = new Node(0)
let nodeOne = new Node(1)
let nodeTwo = new Node(2)
let nodeThree = new Node(3)
let nodeFour = new Node(4)
let nodeFive = new Node(5)

// Now, we're going to set the neighbors of each node as described above.
nodeZero.neighbors = [nodeOne, nodeFour, nodeFive]  // I actually didn't know we could assign multiple neighbors at a time like this.
nodeOne.neighbors = [nodeThree, nodeFour]           // I thought we could only assign neighbors one at a time like so: neighbors[i] = nodeOne.
nodeTwo.neighbors = [nodeOne]                       // In the line above, I think it's actually important that nodeThree is before nodeFour,
nodeThree.neighbors = [nodeTwo, nodeFour]           // since we are going to assume we iterate through neighbors in numerical order.

// This should be the only node in this graph that we can call depthFirstSearch on and still get the entire graph, since nodeZero is the only
// node in the entire graph with "access" to nodeFive.
depthFirstSearch(nodeZero)
/*
Excellent! This worked just as expected. It even printed out the nodes in the same order as they appear 107 of Gayle Laakmann McDowell's book,
Cracking the Coding Interview.
Output:
Node {
  val: 0,
  neighbors:
   [ Node { val: 1, neighbors: [Array], visited: false },
     Node { val: 4, neighbors: [], visited: false },
     Node { val: 5, neighbors: [], visited: false } ],
  visited: false }
Node {
  val: 1,
  neighbors:
   [ Node { val: 3, neighbors: [Array], visited: false },
     Node { val: 4, neighbors: [], visited: false } ],
  visited: false }
Node {
  val: 3,
  neighbors:
   [ Node { val: 2, neighbors: [Array], visited: false },
     Node { val: 4, neighbors: [], visited: false } ],
  visited: false }
Node {
  val: 2,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true } ],
  visited: false }
Node { val: 4, neighbors: [], visited: false }
Node { val: 5, neighbors: [], visited: false }
=> undefined
*/
depthFirstSearch(nodeOne)
/*
Everything looks good! What prints out is what I expected.
Output:
Node {
  val: 1,
  neighbors:
   [ Node { val: 3, neighbors: [Array], visited: false },
     Node { val: 4, neighbors: [], visited: false } ],
  visited: false }
Node {
  val: 3,
  neighbors:
   [ Node { val: 2, neighbors: [Array], visited: false },
     Node { val: 4, neighbors: [], visited: false } ],
  visited: false }
Node {
  val: 2,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: true } ],
  visited: false }
Node { val: 4, neighbors: [], visited: false }
=> undefined
*/
depthFirstSearch(nodeTwo)
/*
Everything looks good! The output is what I expected.
Output:
Node {
  val: 2,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: false } ],
  visited: false }
Node {
  val: 1,
  neighbors:
   [ Node { val: 3, neighbors: [Array], visited: false },
     Node { val: 4, neighbors: [], visited: false } ],
  visited: false }
Node {
  val: 3,
  neighbors:
   [ Node { val: 2, neighbors: [Array], visited: true },
     Node { val: 4, neighbors: [], visited: false } ],
  visited: false }
Node { val: 4, neighbors: [], visited: false }
=> undefined
*/
depthFirstSearch(nodeThree)
/*
Looks good! No unexpected output here.
Output:
Node {
  val: 3,
  neighbors:
   [ Node { val: 2, neighbors: [Array], visited: false },
     Node { val: 4, neighbors: [], visited: false } ],
  visited: false }
Node {
  val: 2,
  neighbors: [ Node { val: 1, neighbors: [Array], visited: false } ],
  visited: false }
Node {
  val: 1,
  neighbors:
   [ Node { val: 3, neighbors: [Array], visited: true },
     Node { val: 4, neighbors: [], visited: false } ],
  visited: false }
Node { val: 4, neighbors: [], visited: false }
=> undefined
*/
depthFirstSearch(nodeFour) // I fully expect this to output only nodeFour. Output: Node { val: 4, neighbors: [], visited: false } => undefined
depthFirstSearch(nodeFive) // I fully expect this to output only nodeFive. Output: Node { val: 5, neighbors: [], visited: false } => undefined

// Okay, only one more graph test case, and then some "silly" outputs, meaning I'm going to pass "non-node" inputs to depthFirstSearch(node),
// and then I'll move onto implementing breadth-first search.

// I'm going to try to make this graph a really unbalanced tree. That is, I'll try to make the left side really long and the right side
// just one node long. The root will only have one right child. And, I'll make this tree directed in such a way that nodes can only "visit"
// their children.
let node1 = new Node("root")
let node2 = new Node("leftChild")
let node3 = new Node("rightChild")
let node4 = new Node("leftGrandchild")
let node5 = new Node("leftGreatGrandchild")
let node6 = new Node("leftGreatGreatGrandchild")

// Just have to make their connections, now.
node1.neighbors = [node2, node3]
node2.neighbors = [node4]
node4.neighbors = [node5]
node5.neighbors = [node6]

// So, by now, this graph should look something like this.
// leftGreatGreatGrandchild <- leftGreatGrandchild <- leftGrandchild <- leftChild <- root -> rightChild

// Let's test depthFirstSearch(node) on this last graph to make sure the output meets our expectations.
depthFirstSearch(node1)
/*
Perfect! This is what I expected.
Output:
Node {
  val: 'root',
  neighbors:
   [ Node { val: 'leftChild', neighbors: [Array], visited: false },
     Node { val: 'rightChild', neighbors: [], visited: false } ],
  visited: false }
Node {
  val: 'leftChild',
  neighbors:
   [ Node { val: 'leftGrandchild', neighbors: [Array], visited: false } ],
  visited: false }
Node {
  val: 'leftGrandchild',
  neighbors:
   [ Node {
       val: 'leftGreatGrandchild',
       neighbors: [Array],
       visited: false } ],
  visited: false }
Node {
  val: 'leftGreatGrandchild',
  neighbors:
   [ Node {
       val: 'leftGreatGreatGrandchild',
       neighbors: [],
       visited: false } ],
  visited: false }
Node {
  val: 'leftGreatGreatGrandchild',
  neighbors: [],
  visited: false }
Node { val: 'rightChild', neighbors: [], visited: false }
=> undefined
*/
depthFirstSearch(node2) // Should only print the left branch of the tree, starting with the left child of the root.
/*
Excellent! This is just what I expected.
Output:
Node {
  val: 'leftChild',
  neighbors:
   [ Node { val: 'leftGrandchild', neighbors: [Array], visited: false } ],
  visited: false }
Node {
  val: 'leftGrandchild',
  neighbors:
   [ Node {
       val: 'leftGreatGrandchild',
       neighbors: [Array],
       visited: false } ],
  visited: false }
Node {
  val: 'leftGreatGrandchild',
  neighbors:
   [ Node {
       val: 'leftGreatGreatGrandchild',
       neighbors: [],
       visited: false } ],
  visited: false }
Node {
  val: 'leftGreatGreatGrandchild',
  neighbors: [],
  visited: false }
=> undefined
*/
depthFirstSearch(node4) // Skip node3, the right child of the root, for now, and do depthFirstSearch on the left "grandchild".
/*
No surprises here. That's good.
Output:
Node {
  val: 'leftGrandchild',
  neighbors:
   [ Node {
       val: 'leftGreatGrandchild',
       neighbors: [Array],
       visited: false } ],
  visited: false }
Node {
  val: 'leftGreatGrandchild',
  neighbors:
   [ Node {
       val: 'leftGreatGreatGrandchild',
       neighbors: [],
       visited: false } ],
  visited: false }
Node {
  val: 'leftGreatGreatGrandchild',
  neighbors: [],
  visited: false }
=> undefined
*/
depthFirstSearch(node5) // Does depthFirstSearch on the left "great-grandchild", so should only visit itself and the "great-great-grandchild".
/*
Perfect.
Output:
Node {
  val: 'leftGreatGrandchild',
  neighbors:
   [ Node {
       val: 'leftGreatGreatGrandchild',
       neighbors: [],
       visited: false } ],
  visited: false }
Node {
  val: 'leftGreatGreatGrandchild',
  neighbors: [],
  visited: false }
=> undefined
*/
depthFirstSearch(node6) // Last left child. Output: Node { val: 'leftGreatGreatGrandchild', neighbors: [], visited: false } => undefined
depthFirstSearch(node3) // This is the only right child. Output: Node { val: 'rightChild', neighbors: [], visited: false } => undefined

// Alright, time for the "silly" test cases, and then I'll finally move on to writing a breadth-first search implementation.
depthFirstSearch(null)
/*
=> 'depthFirstSearch(node) is unable to run because the argument passed in was null. depthFirstSearch(node) can only take nodes as its input.'
*/
depthFirstSearch(undefined)
/*
=> 'depthFirstSearch(node) is unable to run because the argument passed in was undefined. depthFirstSearch(node) can only take nodes as its
input.'
*/
depthFirstSearch(false)
/*
=> 'depthFirstSearch(node) is unable to run because the argument passed in was false.
depthFirstSearch(node) can only take nodes as its input.'
*/
depthFirstSearch([34543,333,35345,69679768,345345] instanceof Array)
/*
=> 'depthFirstSearch(node) is unable to run because the argument passed in was true. depthFirstSearch(node) can only take nodes as its input.'
*/
depthFirstSearch( [ 345345 + 5435345, 1 === 1, 456, "hi", 'g', 4657567, null, undefined, [34534] ] )
/*
=> 'depthFirstSearch(node) is unable to run because the argument passed in was 5780690,true,456,hi,g,4657567,,,34534. depthFirstSearch(node)
can only take nodes as its input.'
*/

// I think that's as thorough as I want to be with the test cases. I want to move on to an implementation of breadth-first search.

// I accidentally looked at the pseudocode for BFS by pressing the Tab key on my keyboard, but I didn't see much.

// I think the explanation given in the two paragraphs preceding the pseudocode provides enough information to write an implementation
// of breadth-first search without having to looking at the pseudocode for too long, and that's what I'm going to try to do.

// By the way, I created an illustration containing visualizations of the three graphs I created in this file.

// The illustrations should be viewable, along with this file, at the following link: https://github.com/hamirmahal/Algorithms.

// Look for the folder named "Depth-first search", without quotation marks.

// I hope you found this file, my attempt at writing an implementation of depth-first search, helpful! Have a nice day.