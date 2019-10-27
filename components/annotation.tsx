import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class ReactComment extends Component<any> {

    static defaultProps = {
        trim: true
    }

    componentDidMount() {
      let el: any = ReactDOM.findDOMNode(this)
      ReactDOM.unmountComponentAtNode(el)
      el.outerHTML = this.createComment()
    }

    createComment() {
      let text = this.props.text
      if (this.props.trim) {
        text = text.trim()
      }
      return `<!-- ${text} -->`
    }

    render() {
      return <div />
    }
}

export default ReactComment;