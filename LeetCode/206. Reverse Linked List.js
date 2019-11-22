// This is my solution to problem 206. Reverse Linked List on LeetCode,
// the link to which is here: https://leetcode.com/problems/reverse-linked-list/.

// For your convenience, I'm copying-and-pasting some of the contents from that webpage here.

/*
206. Reverse Linked List

Reverse a singly linked list.
Example:
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
*/

// I'm copying-and-pasting the solution I submitted to LeetCode. I believe this solution takes O(n) time and O(1) memory.
// Out of the several submissions I made with this solution, the fastest run beat 82.87% of JavaScript submissions with a runtime of 56 ms.
// That same run used 34.8 MB of memory.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // We try to reverse the order of the list "up-front".
    
    // By that, I mean we start changing the next attribute of the head,
    // and then move forward.
    
    // We do this because it's much less efficient to navigate all the way to the tail
    // of the linked list first, and begin modifications there, and then move all the way
    // to the ListNode previous to the tail, and modify its attributes, and so on and so
    // forth, especially because we are dealing with a singly linked, and not doubly
    // linked, list.
    
    // The first thing we do is check to see if this solution method received an argument
    // signifying an empty linked list. If it did, this solution method exits immediately,
    // returning null.
    if (head == null)
        return null;
    
    // There are only three things of which this solution method needs to be cognizant.
    
    // This solution method must keep track of the current ListNode we are at, the ListNode
    // that this current ListNode's next attribute used to point to, and the ListNode that
    // is immediately before the current ListNode in the original linked list.
    
    var currentNode = head;
    var oldNext = null;
    var previous = null;    // There is nothing before the head; that's why this is null.
    
    // While we have not reached the end of the linked list...
    while (currentNode != null)
    {
        oldNext = currentNode.next;     // oldNext should be the original next ListNode.
        currentNode.next = previous;    // We update the next attribute of currentNode.
        previous = currentNode;         // previous is now the ListNode we just finished.
        currentNode = oldNext;          // currentNode is now the original next ListNode.
    }
    
    // Upon termination of the above while loop, the head of the reversed singly linked
    // list is the ListNode referenced by previous, so we return previous.
    return previous;
};

// I didn't write the following code on LeetCode because LeetCode has its own way of testing the reverseList function's correctness.

// I write this code so that people can test the correctness of the reverseList method I wrote in this JavaScript file more conveniently.

// First, here is the definition of a ListNode in JavaScript as given by LeetCode. I copied-and-pasted it from the top of this file:

function ListNode(val) {
    this.val = val;
    this.next = null;
}

// First, we create five ListNodes.
let one = new ListNode(1)
let two = new ListNode(2)
let three = new ListNode(3)
let four = new ListNode(4)
let five = new ListNode(5)

// Then, we set their next attributes as they appear in the given example on LeetCode. For your convenience, here is their sample code,
// copied-and-pasted from the top of this file, which, in turn, I copied and pasted from their website at this link:
// https://leetcode.com/problems/reverse-linked-list/
/*
206. Reverse Linked List

Reverse a singly linked list.
Example:
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
*/
one.next = two;
two.next = three;
three.next = four;
four.next = five;

// To test that I did the initialization correctly, I create a printList(head) function that uses console.log() to print out a visualization
// of the five ListNodes instantiated above. 
head = one

function printList(head) {
    while (head != null) {
        console.log(head.val + "->")
        head = head.next
    }
}

printList(one)

// Here is the output:
/*
1->
2->
3->
4->
5->
=> null
*/

// Since it looks like I did the initialization correctly, all that's left is to call the solution method I wrote, and print out the results
// via the console to verify that they match the expected output on LeetCode, which should be "5->4->3->2->1->NULL", as pasted above.

// Since reverseList(head) already returns the new head of the reversed singly linked list, all that's left
// is to call printList(reverseList(one)), since one was the original head of the original singly linked list, and reverseList(one) returns
// the head of the reversed singly linked list.
console.log("The original singly linked list finished printing. The reversed singly linked list is about to print.")
printList(reverseList(one))

// The output we desire is the output LeetCode gave in their example, re-pasted here for your convenience: Output: 5->4->3->2->1->NULL
// Here is our output:
/*
1->
2->
3->
4->
5->
The original singly linked list finished printing. The reversed singly linked list is about to print.
5->
4->
3->
2->
1->
=> undefined
*/
// Hooray! Looks like it works.