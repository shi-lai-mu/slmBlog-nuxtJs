import DefaultLayouts from '../../layouts/default'
// import dynamic from 'next/dynamic'
import BlogLogo from '../../components/logo';

export default () => {
  return (
    <DefaultLayouts>
      <div id="homepage">
        <h1>Home</h1>
        <BlogLogo size={50} />
        <style>{`
          #homepage {
            width: 100%;
            height:600px;
            background-color: #f7f7f7;
            display: flex;
            justify-content: center;
            align-items: center
          }
        `}</style>
      </div>
    </DefaultLayouts>
  )
}