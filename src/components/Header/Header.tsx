import "./Header.scss"
import { useEffect, useState, useMemo } from "react"

type NavLink = {
  key: string
  href: string
  title: string
}

export const Header = () => {
  const links = useMemo<NavLink[]>(
    () => [
      {
        key: "demography-section",
        href: "#demography-section",
        title: "Демография",
      },
      { key: "globe", href: "#globe", title: "Globe" },
      { key: "part-3", href: "#part-3", title: "Part-3" },
    ],
    [],
  )

  const [activeLink, setActiveLink] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const link of links) {
        const section = document.querySelector(link.href)

        // Проверяем, что элемент существует и это HTMLElement
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveLink(link.href)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => { window.removeEventListener("scroll", handleScroll); }
  }, [links])

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {links.map(link => (
          <a
            key={link.key}
            href={link.href}
            className={`navigation__item ${activeLink === link.href ? "navigation__item--active" : ""}`}
            onClick={e => {
              e.preventDefault()
              const target = document.querySelector(link.href)
              if (target instanceof HTMLElement) {
                target.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            {link.title}
          </a>
        ))}
      </ul>
    </nav>
  )
}
