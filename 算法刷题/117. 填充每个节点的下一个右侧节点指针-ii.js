/*
 * @lc app=leetcode.cn id=117 lang=javascript
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {

    if (root === null) {
        return null
    }

    const queue = [root]

    // 层序遍历
    while(queue.length) {

        const len = queue.length
        let last = null

        // 遍历某一层
        for (let i = 0; i < len; i++) {

            const cur = queue.shift()
                        
            if (cur.left) {
                queue.push(cur.left)
            }
    
            if (cur.right) {
                queue.push(cur.right)
            }

            if (i !== 0) {
                last.next = cur
            }

            last = cur
        }

    }

    return root

};
// @lc code=end

