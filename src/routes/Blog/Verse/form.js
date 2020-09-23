import React from "react";
import {Form, Input, Modal,message} from 'antd';
import {addVerse} from "../../../api";
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
                let res = await addVerse(values);
                if(!res.errno){
                    message.success('新增成功!')
                    // eslint-disable-next-line no-unused-expressions
                    this.props.fresh(); // 刷新表格
                }else{
                    message.error('新增失败!')
                }
                // eslint-disable-next-line no-unused-expressions
            }
            this.props.FromHide();  // 关闭form
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="新增诗句"
                visible={this.props.formVisible}
                onCancel={this.props.FromHide}
                onOk={this.handleSubmit}
            >
                <Form className="login-form"  labelCol={{ span: 3,}} wrapperCol={{ span: 18,offset:1 }}>
                    <Form.Item
                        label={<span>作者</span>}
                    >
                        {getFieldDecorator('author', {
                            rules: [{required: true, message: '请输入作者!', whitespace: true}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item
                        label={<span>题目</span>}
                    >
                        {getFieldDecorator('title', {
                            rules: [{required: true, message: '请输入题目!', whitespace: true}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item
                        label={<span>朝代</span>}
                    >
                        {getFieldDecorator('dynasty', {
                            rules: [{required: true, message: '请输入朝代!', whitespace: true}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item
                        label={<span>诗句</span>}
                    >
                        {getFieldDecorator('content', {
                            rules: [{required: true, message: '请输入诗句!', whitespace: true}],
                        })(<TextArea rows={4} />)}
                    </Form.Item>
                    <Form.Item
                        label={<span>其它</span>}
                    >
                        {getFieldDecorator('other', {
                        })(<TextArea rows={2} />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);
export default WrappedNormalLoginForm;
