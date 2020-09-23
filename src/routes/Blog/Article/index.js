import React from "react";
import {Table,  Card, Popconfirm, message, Button} from 'antd';
import { getAllArticles,deleteArticlesById} from "../../../api";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";
import WrappedNormalLoginForm from './form';
import './index.css'
const {Column} = Table;

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData:[],   // 表格数据
            tableLoading:false, // 表格加载
            formVisible:false,  // 弹窗
            editKey:'', // 要修改的行的key，即id
            editRecord:{},  // 要修改的行的数据
        }
    }
    componentDidMount() {
        this.getInfo();
    }

    // 获取所有文章信息
    getInfo = async () =>{
        this.setState({tableLoading:true});
        let res = await getAllArticles();
        if(res.data){
            res.data.forEach((item)=>{
                item.key = item.id;
            })
            this.setState({tableData:res.data})
        }else {
            this.setState({tableData:[]})
        }
        this.setState({tableLoading:false});
    }
    // 删除行
    delete = async (key) => {
        let res = await deleteArticlesById({
            id:key
        })
        if(!res.erron){
            message.success('删除成功!')
        }else {
            message.error('删除失败!')
        }
        this.getInfo(); // 重新获取数据
    }
    // 修改行
    edit = (record) => {
        this.setState({formVisible:true,editRecord:record,editKey:record.key})
    }
    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['文章']}/>
                <Card bordered={false} title='诗句内容' style={{marginBottom: 10, }} id='select'>
                    <div className="table-operations">
                        <Button type="primary" icon='redo' onClick={()=>this.getInfo()}>刷新</Button>
                        <Button type="primary" icon='plus' onClick={()=>this.setState({formVisible:true,editRecord:{},editKey:''})}>新增</Button>
                    </div>
                    <Table dataSource={this.state.tableData} loading={this.state.tableLoading} bordered>
                        <Column title="文章名" dataIndex="title" key="title" width={'200px'}/>
                        <Column title="作者" dataIndex="author" key="author" width={'70px'}/>
                        <Column title="时间" dataIndex="date" key="date" width={'150px'}/>
                        <Column title="show" dataIndex="show" key="show"/>
                        <Column title="likes" dataIndex="likes" key="likes"/>
                        <Column title="eyes" dataIndex="eyes" key="eyes"/>
                        <Column title="type" dataIndex="type" key="type"/>
                        <Column title="backImgName" dataIndex="backImgName" key="backImgName"/>
                        <Column title="简介" dataIndex="introduction" key="introduction"/>
                        <Column title="操作" dataIndex="action" width={'120px'} key="action" render={(text,record,index)=>(
                            <span>
                                 <a onClick={() => this.edit(record)}>
                                     修改
                                 </a>
                                 <Popconfirm title="确认删除吗?" onConfirm={() => this.delete(record.key)}>
                                     <a style={{color:'red',marginLeft:'5px'}}>删除</a>
                                 </Popconfirm>
                            </span>
                        )}/>
                    </Table>,
                </Card>

                <WrappedNormalLoginForm
                    FatherState={this.state}
                    FromHide={()=>{this.setState({formVisible:false,editKey:'',editRecord:{}})}}
                    refresh={() => {this.getInfo()}}
                />
            </div>
        )
    }
}

export default Article;
