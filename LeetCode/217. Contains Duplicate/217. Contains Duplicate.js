/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let uniqueCharacters = new Set();
    for (let i = 0; i < nums.length; i++)
      if (uniqueCharacters.add(nums[i]).size === i)
        return true
    return false
};