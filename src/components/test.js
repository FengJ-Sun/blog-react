// eslint-disable-next-line no-unused-vars
import React from "react";

class Test extends React.Component{
    /**
     * 组件中的state
     * 不操作dom,页面元素的改变使用state进行处理
     * @return {*}
     */
    constructor(props) {
        super(props);
        this.state = {
            count:10,
            isTrue:false
        }
    }
    add(){
        this.setState({
            count:this.state.count+=1
        })
    }
    reduce = ()=>{
        this.setState({
            count:this.state.count-=1
        },()=>{
            console.log(this.state.count);// 同步获取
        })
    }
    render() {
        let text = this.state.isTrue?"真":"假";
        return(
            <div>
                <h2>这是state组件</h2>
                <p>{this.state.count}</p>
                <button onClick={ this.add.bind(this) }>增加</button>
                <button onClick={ this.reduce }>减少</button>
                <span>{text}</span>
            </div>
        )
    }
}
export default Test;
