import Link from 'next/link'

export default (props) => {
 return (
   <>
     <div className="header">
       <div className="header-inner">
         <Link  href="/">
           <h2 style={{cursor: 'pointer'}} className="logo">slmBlog</h2>
         </Link>
         <div className="nav-bar">
           <Link href="/Home/home">
             <div className="bar" style={props.active === 'home' ? {color: '#09c'} : {}}>Home</div>
           </Link>
           <Link href="/Aboutus/aboutus">
             <div className="bar" style={props.active === 'aboutus' ? {color: '#09c'} : {}}>AboutUs</div>
           </Link>
           <Link href="/Helps/helps">
             <div className="bar" style={props.active === 'helps' ? {color: '#09c'} : {}}>Helps</div>
           </Link>
         </div>
       </div>
     </div>
   </>
 )
}
