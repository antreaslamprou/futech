import Link from 'next/link';


export default function About() {

  return (<>
    <h1>Futech — Where Smart Tech Meets People</h1>
    <div>
      <p>Futech was started with a simple idea: make technology that helps people do what they love, without getting in the way. We’re a small, obsessed team of engineers, designers, and customer advocates who spend our days prototyping, breaking, fixing, and refining until each product feels intuitive and reliable. Our focus is practical innovation — features that matter, built with craftsmanship and care.</p>
      <p>Quality is non-negotiable. Every Futech product goes through rigorous performance and longevity testing so it’s ready for the real world — whether that means daily commuting, long workdays, or making your home a little smarter. We choose materials, partners, and processes that balance reliability with responsibility, because a great product shouldn’t cost the earth.</p>
      <p>Customer love drives everything we do. We listen — to feedback, to edge-case stories, and to what people actually want from their tech. That feedback feeds our roadmap. When you reach out, you’re not talking to an automated script; you’re talking to humans who care about making things better for you.</p>
      <p>Finally, we’re building more than devices — we’re building trust. We stand behind our products with fair warranties, transparent policies, and support that treats you like a neighbor, not a ticket number.</p>
      <p>Explore our latest lineup or reach out — we’d love to hear what you need!</p>
    </div>
    <div className='mt-10 md:mt-20 lg:mt-25 flex justify-center lg:justify-start'>
      <Link 
        href='/products'
        className='btn-lg'
      >
        Shop the Collection
      </Link>
    </div>
  </>);
}