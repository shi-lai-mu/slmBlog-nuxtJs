// import Router from 'next/router'
const Help =  (props) => {
  return (
    <div id="helppage">
      id：{props.id}<br/>
      title：{props.title}
      <style>{`
        #helppage {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 600px;
          width: 100%
        }
      `}</style>
    </div>
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