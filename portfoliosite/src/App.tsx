import React, { useRef } from "react"
import SideBar from "./components/SideBar"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import Links from "./pages/Links"

function App() {
  // Create references for each page
  const homeRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  // Function to scroll to different pages
  const scrollToPage = (section: "home" | "projects" | "contact" | "links") => {
    switch (section) {
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      case "projects":
        projectsRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      case "contact":
        contactRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      case "links":
        linksRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      default:
        break
    }
  }

  return (
    <div className="flex">
      <SideBar onSideBarClick={scrollToPage} />
      <div className = 'ml-16 w-full'>
        <section ref={homeRef}>
          <Home />
        </section>
        <section ref={projectsRef}>
          <Projects />
        </section>
        <section ref={contactRef}>
          <Contact />
        </section>
        <section ref={linksRef}>
          <Links />
        </section>
      </div>
    </div>
  )
}

export default App
