class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    detectLoop() {
        let slow = this.head;
        let fast = this.head;
        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow === fast) {
                return true; // Loop detected
            }
        }
        return false; // No loop
    }
}

// Example usage
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.append(4);

// Creating a loop manually
list.head.next.next.next.next = list.head.next; // 4 -> 2 (loop)

console.log(list.detectLoop()); // true
