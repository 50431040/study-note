/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {

    const cache = {}

    const loop = (n) => {

        if (n <= 2) {
            return n
        }

        if (cache[n]) {
            return cache[n]
        }

        cache[n] = loop(n - 1) + loop(n - 2)

        return cache[n]
    }

    return loop(n)
};
// @lc code=end

