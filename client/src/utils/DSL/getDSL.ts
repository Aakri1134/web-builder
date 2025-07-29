import sanetizer, { type DSL, type DSLComponent } from "./sanetizer";

const tempDSL : DSLComponent = 
    {
      "type": "Body",
      "id": "main-body",
      "style": {
        "margin": "0",
        "padding": "0",
        "fontFamily": "Arial, sans-serif",
        "backgroundColor": "var(--background-color)",
        "color": "var(--text-color)",
        "minHeight": "100vh"
      },
      "props": {
        "className": "main-body"
      },
      "children": [
        {
          "type": "Nav",
          "id": "header-nav",
          "style": {
            "backgroundColor": "var(--primary-color)",
            "padding": "16px 24px",
            "position": "fixed",
            "top": "0",
            "left": "0",
            "right": "0",
            "zIndex": "1000",
            "boxShadow": "0 2px 4px rgba(0,0,0,0.1)"
          },
          "props": {
            "className": "header-nav"
          },
          "children": [
            {
              "type": "Heading",
              "id": "header-logo",
              "style": {
                "color": "white",
                "margin": "0",
                "fontSize": "24px",
                "fontWeight": "bold"
              },
              "props": {
                "text": "My Website",
                "className": "header-logo"
              },
              "children": []
            }
          ]
        },
        {
          "type": "Div",
          "id": "content-wrapper",
          "style": {
            "display": "flex",
            "marginTop": "72px",
            "minHeight": "calc(100vh - 72px)"
          },
          "mediaQueries": {
            "mobile": {
              "flexDirection": "column",
              "paddingBottom": "80px"
            }
          },
          "props": {
            "className": "content-wrapper"
          },
          "children": [
            {
              "type": "Nav",
              "id": "sidebar",
              "style": {
                "width": "250px",
                "backgroundColor": "var(--secondary-color)",
                "padding": "24px",
                "borderRight": "1px solid var(--border-color)",
                "position": "sticky",
                "top": "72px",
                "height": "fit-content"
              },
              "mediaQueries": {
                "mobile": {
                  "display": "none"
                }
              },
              "props": {
                "className": "sidebar"
              },
              "children": [
                {
                  "type": "List",
                  "id": "sidebar-menu",
                  "style": {
                    "listStyle": "none",
                    "padding": "0",
                    "margin": "0"
                  },
                  "props": {
                    "className": "sidebar-menu"
                  },
                  "children": [
                    {
                      "type": "ListItems",
                      "id": "menu-item-1",
                      "style": {
                        "marginBottom": "12px"
                      },
                      "props": {
                        "className": "menu-item"
                      },
                      "children": [
                        {
                          "type": "Link",
                          "id": "menu-link-1",
                          "style": {
                            "color": "var(--text-color)",
                            "textDecoration": "none",
                            "padding": "12px 16px",
                            "display": "block",
                            "borderRadius": "4px"
                          },
                          "props": {
                            "text": "Home",
                            "href": "#home",
                            "className": "menu-link"
                          },
                          "children": []
                        }
                      ]
                    },
                    {
                      "type": "ListItems",
                      "id": "menu-item-2",
                      "style": {
                        "marginBottom": "12px"
                      },
                      "props": {
                        "className": "menu-item"
                      },
                      "children": [
                        {
                          "type": "Link",
                          "id": "menu-link-2",
                          "style": {
                            "color": "var(--text-color)",
                            "textDecoration": "none",
                            "padding": "12px 16px",
                            "display": "block",
                            "borderRadius": "4px"
                          },
                          "props": {
                            "text": "About",
                            "href": "#about",
                            "className": "menu-link"
                          },
                          "children": []
                        }
                      ]
                    },
                    {
                      "type": "ListItems",
                      "id": "menu-item-3",
                      "style": {
                        "marginBottom": "12px"
                      },
                      "props": {
                        "className": "menu-item"
                      },
                      "children": [
                        {
                          "type": "Link",
                          "id": "menu-link-3",
                          "style": {
                            "color": "var(--text-color)",
                            "textDecoration": "none",
                            "padding": "12px 16px",
                            "display": "block",
                            "borderRadius": "4px"
                          },
                          "props": {
                            "text": "Services",
                            "href": "#services",
                            "className": "menu-link"
                          },
                          "children": []
                        }
                      ]
                    },
                    {
                      "type": "ListItems",
                      "id": "menu-item-4",
                      "style": {
                        "marginBottom": "12px"
                      },
                      "props": {
                        "className": "menu-item"
                      },
                      "children": [
                        {
                          "type": "Link",
                          "id": "menu-link-4",
                          "style": {
                            "color": "var(--text-color)",
                            "textDecoration": "none",
                            "padding": "12px 16px",
                            "display": "block",
                            "borderRadius": "4px"
                          },
                          "props": {
                            "text": "Contact",
                            "href": "#contact",
                            "className": "menu-link"
                          },
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "Main",
              "id": "main-content",
              "style": {
                "flex": "1",
                "padding": "32px",
                "backgroundColor": "var(--background-color)"
              },
              "mediaQueries": {
                "mobile": {
                  "padding": "16px"
                }
              },
              "props": {
                "className": "main-content"
              },
              "children": [
                {
                  "type": "Section",
                  "id": "hero-section",
                  "style": {
                    "marginBottom": "48px"
                  },
                  "props": {
                    "className": "hero-section"
                  },
                  "children": [
                    {
                      "type": "Heading",
                      "id": "hero-title",
                      "style": {
                        "fontSize": "48px",
                        "marginBottom": "16px",
                        "color": "var(--primary-color)"
                      },
                      "mediaQueries": {
                        "mobile": {
                          "fontSize": "32px"
                        }
                      },
                      "props": {
                        "text": "Welcome to Our Website",
                        "className": "hero-title"
                      },
                      "children": []
                    },
                    {
                      "type": "Text",
                      "id": "hero-description",
                      "style": {
                        "fontSize": "18px",
                        "lineHeight": "1.6",
                        "color": "var(--text-color)",
                        "maxWidth": "600px"
                      },
                      "mediaQueries": {
                        "mobile": {
                          "fontSize": "16px"
                        }
                      },
                      "props": {
                        "text": "This is a responsive website built with our custom DSL. The sidebar transforms into a bottom navigation on mobile devices for better user experience.",
                        "className": "hero-description"
                      },
                      "children": []
                    }
                  ]
                },
                {
                  "type": "Section",
                  "id": "content-section",
                  "style": {
                    "marginBottom": "48px"
                  },
                  "props": {
                    "className": "content-section"
                  },
                  "children": [
                    {
                      "type": "Article",
                      "id": "main-article",
                      "style": {
                        "backgroundColor": "white",
                        "padding": "32px",
                        "borderRadius": "8px",
                        "boxShadow": "0 2px 8px rgba(0,0,0,0.1)"
                      },
                      "mediaQueries": {
                        "mobile": {
                          "padding": "16px"
                        }
                      },
                      "props": {
                        "className": "main-article"
                      },
                      "children": [
                        {
                          "type": "Heading",
                          "id": "article-title",
                          "style": {
                            "fontSize": "32px",
                            "marginBottom": "24px",
                            "color": "var(--primary-color)"
                          },
                          "mediaQueries": {
                            "mobile": {
                              "fontSize": "24px"
                            }
                          },
                          "props": {
                            "text": "About Our Platform",
                            "className": "article-title"
                          },
                          "children": []
                        },
                        {
                          "type": "Text",
                          "id": "article-content",
                          "style": {
                            "fontSize": "16px",
                            "lineHeight": "1.7",
                            "marginBottom": "24px"
                          },
                          "props": {
                            "text": "Our platform provides innovative solutions for modern web development. We focus on creating responsive, accessible, and performant websites that work seamlessly across all devices.",
                            "className": "article-content"
                          },
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "Nav",
          "id": "mobile-bottom-nav",
          "style": {
            "display": "none",
            "position": "fixed",
            "bottom": "0",
            "left": "0",
            "right": "0",
            "backgroundColor": "var(--primary-color)",
            "padding": "12px 0",
            "borderTop": "1px solid var(--border-color)",
            "zIndex": "1000"
          },
          "mediaQueries": {
            "mobile": {
              "display": "flex"
            }
          },
          "props": {
            "className": "mobile-bottom-nav"
          },
          "children": [
            {
              "type": "Div",
              "id": "bottom-nav-container",
              "style": {
                "display": "flex",
                "justifyContent": "space-around",
                "alignItems": "center",
                "width": "100%"
              },
              "props": {
                "className": "bottom-nav-container"
              },
              "children": [
                {
                  "type": "Link",
                  "id": "bottom-nav-home",
                  "style": {
                    "color": "white",
                    "textDecoration": "none",
                    "padding": "12px",
                    "fontSize": "14px",
                    "textAlign": "center",
                    "flex": "1"
                  },
                  "props": {
                    "text": "Home",
                    "href": "#home",
                    "className": "bottom-nav-link"
                  },
                  "children": []
                },
                {
                  "type": "Link",
                  "id": "bottom-nav-about",
                  "style": {
                    "color": "white",
                    "textDecoration": "none",
                    "padding": "12px",
                    "fontSize": "14px",
                    "textAlign": "center",
                    "flex": "1"
                  },
                  "props": {
                    "text": "About",
                    "href": "#about",
                    "className": "bottom-nav-link"
                  },
                  "children": []
                },
                {
                  "type": "Link",
                  "id": "bottom-nav-services",
                  "style": {
                    "color": "white",
                    "textDecoration": "none",
                    "padding": "12px",
                    "fontSize": "14px",
                    "textAlign": "center",
                    "flex": "1"
                  },
                  "props": {
                    "text": "Services",
                    "href": "#services",
                    "className": "bottom-nav-link"
                  },
                  "children": []
                },
                {
                  "type": "Link",
                  "id": "bottom-nav-contact",
                  "style": {
                    "color": "white",
                    "textDecoration": "none",
                    "padding": "12px",
                    "fontSize": "14px",
                    "textAlign": "center",
                    "flex": "1"
                  },
                  "props": {
                    "text": "Contact",
                    "href": "#contact",
                    "className": "bottom-nav-link"
                  },
                  "children": []
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