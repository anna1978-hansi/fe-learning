function quickSort(arr, left = 0, right = arr.length - 1) {
    if(left>=right)return
    const privot=partition(arr,left,right)
    quickSort(arr,left,privot-1)
    quickSort(arr,privot+1,right)
    return arr
}

function partition(arr,left,right){
    /**
     * left+right确定数组的边界
     * 将arr数组分为大于privot，小于privot，等于privot
     * return： privot在arr中的Index
     */
    const privot=arr[left]// 第一个元素
    let i=left,j=right;
    while(i<j){
        while (i < j && arr[j] >= pivot) j--;
        while (i < j && arr[i] <= pivot) i++;
        /**
         * 两个while符合要求，不用移动
         */
        if(i<j){
            //交换位置
            [arr[i],arr[j]]=[arr[j],arr[i]]
        }
    }
    /**
     * i处是【rivot的index，需要交换一下位置～
     */
    return i
}