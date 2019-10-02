import HeaderFooter from '../../layouts/HeaderFooter'
// import Router from 'next/router'
const Help =  (props) => {
  return (
    <HeaderFooter active="helps">
      <div id="helppage">
        id：{props.id}<br/>
        title：{props.title}
      </div>
      <style>{`
        #helppage {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 600px;
          width: 100%
        }
      `}</style>
    </HeaderFooter>
  )
}
Help.getInitialProps = async function ({query}) {
  console.log(query);
  query.title = getTitleById(query.id)
  return query
}
function getTitleById (id: string) {
  return `title${id}`
}
export default Help