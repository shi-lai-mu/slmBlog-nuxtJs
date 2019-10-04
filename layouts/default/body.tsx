import * as React from 'react'

export default class BodyLayouts extends React.Component<any, any>  {
  render() {
    return (
      <div className="default-layouts-body">
        { this.props.children }
      </div>
    );
  }
}