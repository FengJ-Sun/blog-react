// eslint-disable-next-line no-unused-vars
import React from "react";
import {Table, Input, InputNumber, Popconfirm, Form, Card ,message,Button} from 'antd';

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index';
import { getAllVerse,updateVerseById,deleteVerseById } from "../../../api";
import './index.css';
import WrappedNormalLoginForm from './form';
const EditableContext = React.createContext();
class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };

    renderCell = ({getFieldDecorator}) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{margin: 0}}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `请输入 ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],    // 表格内容
            editingKey: '', // 想要修改的行的key
            isTableLoading:true,    // 表格加载数据
            formVisible:false,  // 增加诗句的form
        };
        this.columns = [
            {
                title: '诗名',
                dataIndex: 'title',
                width: '10%',
                editable: true,
            },
            {
                title: '作者',
                dataIndex: 'author',
                width: '10%',
                editable: true,
            },
            {
                title: '朝代',
                dataIndex: 'dynasty',
                width: '10%',
                editable: true,
            },
            {
                title: '内容',
                dataIndex: 'content',
                width: '40%',
                editable: true,
            },
            {
                title: '显示',
                dataIndex: 'show',
                width: '10%',
                editable: true,
            },
            {
                title: '其它',
                dataIndex: 'other',
                width: '10%',
                editable: true,
            },
            {
                title: '操作',
                width: '10%',
                dataIndex: 'operation',
                render: (text, record) => {
                    const {editingKey} = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                                        <span>
                                          <EditableContext.Consumer>
                                            {form => (
                                                <a
                                                    onClick={() => this.save(form, record.key)}
                                                    style={{marginRight: 8}}
                                                >
                                                    保存
                                                </a>
                                            )}
                                          </EditableContext.Consumer>
                                          <Popconfirm title="确认取消吗?" onConfirm={() => this.cancel(record.key)}>
                                              <a>取消</a>
                                          </Popconfirm>
                                        </span>
                                    ) :
                                    (
                                        <span>
                                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                                修改
                                            </a>
                                            <Popconfirm title="确认删除吗?" onConfirm={() => this.delete(record.key)}>
                                                <a style={{color:'red',marginLeft:'5px'}}>删除</a>
                                            </Popconfirm>
                                        </span>

                                    );
                },
            },
        ];
        // 获取所有诗句
        this.getAllVerseInfo = async () =>{
            this.setState({isTableLoading:true});
            await getAllVerse().then(res => {
                if(res.data.length > 0){
                    let _data = [];
                    res.data.forEach((el) => {
                        _data.push({
                            key:el.id,
                            id:el.id,
                            author:el.author,
                            content:el.content,
                            dynasty:el.dynasty,
                            other:el.other,
                            show:el.show,
                            title:el.title,
                            createdAt:el.createdAt,
                            updatedAt:el.updatedAt
                        })
                    })
                    _data = _data.reverse();
                    this.setState({data:_data});
                }else {
                    this.setState({data:[]});
                }
            }).catch(err => {
                this.setState({data:[]});
            })
            this.setState({isTableLoading:false});
        }
    }
    isEditing = record => record.key === this.state.editingKey;
    componentDidMount(){
        this.getAllVerseInfo();
    }
    // 取消
    cancel = () => {
        this.setState({editingKey: ''});
    };
    // 修改
    save(form, key) {
        form.validateFields(async (error, row) => {
            if (error) {
                return;
            }
            row.id = key;
            let res = await updateVerseById(row);
            if(!res.errno){
                message.success('修改成功!');
                this.getAllVerseInfo(); // 重新获取所有数据，所有的古诗大概就几十行数据
            }else {
                message.error('修改失败!');
            }
            this.setState({editingKey: ''});
        });
    }
    // 修改
    edit(key) {
        this.setState({editingKey: key});
    }
    // 隐藏form
    FromHide = () => {
        this.setState({formVisible:false});
    }
    // 删除
    async delete(key){
        let res = await deleteVerseById({
            id:key
        });
        if(!res.errno){
            message.success('删除成功!');
        }
        this.getAllVerseInfo();
    }
    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        // const cardContent = `<ul class="card-ul">
        //     <li>博客首页展示的诗句。</li>
        //   </ul>`;
        return (
            <div>
                <CustomBreadcrumb arr={['诗句']}/>
                {/*<TypingCard source={cardContent} title='诗句' />*/}

                <Card bordered={false} title='诗句内容' style={{marginBottom: 10, }} id='select'>
                    <div className="table-operations">
                        <Button type="primary" icon='redo' onClick={()=>this.getAllVerseInfo()}>刷新</Button>
                        <Button type="primary" icon='plus' onClick={()=>this.setState({formVisible:true})}>新增</Button>
                    </div>
                    <EditableContext.Provider value={this.props.form}>
                        <Table
                            loading={this.state.isTableLoading}
                            size={"middle"}
                            components={components}
                            bordered
                            dataSource={this.state.data}
                            columns={columns}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: this.cancel,
                            }}
                        />
                    </EditableContext.Provider>
                    <WrappedNormalLoginForm formVisible={this.state.formVisible} FromHide={this.FromHide} fresh={()=>this.getAllVerseInfo()} />
                </Card>
            </div>

        );
    }
}

const Verse = Form.create()(EditableTable);
export default Verse;
