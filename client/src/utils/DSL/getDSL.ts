import sanetizer, { type DSL } from "./sanetizer";

const tempDSL : DSL = {
  "components": [
    {
      "type": "Body",
      "id": "main-body",
      "children": [
        {
          "type": "Nav",
          "id": "navigation",
          "children": [
            {
              "type": "Div",
              "id": "nav-container",
              "children": [
                {
                  "type": "Heading",
                  "id": "logo",
                  "children": [],
                  "style": {
                    "fontSize": "24px",
                    "fontWeight": "bold",
                    "color": "var(--primary-color)"
                  },
                  "props": {
                    "text": "PastelShop",
                    "className": "logo-hover"
                  }
                },
                {
                  "type": "List",
                  "id": "nav-menu",
                  "children": [
                    {
                      "type": "ListItems",
                      "id": "nav-home",
                      "children": [
                        {
                          "type": "Link",
                          "id": "home-link",
                          "children": [],
                          "style": {
                            "color": "var(--text-color)",
                            "textDecoration": "none",
                            "padding": "8px 16px",
                            "borderRadius": "20px",
                            "transition": "all 0.3s ease"
                          },
                          "props": {
                            "text": "Home",
                            "href": "#home",
                            "className": "nav-link-hover"
                          }
                        }
                      ],
                      "style": {},
                      "props": { "className": "" }
                    },
                    {
                      "type": "ListItems",
                      "id": "nav-products",
                      "children": [
                        {
                          "type": "Link",
                          "id": "products-link",
                          "children": [],
                          "style": {
                            "color": "var(--text-color)",
                            "textDecoration": "none",
                            "padding": "8px 16px",
                            "borderRadius": "20px",
                            "transition": "all 0.3s ease"
                          },
                          "props": {
                            "text": "Products",
                            "href": "#products",
                            "className": "nav-link-hover"
                          }
                        }
                      ],
                      "style": {},
                      "props": { "className": "" }
                    },
                    {
                      "type": "ListItems",
                      "id": "nav-about",
                      "children": [
                        {
                          "type": "Link",
                          "id": "about-link",
                          "children": [],
                          "style": {
                            "color": "var(--text-color)",
                            "textDecoration": "none",
                            "padding": "8px 16px",
                            "borderRadius": "20px",
                            "transition": "all 0.3s ease"
                          },
                          "props": {
                            "text": "About",
                            "href": "#about",
                            "className": "nav-link-hover"
                          }
                        }
                      ],
                      "style": {},
                      "props": { "className": "" }
                    },
                    {
                      "type": "ListItems",
                      "id": "nav-contact",
                      "children": [
                        {
                          "type": "Button",
                          "id": "contact-btn",
                          "children": [],
                          "style": {
                            "backgroundColor": "var(--accent-color)",
                            "color": "white",
                            "border": "none",
                            "padding": "8px 20px",
                            "borderRadius": "25px",
                            "cursor": "pointer",
                            "fontWeight": "500",
                            "transition": "all 0.3s ease"
                          },
                          "props": {
                            "text": "Contact",
                            "className": "contact-btn-hover"
                          }
                        }
                      ],
                      "style": {},
                      "props": { "className": "" }
                    }
                  ],
                  "style": {
                    "display": "flex",
                    "listStyle": "none",
                    "gap": "20px",
                    "margin": "0",
                    "padding": "0"
                  },
                  "props": { "className": "" }
                }
              ],
              "style": {
                "display": "flex",
                "justifyContent": "space-between",
                "alignItems": "center",
                "maxWidth": "1200px",
                "margin": "0 auto",
                "padding": "0 20px"
              },
              "props": { "className": "" }
            }
          ],
          "style": {
            "position": "fixed",
            "top": "0",
            "left": "0",
            "right": "0",
            "backgroundColor": "rgba(255, 255, 255, 0.95)",
            "backdropFilter": "blur(10px)",
            "zIndex": "1000",
            "padding": "15px 0",
            "boxShadow": "0 2px 20px rgba(0,0,0,0.1)"
          },
          "props": { "className": "slide-down" }
        },
        {
          "type": "Main",
          "id": "main-content",
          "children": [
            {
              "type": "Section",
              "id": "hero-section",
              "children": [
                {
                  "type": "Div",
                  "id": "hero-container",
                  "children": [
                    {
                      "type": "Div",
                      "id": "hero-content",
                      "children": [
                        {
                          "type": "Heading",
                          "id": "hero-title",
                          "children": [],
                          "style": {
                            "fontSize": "3.5rem",
                            "fontWeight": "700",
                            "color": "var(--primary-color)",
                            "marginBottom": "20px",
                            "lineHeight": "1.2"
                          },
                          "mediaQueries": {
                            "mobile": "font-size: 2.5rem;",
                            "tablet": "font-size: 3rem;"
                          },
                          "props": {
                            "text": "Discover Pastel Paradise",
                            "className": "fade-in-up"
                          }
                        },
                        {
                          "type": "Text",
                          "id": "hero-subtitle",
                          "children": [],
                          "style": {
                            "fontSize": "1.2rem",
                            "color": "var(--text-secondary)",
                            "marginBottom": "30px",
                            "maxWidth": "500px"
                          },
                          "props": {
                            "text": "Curated collection of beautiful products in soft, dreamy colors that bring joy to your everyday life.",
                            "className": "fade-in-up delay-1"
                          }
                        },
                        {
                          "type": "Div",
                          "id": "hero-buttons",
                          "children": [
                            {
                              "type": "Button",
                              "id": "shop-now-btn",
                              "children": [],
                              "style": {
                                "backgroundColor": "var(--primary-color)",
                                "color": "white",
                                "border": "none",
                                "padding": "15px 30px",
                                "borderRadius": "30px",
                                "fontSize": "1.1rem",
                                "fontWeight": "600",
                                "cursor": "pointer",
                                "marginRight": "15px",
                                "transition": "all 0.3s ease"
                              },
                              "props": {
                                "text": "Shop Now",
                                "className": "primary-btn-hover fade-in-up delay-2"
                              }
                            },
                            {
                              "type": "Button",
                              "id": "learn-more-btn",
                              "children": [],
                              "style": {
                                "backgroundColor": "transparent",
                                "color": "var(--primary-color)",
                                "border": "2px solid var(--primary-color)",
                                "padding": "13px 30px",
                                "borderRadius": "30px",
                                "fontSize": "1.1rem",
                                "fontWeight": "600",
                                "cursor": "pointer",
                                "transition": "all 0.3s ease"
                              },
                              "props": {
                                "text": "Learn More",
                                "className": "secondary-btn-hover fade-in-up delay-3"
                              }
                            }
                          ],
                          "style": {
                            "display": "flex",
                            "gap": "15px"
                          },
                          "mediaQueries": {
                            "mobile": "flex-direction: column; gap: 10px;"
                          },
                          "props": { "className": "" }
                        }
                      ],
                      "style": {
                        "flex": "1",
                        "paddingRight": "40px"
                      },
                      "mediaQueries": {
                        "mobile": "padding-right: 0; text-align: center;",
                        "tablet": "padding-right: 20px;"
                      },
                      "props": { "className": "" }
                    },
                    {
                      "type": "Div",
                      "id": "hero-image",
                      "children": [
                        {
                          "type": "Image",
                          "id": "hero-img",
                          "children": [],
                          "style": {
                            "width": "100%",
                            "height": "400px",
                            "objectFit": "cover",
                            "borderRadius": "20px",
                            "boxShadow": "0 20px 40px rgba(0,0,0,0.1)"
                          },
                          "props": {
                            "src": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                            "alt": "Pastel colored products showcase",
                            "className": "float-animation"
                          }
                        }
                      ],
                      "style": {
                        "flex": "1"
                      },
                      "mediaQueries": {
                        "mobile": "margin-top: 30px;"
                      },
                      "props": { "className": "" }
                    }
                  ],
                  "style": {
                    "display": "flex",
                    "alignItems": "center",
                    "maxWidth": "1200px",
                    "margin": "0 auto",
                    "padding": "0 20px",
                    "minHeight": "80vh"
                  },
                  "mediaQueries": {
                    "mobile": "flex-direction: column; min-height: 70vh; padding-top: 100px;",
                    "tablet": "flex-direction: column; padding-top: 120px;"
                  },
                  "props": { "className": "" }
                }
              ],
              "style": {
                "background": "linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%)",
                "paddingTop": "80px"
              },
              "props": { "className": "" }
            },
            {
              "type": "Section",
              "id": "featured-section",
              "children": [
                {
                  "type": "Div",
                  "id": "featured-container",
                  "children": [
                    {
                      "type": "Heading",
                      "id": "featured-title",
                      "children": [],
                      "style": {
                        "fontSize": "2.5rem",
                        "fontWeight": "700",
                        "color": "var(--primary-color)",
                        "textAlign": "center",
                        "marginBottom": "50px"
                      },
                      "props": {
                        "text": "Featured Products",
                        "className": "slide-up-on-scroll"
                      }
                    },
                    {
                      "type": "Div",
                      "id": "products-grid",
                      "children": [
                        {
                          "type": "Div",
                          "id": "product-1",
                          "children": [
                            {
                              "type": "Image",
                              "id": "product-img-1",
                              "children": [],
                              "style": {
                                "width": "100%",
                                "height": "250px",
                                "objectFit": "cover",
                                "borderRadius": "15px",
                                "marginBottom": "15px"
                              },
                              "props": {
                                "src": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                                "alt": "Pastel skincare products",
                                "className": "product-image-hover"
                              }
                            },
                            {
                              "type": "Heading",
                              "id": "product-title-1",
                              "children": [],
                              "style": {
                                "fontSize": "1.3rem",
                                "fontWeight": "600",
                                "color": "var(--text-color)",
                                "marginBottom": "10px"
                              },
                              "props": {
                                "text": "Pastel Skincare Set",
                                "className" : ""
                              }
                            },
                            {
                              "type": "Text",
                              "id": "product-price-1",
                              "children": [],
                              "style": {
                                "fontSize": "1.1rem",
                                "color": "var(--accent-color)",
                                "fontWeight": "600"
                              },
                              "props": {
                                "text": "$89.99",
                                className: ""
                              }
                            }
                          ],
                          "style": {
                            "backgroundColor": "white",
                            "padding": "20px",
                            "borderRadius": "20px",
                            "boxShadow": "0 5px 20px rgba(0,0,0,0.08)",
                            "transition": "all 0.3s ease"
                          },
                          "props": {
                            "className": "product-card-hover slide-up-on-scroll"
                          }
                        },
                        {
                          "type": "Div",
                          "id": "product-2",
                          "children": [
                            {
                              "type": "Image",
                              "id": "product-img-2",
                              "children": [],
                              "style": {
                                "width": "100%",
                                "height": "250px",
                                "objectFit": "cover",
                                "borderRadius": "15px",
                                "marginBottom": "15px"
                              },
                              "props": {
                                "src": "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                                "alt": "Pastel home decor",
                                "className": "product-image-hover"
                              }
                            },
                            {
                              "type": "Heading",
                              "id": "product-title-2",
                              "children": [],
                              "style": {
                                "fontSize": "1.3rem",
                                "fontWeight": "600",
                                "color": "var(--text-color)",
                                "marginBottom": "10px"
                              },
                              "props": {
                                "text": "Dreamy Home Decor",
                                "className" : ""
                              }
                            },
                            {
                              "type": "Text",
                              "id": "product-price-2",
                              "children": [],
                              "style": {
                                "fontSize": "1.1rem",
                                "color": "var(--accent-color)",
                                "fontWeight": "600"
                              },
                              "props": {
                                "text": "$124.99",
                                "className" : ""
                              }
                            }
                          ],
                          "style": {
                            "backgroundColor": "white",
                            "padding": "20px",
                            "borderRadius": "20px",
                            "boxShadow": "0 5px 20px rgba(0,0,0,0.08)",
                            "transition": "all 0.3s ease"
                          },
                          "props": {
                            "className": "product-card-hover slide-up-on-scroll delay-1"
                          }
                        },
                        {
                          "type": "Div",
                          "id": "product-3",
                          "children": [
                            {
                              "type": "Image",
                              "id": "product-img-3",
                              "children": [],
                              "style": {
                                "width": "100%",
                                "height": "250px",
                                "objectFit": "cover",
                                "borderRadius": "15px",
                                "marginBottom": "15px"
                              },
                              "props": {
                                "src": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                                "alt": "Pastel stationery",
                                "className": "product-image-hover"
                              }
                            },
                            {
                              "type": "Heading",
                              "id": "product-title-3",
                              "children": [],
                              "style": {
                                "fontSize": "1.3rem",
                                "fontWeight": "600",
                                "color": "var(--text-color)",
                                "marginBottom": "10px"
                              },
                              "props": {
                                "text": "Soft Stationery Kit",
                                className : ""
                              }
                            },
                            {
                              "type": "Text",
                              "id": "product-price-3",
                              "children": [],
                              "style": {
                                "fontSize": "1.1rem",
                                "color": "var(--accent-color)",
                                "fontWeight": "600"
                              },
                              "props": {
                                "text": "$45.99",
                                className : ""
                              }
                            }
                          ],
                          "style": {
                            "backgroundColor": "white",
                            "padding": "20px",
                            "borderRadius": "20px",
                            "boxShadow": "0 5px 20px rgba(0,0,0,0.08)",
                            "transition": "all 0.3s ease"
                          },
                          "props": {
                            "className": "product-card-hover slide-up-on-scroll delay-2"
                          }
                        }
                      ],
                      "style": {
                        "display": "grid",
                        "gridTemplateColumns": "repeat(auto-fit, minmax(300px, 1fr))",
                        "gap": "30px"
                      },
                      "mediaQueries": {
                        "mobile": "grid-template-columns: 1fr; gap: 20px;"
                      },
                      "props": { "className": "" }
                    }
                  ],
                  "style": {
                    "maxWidth": "1200px",
                    "margin": "0 auto",
                    "padding": "80px 20px"
                  },
                  "props": { "className": "" }
                }
              ],
              "style": {
                "backgroundColor": "var(--bg-light)"
              },
              "props": { "className": "" }
            },
            {
              "type": "Section",
              "id": "cta-section",
              "children": [
                {
                  "type": "Div",
                  "id": "cta-container",
                  "children": [
                    {
                      "type": "Heading",
                      "id": "cta-title",
                      "children": [],
                      "style": {
                        "fontSize": "2.5rem",
                        "fontWeight": "700",
                        "color": "white",
                        "textAlign": "center",
                        "marginBottom": "20px"
                      },
                      "mediaQueries": {
                        "mobile": "font-size: 2rem;"
                      },
                      "props": {
                        "text": "Ready to Transform Your Space?",
                        "className": "fade-in-up"
                      }
                    },
                    {
                      "type": "Text",
                      "id": "cta-subtitle",
                      "children": [],
                      "style": {
                        "fontSize": "1.2rem",
                        "color": "rgba(255,255,255,0.9)",
                        "textAlign": "center",
                        "marginBottom": "40px",
                        "maxWidth": "600px",
                        "margin": "0 auto 40px auto"
                      },
                      "props": {
                        "text": "Join thousands of happy customers who've discovered the magic of pastel living.",
                        "className": "fade-in-up delay-1"
                      }
                    },
                    {
                      "type": "Button",
                      "id": "cta-button",
                      "children": [],
                      "style": {
                        "backgroundColor": "white",
                        "color": "var(--primary-color)",
                        "border": "none",
                        "padding": "18px 40px",
                        "borderRadius": "30px",
                        "fontSize": "1.2rem",
                        "fontWeight": "600",
                        "cursor": "pointer",
                        "transition": "all 0.3s ease",
                        "display": "block",
                        "margin": "0 auto"
                      },
                      "props": {
                        "text": "Start Shopping",
                        "className": "cta-btn-hover fade-in-up delay-2"
                      }
                    }
                  ],
                  "style": {
                    "textAlign": "center",
                    "maxWidth": "800px",
                    "margin": "0 auto",
                    "padding": "0 20px"
                  },
                  "props": { "className": "" }
                }
              ],
              "style": {
                "background": "linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)",
                "padding": "80px 0"
              },
              "props": { "className": "" }
            }
          ],
          "style": {
            "paddingTop": "0"
          },
          "props": { "className": "" }
        }
      ],
      "style": {
        "margin": "0",
        "padding": "0",
        "fontFamily": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        "lineHeight": "1.6",
        "color": "var(--text-color)",
        "overflowX": "hidden"
      },
      "props": { "className": "" }
    }
  ],
  "functions": [],
  "hover": ".logo-hover:hover { transform: scale(1.05); color: var(--accent-color) !important; } .nav-link-hover:hover { background-color: var(--primary-light); color: var(--primary-color) !important; transform: translateY(-2px); } .contact-btn-hover:hover { background-color: var(--primary-color); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); } .primary-btn-hover:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); background-color: var(--primary-dark); } .secondary-btn-hover:hover { background-color: var(--primary-color); color: white; transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.15); } .product-card-hover:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); } .product-image-hover:hover { transform: scale(1.05); } .cta-btn-hover:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 15px 30px rgba(0,0,0,0.2); }",
  "animations": "@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } } @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } } @keyframes slideUpOnScroll { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } } .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; } .fade-in-up.delay-1 { animation-delay: 0.2s; } .fade-in-up.delay-2 { animation-delay: 0.4s; } .fade-in-up.delay-3 { animation-delay: 0.6s; } .slide-down { animation: slideDown 0.6s ease-out; } .float-animation { animation: float 3s ease-in-out infinite; } .slide-up-on-scroll { animation: slideUpOnScroll 0.8s ease-out forwards; opacity: 0; } .slide-up-on-scroll.delay-1 { animation-delay: 0.1s; } .slide-up-on-scroll.delay-2 { animation-delay: 0.2s; }",
  "theme": {
    "light": ":root, .light { --primary-color: #E8B4CB; --primary-light: #F5D7E3; --primary-dark: #D6A0BC; --accent-color: #A8D8EA; --secondary-color: #FFD93D; --text-color: #2D3748; --text-secondary: #718096; --bg-light: #FAF5FF; --bg-gradient-start: #FFF5F8; --bg-gradient-end: #F0F8FF; --success: #68D391; --warning: #F6E05E; --error: #FC8181; }",
    "dark": ".dark { --primary-color: #D6A0BC; --primary-light: #E8B4CB; --primary-dark: #C491A8; --accent-color: #89CDF1; --secondary-color: #F7DC6F; --text-color: #F7FAFC; --text-secondary: #CBD5E0; --bg-light: #1A202C; --bg-gradient-start: #2D3748; --bg-gradient-end: #4A5568; --success: #48BB78; --warning: #ED8936; --error: #E53E3E; }"
  },
  "responsiveUtilities": {
    "mobile": "@media (max-width: 768px) { .mobile-hide { display: none !important; } .mobile-center { text-align: center !important; } .mobile-full-width { width: 100% !important; } }",
    "tablet": "@media (min-width: 769px) and (max-width: 1024px) { .tablet-hide { display: none !important; } .tablet-center { text-align: center !important; } }",
    "desktop": "@media (min-width: 1025px) { .desktop-show { display: block !important; } }",
    "large": "@media (min-width: 1440px) { .large-container { max-width: 1400px !important; } }"
  }
}
  
export function getDSL(prompt : string){
    // fetch DSL
    //@ts-ignore
    const DSL : DSL = tempDSL

    //@ts-ignore
    prompt

    console.log("Running Tests...")
    const res = sanetizer(DSL)
    if(res){
        return res
    }else{
        // handle invalid DSLs
        return false
    }
}