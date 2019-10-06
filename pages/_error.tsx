import React from 'react'
import Link from 'next/link'
import '../static/scss/error.scss'

interface ErrorPageProps {
  message?: string;
  code?: number;
}

export default class _Error extends React.Component<ErrorPageProps> {
  render() {
    const errorMessage: string = this.props.message || '糟糕页面出现问题了!'
    const errorCode: number = this.props.code || 404
    const codeSplit = errorCode.toString().split('')

    return (
      <div className="bg-purple">
        <div className="central-body">
          <div>
          {
            codeSplit.map((item: string) => (
              <span
                className="tip-code"
                style={{
                  transform: `translate(${Math.floor(Math.random() * 5)}%, ${Math.floor(Math.random() * 5)}%)`,
                  animation: `code-animation ${Math.floor(Math.random() * 3 + 2)}s ease-in-out infinite alternate`
                }}>
                { item }
              </span>
            ))
          }
          </div>
          <div className="tip-msg">
            { errorMessage }
          </div>
          <Link href={{ pathname: '/' }}>
            <a className="btn-go-home">GO BACK HOME</a>
          </Link>
        </div>
        <div className="objects">
          <img className="object_rocket" src="/static/svg/rocket.svg" width="40px" />
          <div className="earth-moon">
            <img className="object_earth" src="/static/svg/earth.svg" width="100px" />
            <img className="object_moon" src="/static/svg/moon.svg" width="80px" />
          </div>
          <div className="box_astronaut">
            <img className="object_astronaut" src="/static/svg/astronaut.svg" width="140px" />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    )
  }
}