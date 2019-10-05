import Link from 'next/link'
import Logo from '../../components/logo'
import menuConfig from '../../config/default.layouts.header'
import React from 'react'

interface DefauleLayoutsHeaderProps {
  active: string;
  onRouterEvent: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default class LayoutsDefauleHeader extends React.Component<DefauleLayoutsHeaderProps> {
  render() {
    const { props } = this

    return (
      <div className="default-layouts-header">
        <div className="header-inner">
          <Logo />
          <div className="nav-bar" onClick={ this.props.onRouterEvent }>
            {
              menuConfig.menu.map((item: any, index: number) => (
                <Link href={{ pathname: item.path }} key={index}>
                  <div className="bar" style={props.active === item.name ? { color: '#09c' } : {}}>
                    { item.nickName }
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}
