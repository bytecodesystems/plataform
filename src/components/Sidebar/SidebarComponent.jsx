import { useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "react-bootstrap"
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from "react-pro-sidebar"

import backgroundImage from "/images/sidebar-background.jpg"
import logo from "/images/logo-svg.svg"

// themes configs
const themes = {
    light: {
        sidebar: {
            backgroundColor: '#ffffff',
            color: '#607489',
        },
        menu: {
            menuContent: '#fbfcfd',
            icon: '#5617ae',
            hover: {
                backgroundColor: '#c5e4ff',
                color: '#44596e',
            },
            disabled: {
                color: '#9fb6cf',
            },
        },
    },

    dark: {
        sidebar: {
            backgroundColor: '#440f90',
            color: '#a0b4c8',
        },
        menu: {
            menuContent: '#082440',
            icon: '#b6c8d9',
            hover: {
                backgroundColor: '#6f42c1',
                color: '#b6c8d9',
            },
            disabled: {
                color: '#3e5e7e',
            },
        },
    },
}

// hex to rgba converter
const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}


// COMPONENT
const SidebarComponent = ({ modules }) => {

    // states
    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)
    const [broken, setBroken] = useState(false)
    const [hasImage, setHasImage] = useState(true)
    const [theme, setTheme] = useState('dark')

    // handle on theme change event
    const handleThemeChange = (e) => {
        setTheme(e.target.checked ? 'dark' : 'light')
    }

    // handle on image change event
    const handleImageChange = (e) => {
        setHasImage(e.target.checked)
    }

    const menuItemStyles = {
        root: {
            fontSize: '13px',
            fontWeight: 400,
        },
        icon: {
            color: themes[theme].menu.icon,
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
            backgroundColor:
            level === 0
                ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
                : 'transparent',
        }),
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
                color: themes[theme].menu.hover.color,
            },
        },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        }),
    }

    return (
        <Sidebar
            collapsed={collapsed}
            toggled={toggled}
            onBackdropClick={() => setToggled(false)}
            onBreakPoint={setBroken}
            image={backgroundImage}
            breakPoint="md"
            backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? (theme === 'dark' ? 0.8 : 0.9) : 1)}
            rootStyles={{
                color: themes[theme].sidebar.color,
                fontFamily: "Poppins, sans-serif",
                userSelect: "none",
                border: 0,
                // width: 280,
            }}
        >
            <div className="pb-5">
                {/* LOGO */}
                <header className="my-5 ms-4">
                    <div className="d-flex align-items-center gap-3">
                        <img
                            src={logo}
                            alt="bytecode-logo"
                            style={{
                                height: collapsed ? 40 : 35,
                                marginLeft: collapsed ? 4 : 0
                            }}
                        />

                        <p
                            hidden={collapsed}
                            className="fw-bold m-0 fs-2"
                            style={{ color: theme === "dark" ? "aliceblue" : "#1D2226" }}
                        >
                            ByteCode
                        </p>
                    </div>
                </header>

                {/* MODULES */}
                <div style={{ padding: '0 24px', marginBottom: '8px' }}>
                    <p style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px', fontWeight: 600 }}>
                        Módulos
                    </p>
                </div>

                <Menu menuItemStyles={menuItemStyles}>
                    {modules.map(module => {
                        if (module.pages[0]) { return (
                            <SubMenu
                                label={module.name}
                                key={`link_to_route_${module.route}_${module.url}`}
                                icon={<span className="material-symbols-rounded">{module.icon}</span>}
                            >
                                {module.pages[0] && module.pages.map(page => (
                                    <MenuItem
                                        key={`sidebar_link_${page.route}_${page.name}`}
                                        component={<Link to={`/plataform${module.root_route}${page.route}`} />}
                                    >
                                        {page.name}
                                    </MenuItem>
                                ))}
                            </SubMenu>
                        ) }
                        else { return (
                            <MenuItem
                                key={`sidebar_link_/_${module.root_route}`}
                                component={<Link to={`/plataform${module.root_route}/`} />}
                                icon={<span className="material-symbols-rounded">{module.icon}</span>}
                            >
                                {module.name}
                            </MenuItem>
                        ) }
                    })}


                    <SubMenu
                        label="Theme"
                        icon={<span className="material-symbols-rounded">local_cafe</span>}
                    >
                        <MenuItem onClick={() => {setTheme('dark')}}>Dark</MenuItem>
                        <MenuItem onClick={() => {setTheme('light')}}>Light</MenuItem>
                    </SubMenu>
                </Menu>

                {/* EXTRA */}
                <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
                    <p style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px', fontWeight: 600 }}>
                        Outros
                    </p>
                </div>

                <Menu menuItemStyles={menuItemStyles}>
                    <MenuItem
                        icon={<span className="material-symbols-rounded">calendar_month</span>}
                        suffix={ <Badge bg="success">New</Badge> }
                    >
                        Agenda
                    </MenuItem>

                    <MenuItem icon={<span className="material-symbols-rounded">menu_book</span>}>Documentção</MenuItem>
                </Menu>
            </div>
        </Sidebar>
    )
}

export default SidebarComponent