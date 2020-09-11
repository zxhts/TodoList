import React,{Component} from 'react';
import { Button } from 'element-react';  //引入element-react

interface IProps {
    index:number,
    item:string,
    clickHandle:(index:number)=>void
}
class Item extends Component<IProps>{
    constructor(props:IProps) {
        super(props);
        this.clickHandle=this.clickHandle.bind(this)
    }
    clickHandle():void{
        this.props.clickHandle(this.props.index);
    }
    render(){
        return (
             <li className="list">{this.props.item}<Button className="del" type="danger" onClick={this.clickHandle}>删除</Button></li>
        );
    }
}

export default Item;