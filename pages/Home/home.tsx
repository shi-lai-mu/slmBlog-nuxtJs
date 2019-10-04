import DefaultLayouts from '../../layouts/default'
// import dynamic from 'next/dynamic'
import BlogLogo from '../../components/logo';

export default () => {
  return (
    <DefaultLayouts>
        <h1>Home</h1>
        <BlogLogo size={50} />
    </DefaultLayouts>
  )
}