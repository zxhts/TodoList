import React,{Component} from "react";
import 'element-theme-default';
import './todoList.css'
import ItemList from './Item'


interface IProps{

}
interface IState {
  list:string [],
  input:string,
  timerId:null|number,
  item:string []
}
class App extends Component<IProps,IState>{
  constructor(props:IProps) {
    super(props);
    this.state={
      list:['北京又一避暑胜地走红','北京市公安局副局长刘国周履新深圳市政府党组成员','北京成为名副其实的“野性都市”','上海宝山：对一公司6名涉案员工依法变更强制措施','上海:中国国际数码互动娱乐展览会','上海这家知名连锁大药房因销售劣药被罚!',
        '天津国家自主创新示范区领导小组会议召开','天津北方网讯:来看今天的央媒看天津','天津环渤海经济开发区的中心','重庆天际线的惊鸿一瞥','重庆老板被设局陷7年讼战资产清零','重庆高速公路首个大型技术创新中心成立'],
      input:'',
      timerId:null,
      item:[]
    }
    this.onDebounceKeyUpClick=this.onDebounceKeyUpClick.bind(this)
    this.delItem=this.delItem.bind(this)
  }
  ajax(content:string):void{
    let keyWords:string=content;
    let result:string[];
    if(content===""){
      result=[];
    }else{
      result=this.state.list.filter((value,index):boolean=>{
        return value.indexOf(keyWords)!==-1;
      })
    }
    this.setState({
      item:result
    })
  }

  debounce (fn:(content:string)=>void,delay:number):(rest:string)=>void{
    return (rest:string) => {
      // let args = rest;
      if (this.state.timerId) clearTimeout(this.state.timerId);
      this.setState({
        timerId:window.setTimeout(()=>{
          // fn.apply(this,args)
          fn.call(this,rest)
        },delay)
      })
    }
  }
  onDebounceKeyUpClick(e:any):void{//加入防抖动后 在频繁输入后 不会发送请求
    let debounceAjax = this.debounce(this.ajax, 500)
    debounceAjax(e.target.value)
  }
  //删除
  delItem(index:number):void{
    let list = [...this.state.item];
    list.splice(index,1);
    this.setState({
      item:list
    })
  }

  render() {
    return(
        <div className="box">
          <h1>TodoList</h1>
          <input type="text" className="input" onKeyUp={this.onDebounceKeyUpClick} />
          <ol>
            {
              this.state.item.map((value,index)=>{
                return (
                    <ItemList index={index} key={index} item={value} clickHandle={this.delItem}></ItemList>
                )
              })
            }
          </ol>
        </div>
    )
  }
}

export default App;