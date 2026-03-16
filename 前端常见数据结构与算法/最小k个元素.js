function smallestK(arr, k) {
    //边界条件
    if (k <= 0) return [];
    if (k >= arr.length) return arr;
    return quickSelect(arr,0,arr.length-1,k).slice(0,k)
}
function quickSelect(arr, left, right, k) {
    /**
     * 主要是传入left和right
     */
    if(left>=right)return 
     const pivotIndex = partition(arr, left, right);
}