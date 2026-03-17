/**
 * 先写一个翻转链表的函数，传入head就会进行翻转
 */
function reverse(head){
    if(!head||!head.next){
        return head 
        //这个时候相当于在最末尾的节点
    }
    const temp=head.next
    const result=reverse(head.next)
    temp.next=head
    head.next=null
    return result
}

function reverseKFromEnd(head,k){
    if(!head)return head
    let len=0
    let cur=head
    while(cur){
        len++
        cur=cur.next
    }
    //此时找到全部len了
    if(len<=k)return head;
    const remain=len%k //这k个相当于不用处理
    let dummy=new ListNode(0)
    dummy.next=head
    let prev=dummy
    //说白了，就是找到k组后，从头往后的一个切分；然后我发现用循环更舒服；
    let start=prev.next
    while(start){
        let end=start
        for(let i=1;i<k;i++){
            end=end.next
        }
        //假设1-9 ，此时start在1，end在3 
        let nextGroupStart=end.next //此时在4
        end.next=null //断开 
        let newHead=reverse(start)// 此时返回3
        prev.next=newHead
        start.next=nextGroupStart
        prev=start
        start=nextGroupStart
    }

    return dummy.next
}