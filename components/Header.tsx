import Link from 'next/link'

export default (props) => {
 return (
   <div>
     <div className="header">
       <div className="header-inner">
         <Link  href="/">
           <h2 style={{cursor: 'pointer'}} className="logo">YoPo</h2>
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
     <style>{`
       .header {
         width: 100%;
         border-bottom: 1px solid #eee;
         padding: 0 70px;
         box-sizing: border-box
       }
       .header .header-inner {
         width: 100%;
         box-sizing: border-box;
         display: flex;
         justify-content: space-between;
         align-items: center;
         height: 50px;
       }
       .logo {
         font-size: 32;
       }
       .nav-bar {
         display: flex;
         aligin-items: center
       }
       .nav-bar .bar {
         padding: 0 10px;
         height: 50px;
         line-height: 50px;
         text-align: center;
         font-size: 13px;
         color: #555555;
         cursor: pointer
       }
       .nav-bar .bar:hover {
         color: #0099cc
       }
     `}
     </style>
   </div>
 )
}
