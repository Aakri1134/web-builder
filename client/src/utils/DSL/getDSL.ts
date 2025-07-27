import sanetizer, { type DSL, type DSLComponent } from "./sanetizer";

const tempDSL : DSLComponent = {
  type: "Div",
  id: "root-container",
  style: {
    minHeight: "100vh",
    width: "100vw",
    margin: "0",
    padding: "0",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    position: "absolute",
    top: "0",
    left: "0"
  },
  children: [
    {
      type: "Div",
      id: "header",
      style: {
        width: "100%",
        backgroundColor: "#d63384",
        padding: "15px 20px",
        boxSizing: "border-box"
      },
      children: [
        {
          type: "Div",
          id: "header-content",
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            boxSizing: "border-box",
            flexWrap: "wrap",
            gap: "10px"
          },
          children: [
            {
              type: "Heading",
              id: "logo-heading",
              style: {
                fontSize: "clamp(18px, 4vw, 24px)",
                color: "white",
                margin: "0",
                fontWeight: "bold"
              },
              props: {
                text: "MyWebsite"
              },
              children: []
            },
            {
              type: "Div",
              id: "desktop-nav",
              style: {
                display: "flex",
                gap: "clamp(10px, 3vw, 25px)",
                alignItems: "center",
                flexWrap: "wrap"
              },
              children: [
                {
                  type: "Text",
                  id: "nav-home",
                  style: {
                    color: "white",
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    cursor: "pointer",
                    margin: "0",
                    padding: "5px 10px"
                  },
                  props: {
                    text: "Home"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "nav-about",
                  style: {
                    color: "white",
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    cursor: "pointer",
                    margin: "0",
                    padding: "5px 10px"
                  },
                  props: {
                    text: "About"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "nav-contact",
                  style: {
                    color: "white",
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    cursor: "pointer",
                    margin: "0",
                    padding: "5px 10px"
                  },
                  props: {
                    text: "Contact"
                  },
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "Div",
      id: "content-area",
      style: {
        flex: "1",
        display: "flex",
        width: "100%",
        boxSizing: "border-box",
        flexDirection: "row"
      },
      children: [
        {
          type: "Div",
          id: "sidebar",
          style: {
            width: "max(0px, min(280px, 100vw - 768px))",
            minWidth: "0px",
            backgroundColor: "#f8bbd9",
            padding: "max(0px, min(20px, (100vw - 768px) * 0.1))",
            boxSizing: "border-box",
            borderRight: "max(0px, min(2px, 100vw - 768px)) solid #ec4899",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          },
          children: [
            {
              type: "Heading",
              id: "sidebar-title",
              style: {
                fontSize: "clamp(0px, 3vw, 18px)",
                color: "#be185d",
                margin: "0 0 clamp(0px, 3vw, 20px) 0",
                fontWeight: "bold"
              },
              props: {
                text: "Features"
              },
              children: []
            },
            {
              type: "Div",
              id: "sidebar-menu",
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0px, 2vw, 15px)"
              },
              children: [
                {
                  type: "Text",
                  id: "feature-dashboard",
                  style: {
                    color: "#be185d",
                    fontSize: "clamp(0px, 2.5vw, 16px)",
                    cursor: "pointer",
                    margin: "0",
                    padding: "clamp(0px, 2vw, 10px) clamp(0px, 2.5vw, 15px)",
                    backgroundColor: "#fce7f3",
                    borderRadius: "6px"
                  },
                  props: {
                    text: "Dashboard"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "feature-analytics",
                  style: {
                    color: "#be185d",
                    fontSize: "clamp(0px, 2.5vw, 16px)",
                    cursor: "pointer",
                    margin: "0",
                    padding: "clamp(0px, 2vw, 10px) clamp(0px, 2.5vw, 15px)",
                    backgroundColor: "#fce7f3",
                    borderRadius: "6px"
                  },
                  props: {
                    text: "Analytics"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "feature-settings",
                  style: {
                    color: "#be185d",
                    fontSize: "clamp(0px, 2.5vw, 16px)",
                    cursor: "pointer",
                    margin: "0",
                    padding: "clamp(0px, 2vw, 10px) clamp(0px, 2.5vw, 15px)",
                    backgroundColor: "#fce7f3",
                    borderRadius: "6px"
                  },
                  props: {
                    text: "Settings"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "feature-profile",
                  style: {
                    color: "#be185d",
                    fontSize: "clamp(0px, 2.5vw, 16px)",
                    cursor: "pointer",
                    margin: "0",
                    padding: "clamp(0px, 2vw, 10px) clamp(0px, 2.5vw, 15px)",
                    backgroundColor: "#fce7f3",
                    borderRadius: "6px"
                  },
                  props: {
                    text: "Profile"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "feature-help",
                  style: {
                    color: "#be185d",
                    fontSize: "clamp(0px, 2.5vw, 16px)",
                    cursor: "pointer",
                    margin: "0",
                    padding: "clamp(0px, 2vw, 10px) clamp(0px, 2.5vw, 15px)",
                    backgroundColor: "#fce7f3",
                    borderRadius: "6px"
                  },
                  props: {
                    text: "Help & Support"
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          type: "Div",
          id: "main-content",
          style: {
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "clamp(20px, 5vw, 40px)",
            backgroundColor: "#fdf2f8",
            boxSizing: "border-box",
            minHeight: "calc(100vh - 140px)"
          },
          children: [
            {
              type: "Div",
              id: "content-wrapper",
              style: {
                textAlign: "center",
                padding: "clamp(20px, 5vw, 30px)",
                backgroundColor: "#fce7f3",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(214, 51, 132, 0.2)",
                maxWidth: "clamp(300px, 80vw, 500px)",
                width: "100%",
                boxSizing: "border-box"
              },
              children: [
                {
                  type: "Heading",
                  id: "main-heading",
                  style: {
                    fontSize: "clamp(24px, 6vw, 36px)",
                    color: "#be185d",
                    margin: "0 0 clamp(15px, 3vw, 20px) 0",
                    fontWeight: "bold"
                  },
                  props: {
                    text: "Welcome"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "welcome-text",
                  style: {
                    fontSize: "clamp(16px, 3vw, 18px)",
                    color: "#ec4899",
                    lineHeight: "1.6",
                    margin: "0 0 clamp(12px, 2.5vw, 15px) 0"
                  },
                  props: {
                    text: "Desktop shows sidebar navigation, mobile shows bottom navigation for optimal experience."
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "description-text",
                  style: {
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    color: "#f472b6",
                    lineHeight: "1.5",
                    margin: "0"
                  },
                  props: {
                    text: "Adaptive navigation design that works perfectly on any device."
                  },
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "Div",
      id: "mobile-bottom-nav",
      style: {
        width: "100%",
        height: "max(0px, min(70px, 768px - 100vw))",
        backgroundColor: "#d63384",
        padding: "max(0px, min(12px, (768px - 100vw) * 0.02)) 0",
        boxSizing: "border-box",
        position: "fixed",
        bottom: "0",
        left: "0",
        borderTop: "max(0px, min(2px, 768px - 100vw)) solid #be185d",
        display: "flex",
        overflow: "hidden"
      },
      children: [
        {
          type: "Div",
          id: "bottom-nav-container",
          style: {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto"
          },
          children: [
            {
              type: "Div",
              id: "bottom-nav-dashboard",
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                padding: "5px"
              },
              children: [
                {
                  type: "Text",
                  id: "bottom-icon-dashboard",
                  style: {
                    color: "white",
                    fontSize: "18px",
                    margin: "0 0 2px 0"
                  },
                  props: {
                    text: "📊"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "bottom-text-dashboard",
                  style: {
                    color: "white",
                    fontSize: "10px",
                    margin: "0"
                  },
                  props: {
                    text: "Dashboard"
                  },
                  children: []
                }
              ]
            },
            {
              type: "Div",
              id: "bottom-nav-analytics",
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                padding: "5px"
              },
              children: [
                {
                  type: "Text",
                  id: "bottom-icon-analytics",
                  style: {
                    color: "white",
                    fontSize: "18px",
                    margin: "0 0 2px 0"
                  },
                  props: {
                    text: "📈"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "bottom-text-analytics",
                  style: {
                    color: "white",
                    fontSize: "10px",
                    margin: "0"
                  },
                  props: {
                    text: "Analytics"
                  },
                  children: []
                }
              ]
            },
            {
              type: "Div",
              id: "bottom-nav-settings",
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                padding: "5px"
              },
              children: [
                {
                  type: "Text",
                  id: "bottom-icon-settings",
                  style: {
                    color: "white",
                    fontSize: "18px",
                    margin: "0 0 2px 0"
                  },
                  props: {
                    text: "⚙️"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "bottom-text-settings",
                  style: {
                    color: "white",
                    fontSize: "10px",
                    margin: "0"
                  },
                  props: {
                    text: "Settings"
                  },
                  children: []
                }
              ]
            },
            {
              type: "Div",
              id: "bottom-nav-profile",
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                padding: "5px"
              },
              children: [
                {
                  type: "Text",
                  id: "bottom-icon-profile",
                  style: {
                    color: "white",
                    fontSize: "18px",
                    margin: "0 0 2px 0"
                  },
                  props: {
                    text: "👤"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "bottom-text-profile",
                  style: {
                    color: "white",
                    fontSize: "10px",
                    margin: "0"
                  },
                  props: {
                    text: "Profile"
                  },
                  children: []
                }
              ]
            },
            {
              type: "Div",
              id: "bottom-nav-help",
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                padding: "5px"
              },
              children: [
                {
                  type: "Text",
                  id: "bottom-icon-help",
                  style: {
                    color: "white",
                    fontSize: "18px",
                    margin: "0 0 2px 0"
                  },
                  props: {
                    text: "❓"
                  },
                  children: []
                },
                {
                  type: "Text",
                  id: "bottom-text-help",
                  style: {
                    color: "white",
                    fontSize: "10px",
                    margin: "0"
                  },
                  props: {
                    text: "Help"
                  },
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
export function getDSL(prompt : string){
    // fetch DSL
    //@ts-ignore
    const DSL : DSL = {
        components : [tempDSL],
        functions : []
    }

    //@ts-ignore
    prompt

    console.log("Running Tests...")
    const res = sanetizer(DSL)
    if(res){
        return res
    }else{
        // handle invalid DSLs
        alert("Invalid DSL")
        return false
    }
}