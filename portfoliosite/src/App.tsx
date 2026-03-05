import { useRef } from "react"
import SideBar from "./components/SideBar"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"

function App() {
  const homeRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  const scrollToPage = (section: "home" | "projects" | "contact") => {
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
      default:
        break
    }
  }

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900">
      <SideBar onSideBarClick={scrollToPage} />
      <div className='sm:ml-16 w-full'>
        <section ref={homeRef}>
          <Home onViewProjects={() => scrollToPage("projects")} />
        </section>
        <section ref={projectsRef}>
          <Projects />
        </section>
        <section ref={contactRef}>
          <Contact />
        </section>
      </div>
    </div>
  )
}

export default App
