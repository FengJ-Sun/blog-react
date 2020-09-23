import React from 'react'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'

export default class About extends React.Component {
    render() {
        const cardContent = `<ul class="card-ul">
            <li>博客首页展示的诗句。</li>
            <li>五言、七言</li>
          </ul>`
        return (
            <div>
                <CustomBreadcrumb arr={['关于']}/>
                <TypingCard source={cardContent} title='关于'/>
            </div>
        )
    }
}
