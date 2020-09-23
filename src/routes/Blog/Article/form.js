import React from "react";
import {Form, Input, Modal,message,DatePicker} from 'antd';
import {updateArticle,addArticles} from "../../../api";
import moment from 'moment';
const { TextArea } = Input;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // 数据校验
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                values.date = values.date.format('YYYY-MM-DD');
                if(!this.props.FatherState.editKey){
                    // 新增
                    let res = await addArticles(values);
                    if(!res.errno){
                        message.success('新增成功!')
                    }else {
                        message.error('新增失败!')
                    }
                }else {
                    // 修改
                    values.id = this.props.FatherState.editKey;
                    let res = await updateArticle(values);
                    if(!res.errno){
                        message.success('修改成功!')
                    }else {
                        message.error('修改失败!')
                    }
                }
            }
            this.props.FromHide();  // 关闭form
            this.props.refresh();   // 刷新表格
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="文章"
                visible={this.props.FatherState.formVisible}
                onCancel={this.props.FromHide}
                onOk={this.handleSubmit}
                width={'800px'}
            >
                <Form className="login-form" layout='horizontal' labelCol={{span:4}} wrapperCol={{ span: 16 }}>
                    <Form.Item label='title'>
                        {getFieldDecorator('title', {
                            initialValue:this.props.FatherState.editRecord.title,
                            rules: [{required: true, message: '请输入文章名!', whitespace: true}],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label='date'>
                        {getFieldDecorator('date', {
                            initialValue:moment(this.props.FatherState.editRecord.date || new Date(), 'YYYY-MM-DD'),
                            rules: [{ type: 'object', required: true, message: '请选择时间' }],
                        })(<DatePicker />)}
                    </Form.Item>
                    <Form.Item label='author'>
                        {getFieldDecorator('author', {
                            initialValue:this.props.FatherState.editRecord.author,
                            rules: [{required: true, message: '请输入作者!', whitespace: true}],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label='type'>
                        {getFieldDecorator('type', {
                            initialValue:this.props.FatherState.editRecord.type,
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label='backImgName'>
                        {getFieldDecorator('backImgName', {
                            initialValue:this.props.FatherState.editRecord.backImgName,
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label='introduction'>
                        {getFieldDecorator('introduction', {
                            initialValue:this.props.FatherState.editRecord.introduction,
                        })(<TextArea rows='5' />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);
export default WrappedNormalLoginForm;
