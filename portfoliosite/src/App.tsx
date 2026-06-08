import { useRef } from "react"
import SideBar from "./components/SideBar"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Certifications from "./pages/Certifications"
import Contact from "./pages/Contact"
import Aurora from "./components/ui/Aurora"
import { Analytics } from "@vercel/analytics/react"

function App() {
  const homeRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const certificationsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollToPage = (section: "home" | "projects" | "certifications" | "contact") => {
    switch (section) {
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      case "projects":
        projectsRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      case "certifications":
        certificationsRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      case "contact":
        contactRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      default:
        break
    }
  }

  return (
    <div className="relative bg-gray-100 dark:bg-gray-900">
      <div className="fixed inset-0 z-0 opacity-20 dark:opacity-50 pointer-events-none">
        <Aurora
          colorStops={['#4f46e5', '#7c3aed', '#312e81']}
          amplitude={1.2}
          blend={0.6}
          speed={0.5}
        />
      </div>
      <Analytics />
      <div className="relative z-10 flex">
      <SideBar onSideBarClick={scrollToPage} />
      <div className='sm:ml-16 w-full'>
        <section ref={homeRef}>
          <Home onViewProjects={() => scrollToPage("projects")} />
        </section>
        <section ref={projectsRef}>
          <Projects />
        </section>
        <section ref={certificationsRef}>
          <Certifications />
        </section>
        <section ref={contactRef}>
          <Contact />
        </section>
      </div>
      </div>
    </div>
  )
}

export default App
