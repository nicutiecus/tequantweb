import { useActionData } from "react-router-dom";
import BlogSection from "./blogSection";
import Features from "./features";
import Hero from "./hero";
import Partners from "./partners";
import Testimonials from "./testimonials";
import { useEffect } from "react";

export default function HomePage() {

    useEffect(()=>{
        document.title = "TE Quant Resources"
    })
 return(
<div>

<Hero/>
<Testimonials/>
<Partners/>
<Features/>
<BlogSection/>


</div>



 )



}