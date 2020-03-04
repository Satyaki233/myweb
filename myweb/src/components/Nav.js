import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router-dom'

const Nav = () => {
    {
       $(window).on('scroll',function(){
           if($(window).scrollTop()){
               console.log('ok')
           }
           else{
               console.log('not ok')
           }
       })
    }
    
    return (
        <div  >
         <nav class="navbar navbar-expand-lg navbar-light bg-light"  >
            <a class="navbar-brand" href="#">Satyaki</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <Link class="nav-item nav-link active"to='/'>Home <span class="sr-only">(current)</span></Link>
                <Link class="nav-item nav-link" to='/Artical'>Aricals</Link>
                <a class="nav-item nav-link" href="#">Guides</a>
                <Link class="nav-item nav-link" to='/Contact'>Contact-me</Link>
                <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </div>
            </div>
            </nav>

        </div>
    )
}

export default Nav
