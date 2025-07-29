import sanetizer, { type DSL } from "./sanetizer";

const tempDSL : DSL = {
  components: [
    {
      type: "Body",
      id: "main-body",
      children: [
        // Header/Navigation
        {
          type: "Nav",
          id: "main-nav",
          children: [
            {
              type: "Div",
              id: "nav-container",
              children: [
                {
                  type: "Heading",
                  id: "logo",
                  children: [],
                  style: {
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#0ea5e9",
                    margin: "0"
                  },
                  props: {
                    text: "日本語 Learn",
                    className: "logo-hover"
                  }
                },
                {
                  type: "Div",
                  id: "nav-links",
                  children: [
                    {
                      type: "Link",
                      id: "nav-courses",
                      children: [],
                      style: {
                        textDecoration: "none",
                        color: "#64748b",
                        fontWeight: "500",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease"
                      },
                      props: {
                        text: "Courses",
                        href: "#courses",
                        className: "nav-link-hover"
                      }
                    },
                    {
                      type: "Link",
                      id: "nav-about",
                      children: [],
                      style: {
                        textDecoration: "none",
                        color: "#64748b",
                        fontWeight: "500",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease"
                      },
                      props: {
                        text: "About",
                        href: "#about",
                        className: "nav-link-hover"
                      }
                    },
                    {
                      type: "Link",
                      id: "nav-testimonials",
                      children: [],
                      style: {
                        textDecoration: "none",
                        color: "#64748b",
                        fontWeight: "500",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease"
                      },
                      props: {
                        text: "Reviews",
                        href: "#testimonials",
                        className: "nav-link-hover"
                      }
                    },
                    {
                      type: "Button",
                      id: "nav-cta",
                      children: [],
                      style: {
                        backgroundColor: "#f472b6",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "25px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      },
                      props: {
                        text: "Start Learning",
                        className: "cta-button-hover"
                      }
                    }
                  ],
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                  },
                  props: {
                    className: "nav-links"
                  }
                }
              ],
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 20px"
              },
              props: {
                className: ""
              }
            }
          ],
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            zIndex: "1000",
            padding: "15px 0",
            borderBottom: "1px solid rgba(14, 165, 233, 0.1)"
          },
          mediaQueries: {
            mobile: {
              padding: "10px 0"
            }
          },
          props: {
            className: "main-nav"
          }
        },

        // Hero Section
        {
          type: "Section",
          id: "hero-section",
          children: [
            {
              type: "Div",
              id: "hero-container",
              children: [
                {
                  type: "Div",
                  id: "hero-content",
                  children: [
                    {
                      type: "Heading",
                      id: "hero-title",
                      children: [],
                      style: {
                        fontSize: "60px",
                        fontWeight: "800",
                        color: "#1e293b",
                        marginBottom: "20px",
                        lineHeight: "1.1"
                      },
                      mediaQueries: {
                        mobile: {
                          fontSize: "36px"
                        },
                        tablet: {
                          fontSize: "48px"
                        }
                      },
                      props: {
                        text: "Master Japanese with Native Speakers",
                        className: "fade-in-up"
                      }
                    },
                    {
                      type: "Text",
                      id: "hero-subtitle",
                      children: [],
                      style: {
                        fontSize: "20px",
                        color: "#64748b",
                        marginBottom: "40px",
                        lineHeight: "1.6",
                        maxWidth: "600px"
                      },
                      mediaQueries: {
                        mobile: {
                          fontSize: "16px",
                          marginBottom: "30px"
                        }
                      },
                      props: {
                        text: "Learn Japanese through immersive lessons, cultural insights, and personalized guidance from experienced native teachers.",
                        className: "fade-in-up-delay"
                      }
                    },
                    {
                      type: "Div",
                      id: "hero-buttons",
                      children: [
                        {
                          type: "Button",
                          id: "hero-primary-btn",
                          children: [],
                          style: {
                            backgroundColor: "#0ea5e9",
                            color: "white",
                            border: "none",
                            padding: "16px 32px",
                            fontSize: "18px",
                            fontWeight: "600",
                            borderRadius: "30px",
                            cursor: "pointer",
                            marginRight: "20px",
                            transition: "all 0.3s ease"
                          },
                          props: {
                            text: "Start Free Trial",
                            className: "primary-button-hover fade-in-up-delay-2"
                          }
                        },
                        {
                          type: "Button",
                          id: "hero-secondary-btn",
                          children: [],
                          style: {
                            backgroundColor: "transparent",
                            color: "#0ea5e9",
                            border: "2px solid #0ea5e9",
                            padding: "14px 30px",
                            fontSize: "18px",
                            fontWeight: "600",
                            borderRadius: "30px",
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                          },
                          props: {
                            text: "Watch Demo",
                            className: "secondary-button-hover fade-in-up-delay-2"
                          }
                        }
                      ],
                      style: {
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap"
                      },
                      mediaQueries: {
                        mobile: {
                          flexDirection: "column",
                          gap: "15px"
                        }
                      },
                      props: {
                        className: ""
                      }
                    }
                  ],
                  style: {
                    flex: "1",
                    paddingRight: "40px"
                  },
                  mediaQueries: {
                    mobile: {
                      paddingRight: "0",
                      textAlign: "center"
                    }
                  },
                  props: {
                    className: ""
                  }
                },
                {
                  type: "Div",
                  id: "hero-image",
                  children: [
                    {
                      type: "Image",
                      id: "hero-img",
                      children: [],
                      style: {
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "20px",
                        boxShadow: "0 20px 50px rgba(14, 165, 233, 0.2)"
                      },
                      props: {
                        src: "/api/placeholder/500/400",
                        alt: "Japanese learning experience",
                        className: "float-animation"
                      }
                    }
                  ],
                  style: {
                    flex: "1"
                  },
                  mediaQueries: {
                    mobile: {
                      marginTop: "40px"
                    }
                  },
                  props: {
                    className: ""
                  }
                }
              ],
              style: {
                display: "flex",
                alignItems: "center",
                gap: "60px",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 20px"
              },
              mediaQueries: {
                mobile: {
                  flexDirection: "column",
                  gap: "40px"
                }
              },
              props: {
                className: ""
              }
            }
          ],
          style: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(244, 114, 182, 0.05) 100%)",
            paddingTop: "100px"
          },
          props: {
            className: ""
          }
        },

        // Features Section
        {
          type: "Section",
          id: "features-section",
          children: [
            {
              type: "Div",
              id: "features-container",
              children: [
                {
                  type: "Heading",
                  id: "features-title",
                  children: [],
                  style: {
                    fontSize: "48px",
                    fontWeight: "700",
                    textAlign: "center",
                    color: "#1e293b",
                    marginBottom: "60px"
                  },
                  mediaQueries: {
                    mobile: {
                      fontSize: "32px",
                      marginBottom: "40px"
                    }
                  },
                  props: {
                    text: "Why Choose Our Japanese Courses?",
                    className: "scroll-fade-in"
                  }
                },
                {
                  type: "Div",
                  id: "features-grid",
                  children: [
                    {
                      type: "Div",
                      id: "feature-1",
                      children: [
                        {
                          type: "Text",
                          id: "feature-1-icon",
                          children: [],
                          style: {
                            fontSize: "48px",
                            marginBottom: "20px",
                            display: "block"
                          },
                          props: {
                            text: "🎌",
                            className: ""
                          }
                        },
                        {
                          type: "Heading",
                          id: "feature-1-title",
                          children: [],
                          style: {
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#1e293b",
                            marginBottom: "15px"
                          },
                          props: {
                            text: "Native Teachers",
                            className: ""
                          }
                        },
                        {
                          type: "Text",
                          id: "feature-1-desc",
                          children: [],
                          style: {
                            color: "#64748b",
                            lineHeight: "1.6"
                          },
                          props: {
                            text: "Learn from experienced native Japanese speakers who understand the nuances of the language and culture.",
                            className: ""
                          }
                        }
                      ],
                      style: {
                        backgroundColor: "white",
                        padding: "40px",
                        borderRadius: "20px",
                        textAlign: "center",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease"
                      },
                      props: {
                        className: "feature-card-hover scroll-fade-in-delay"
                      }
                    },
                    {
                      type: "Div",
                      id: "feature-2",
                      children: [
                        {
                          type: "Text",
                          id: "feature-2-icon",
                          children: [],
                          style: {
                            fontSize: "48px",
                            marginBottom: "20px",
                            display: "block"
                          },
                          props: {
                            text: "📚",
                            className: ""
                          }
                        },
                        {
                          type: "Heading",
                          id: "feature-2-title",
                          children: [],
                          style: {
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#1e293b",
                            marginBottom: "15px"
                          },
                          props: {
                            text: "Structured Learning",
                            className: ""
                          }
                        },
                        {
                          type: "Text",
                          id: "feature-2-desc",
                          children: [],
                          style: {
                            color: "#64748b",
                            lineHeight: "1.6"
                          },
                          props: {
                            text: "Progressive curriculum from Hiragana to advanced conversation, designed for effective language acquisition.",
                            className: ""
                          }
                        }
                      ],
                      style: {
                        backgroundColor: "white",
                        padding: "40px",
                        borderRadius: "20px",
                        textAlign: "center",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease"
                      },
                      props: {
                        className: "feature-card-hover scroll-fade-in-delay-2"
                      }
                    },
                    {
                      type: "Div",
                      id: "feature-3",
                      children: [
                        {
                          type: "Text",
                          id: "feature-3-icon",
                          children: [],
                          style: {
                            fontSize: "48px",
                            marginBottom: "20px",
                            display: "block"
                          },
                          props: {
                            text: "🌸",
                            className: ""
                          }
                        },
                        {
                          type: "Heading",
                          id: "feature-3-title",
                          children: [],
                          style: {
                            fontSize: "24px",
                            fontWeight: "600",
                            color: "#1e293b",
                            marginBottom: "15px"
                          },
                          props: {
                            text: "Cultural Immersion",
                            className: ""
                          }
                        },
                        {
                          type: "Text",
                          id: "feature-3-desc",
                          children: [],
                          style: {
                            color: "#64748b",
                            lineHeight: "1.6"
                          },
                          props: {
                            text: "Dive deep into Japanese culture, traditions, and social customs alongside language learning.",
                            className: ""
                          }
                        }
                      ],
                      style: {
                        backgroundColor: "white",
                        padding: "40px",
                        borderRadius: "20px",
                        textAlign: "center",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease"
                      },
                      props: {
                        className: "feature-card-hover scroll-fade-in-delay-3"
                      }
                    }
                  ],
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "40px"
                  },
                  mediaQueries: {
                    mobile: {
                      gridTemplateColumns: "1fr",
                      gap: "30px"
                    }
                  },
                  props: {
                    className: ""
                  }
                }
              ],
              style: {
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 20px"
              },
              props: {
                className: ""
              }
            }
          ],
          style: {
            padding: "100px 0",
            backgroundColor: "#f8fafc"
          },
          props: {
            className: ""
          }
        },

        // Courses Section
        {
          type: "Section",
          id: "courses-section",
          children: [
            {
              type: "Div",
              id: "courses-container",
              children: [
                {
                  type: "Heading",
                  id: "courses-title",
                  children: [],
                  style: {
                    fontSize: "48px",
                    fontWeight: "700",
                    textAlign: "center",
                    color: "#1e293b",
                    marginBottom: "60px"
                  },
                  mediaQueries: {
                    mobile: {
                      fontSize: "32px",
                      marginBottom: "40px"
                    }
                  },
                  props: {
                    text: "Choose Your Learning Path",
                    className: "scroll-fade-in"
                  }
                },
                {
                  type: "Div",
                  id: "courses-grid",
                  children: [
                    {
                      type: "Div",
                      id: "course-beginner",
                      children: [
                        {
                          type: "Heading",
                          id: "course-beginner-level",
                          children: [],
                          style: {
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#0ea5e9",
                            marginBottom: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                          },
                          props: {
                            text: "Beginner",
                            className: ""
                          }
                        },
                        {
                          type: "Heading",
                          id: "course-beginner-title",
                          children: [],
                          style: {
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#1e293b",
                            marginBottom: "20px"
                          },
                          props: {
                            text: "Foundation Course",
                            className: ""
                          }
                        },
                        {
                          type: "Text",
                          id: "course-beginner-desc",
                          children: [],
                          style: {
                            color: "#64748b",
                            lineHeight: "1.6",
                            marginBottom: "30px"
                          },
                          props: {
                            text: "Start your Japanese journey with Hiragana, Katakana, basic grammar, and essential vocabulary for daily conversations.",
                            className: ""
                          }
                        },
                        {
                          type: "Button",
                          id: "course-beginner-btn",
                          children: [],
                          style: {
                            backgroundColor: "#f472b6",
                            color: "white",
                            border: "none",
                            padding: "14px 28px",
                            borderRadius: "25px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                          },
                          props: {
                            text: "Start Learning",
                            className: "cta-button-hover"
                          }
                        }
                      ],
                      style: {
                        backgroundColor: "white",
                        padding: "40px",
                        borderRadius: "20px",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        border: "2px solid transparent",
                        transition: "all 0.3s ease"
                      },
                      props: {
                        className: "course-card-hover scroll-fade-in-delay"
                      }
                    },
                    {
                      type: "Div",
                      id: "course-intermediate",
                      children: [
                        {
                          type: "Heading",
                          id: "course-intermediate-level",
                          children: [],
                          style: {
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#0ea5e9",
                            marginBottom: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                          },
                          props: {
                            text: "Intermediate",
                            className: ""
                          }
                        },
                        {
                          type: "Heading",
                          id: "course-intermediate-title",
                          children: [],
                          style: {
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#1e293b",
                            marginBottom: "20px"
                          },
                          props: {
                            text: "Kanji & Grammar",
                            className: ""
                          }
                        },
                        {
                          type: "Text",
                          id: "course-intermediate-desc",
                          children: [],
                          style: {
                            color: "#64748b",
                            lineHeight: "1.6",
                            marginBottom: "30px"
                          },
                          props: {
                            text: "Master essential Kanji characters, complex grammar patterns, and develop natural conversation skills.",
                            className: ""
                          }
                        },
                        {
                          type: "Button",
                          id: "course-intermediate-btn",
                          children: [],
                          style: {
                            backgroundColor: "#f472b6",
                            color: "white",
                            border: "none",
                            padding: "14px 28px",
                            borderRadius: "25px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                          },
                          props: {
                            text: "Continue Journey",
                            className: "cta-button-hover"
                          }
                        }
                      ],
                      style: {
                        backgroundColor: "white",
                        padding: "40px",
                        borderRadius: "20px",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        border: "2px solid transparent",
                        transition: "all 0.3s ease"
                      },
                      props: {
                        className: "course-card-hover scroll-fade-in-delay-2"
                      }
                    }
                  ],
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                    gap: "40px"
                  },
                  mediaQueries: {
                    mobile: {
                      gridTemplateColumns: "1fr",
                      gap: "30px"
                    }
                  },
                  props: {
                    className: ""
                  }
                }
              ],
              style: {
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 20px"
              },
              props: {
                className: ""
              }
            }
          ],
          style: {
            padding: "100px 0"
          },
          props: {
            className: ""
          }
        },

        // CTA Section
        {
          type: "Section",
          id: "cta-section",
          children: [
            {
              type: "Div",
              id: "cta-container",
              children: [
                {
                  type: "Heading",
                  id: "cta-title",
                  children: [],
                  style: {
                    fontSize: "48px",
                    fontWeight: "700",
                    textAlign: "center",
                    color: "white",
                    marginBottom: "20px"
                  },
                  mediaQueries: {
                    mobile: {
                      fontSize: "32px"
                    }
                  },
                  props: {
                    text: "Ready to Start Your Japanese Journey?",
                    className: "scroll-fade-in"
                  }
                },
                {
                  type: "Text",
                  id: "cta-subtitle",
                  children: [],
                  style: {
                    fontSize: "20px",
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.9)",
                    marginBottom: "40px",
                    maxWidth: "600px",
                    margin: "0 auto 40px auto"
                  },
                  mediaQueries: {
                    mobile: {
                      fontSize: "16px",
                      marginBottom: "30px"
                    }
                  },
                  props: {
                    text: "Join thousands of students who have successfully learned Japanese with our proven method.",
                    className: "scroll-fade-in-delay"
                  }
                },
                {
                  type: "Button",
                  id: "cta-button",
                  children: [],
                  style: {
                    backgroundColor: "white",
                    color: "#0ea5e9",
                    border: "none",
                    padding: "18px 36px",
                    fontSize: "20px",
                    fontWeight: "700",
                    borderRadius: "30px",
                    cursor: "pointer",
                    display: "block",
                    margin: "0 auto",
                    transition: "all 0.3s ease"
                  },
                  props: {
                    text: "Start Free Trial Today",
                    className: "cta-white-button-hover scroll-fade-in-delay-2"
                  }
                }
              ],
              style: {
                maxWidth: "800px",
                margin: "0 auto",
                padding: "0 20px",
                textAlign: "center"
              },
              props: {
                className: ""
              }
            }
          ],
          style: {
            background: "linear-gradient(135deg, #0ea5e9 0%, #f472b6 100%)",
            padding: "100px 0"
          },
          props: {
            className: ""
          }
        }
      ],
      style: {
        margin: "0",
        padding: "0",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        lineHeight: "1.6",
        color: "#334155",
        overflowX: "hidden"
      },
      props: {
        className: ""
      }
    }
  ],
  functions: [],
  hover: `
    .logo-hover:hover {
      transform: scale(1.05);
      color: #f472b6 !important;
    }
    
    .nav-link-hover:hover {
      background-color: rgba(14, 165, 233, 0.1) !important;
      color: #0ea5e9 !important;
    }
    
    .cta-button-hover:hover {
      background-color: #ec4899 !important;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(244, 114, 182, 0.3);
    }
    
    .primary-button-hover:hover {
      background-color: #0284c7 !important;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(14, 165, 233, 0.3);
    }
    
    .secondary-button-hover:hover {
      background-color: #0ea5e9 !important;
      color: white !important;
      transform: translateY(-2px);
    }
    
    .feature-card-hover:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
    }
    
    .course-card-hover:hover {
      transform: translateY(-5px);
      border-color: #f472b6 !important;
      box-shadow: 0 20px 40px rgba(244, 114, 182, 0.15) !important;
    }
    
    .cta-white-button-hover:hover {
      background-color: #f8fafc !important;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3);
    }
  `,
  animations: `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .fade-in-up {
      animation: fadeInUp 0.8s ease-out;
    }
    
    .fade-in-up-delay {
      animation: fadeInUp 0.8s ease-out 0.2s both;
    }
    
    .fade-in-up-delay-2 {
      animation: fadeInUp 0.8s ease-out 0.4s both;
    }
    
    .float-animation {
      animation: float 6s ease-in-out infinite;
    }
    
    .scroll-fade-in {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out;
    }
    
    .scroll-fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .scroll-fade-in-delay {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out 0.2s;
    }
    
    .scroll-fade-in-delay.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .scroll-fade-in-delay-2 {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out 0.4s;
    }
    
    .scroll-fade-in-delay-2.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .scroll-fade-in-delay-3 {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out 0.6s;
    }
    
    .scroll-fade-in-delay-3.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  theme: {
    light: `
      :root {
        --primary-sky: #0ea5e9;
        --primary-sky-dark: #0284c7;
        --primary-sky-light: #7dd3fc;
        --sakura-pink: #f472b6;
        --sakura-pink-dark: #ec4899;
        --sakura-pink-light: #fbcfe8;
        --text-primary: #1e293b;
        --text-secondary: #64748b;
        --text-muted: #94a3b8;
        --background-primary: #ffffff;
        --background-secondary: #f8fafc;
        --background-accent: #f1f5f9;
        --border-light: rgba(14, 165, 233, 0.1);
        --shadow-light: rgba(0, 0, 0, 0.1);
        --shadow-medium: rgba(0, 0, 0, 0.15);
        --gradient-primary: linear-gradient(135deg, #0ea5e9 0%, #f472b6 100%);
        --gradient-background: linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(244, 114, 182, 0.05) 100%);
      }
      
      .light {
        --primary-sky: #0ea5e9;
        --primary-sky-dark: #0284c7;
        --primary-sky-light: #7dd3fc;
        --sakura-pink: #f472b6;
        --sakura-pink-dark: #ec4899;
        --sakura-pink-light: #fbcfe8;
        --text-primary: #1e293b;
        --text-secondary: #64748b;
        --text-muted: #94a3b8;
        --background-primary: #ffffff;
        --background-secondary: #f8fafc;
        --background-accent: #f1f5f9;
        --border-light: rgba(14, 165, 233, 0.1);
        --shadow-light: rgba(0, 0, 0, 0.1);
        --shadow-medium: rgba(0, 0, 0, 0.15);
        --gradient-primary: linear-gradient(135deg, #0ea5e9 0%, #f472b6 100%);
        --gradient-background: linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(244, 114, 182, 0.05) 100%);
      }
    `,
    dark: `
      .dark {
        --primary-sky: #38bdf8;
        --primary-sky-dark: #0ea5e9;
        --primary-sky-light: #7dd3fc;
        --sakura-pink: #f472b6;
        --sakura-pink-dark: #ec4899;
        --sakura-pink-light: #fbcfe8;
        --text-primary: #f8fafc;
        --text-secondary: #cbd5e1;
        --text-muted: #94a3b8;
        --background-primary: #0f172a;
        --background-secondary: #1e293b;
        --background-accent: #334155;
        --border-light: rgba(56, 189, 248, 0.2);
        --shadow-light: rgba(0, 0, 0, 0.3);
        --shadow-medium: rgba(0, 0, 0, 0.4);
        --gradient-primary: linear-gradient(135deg, #38bdf8 0%, #f472b6 100%);
        --gradient-background: linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(244, 114, 182, 0.1) 100%);
      }
    `
  },
  responsiveUtilities: {
    mobile: `
      @media (max-width: 768px) {
        .nav-links {
          display: none;
        }
        
        .mobile-menu-toggle {
          display: block;
        }
        
        .hero-buttons {
          flex-direction: column;
          gap: 15px;
        }
        
        .hero-buttons button {
          width: 100%;
          margin: 0;
        }
        
        .features-grid {
          grid-template-columns: 1fr;
          gap: 20px;
        }
        
        .courses-grid {
          grid-template-columns: 1fr;
          gap: 20px;
        }
        
        section {
          padding: 60px 0;
        }
        
        .hero-section {
          padding-top: 80px;
        }
      }
    `,
    tablet: `
      @media (min-width: 769px) and (max-width: 1024px) {
        .features-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }
        
        .courses-grid {
          grid-template-columns: 1fr;
          gap: 30px;
        }
        
        .hero-container {
          gap: 40px;
        }
        
        .nav-links {
          gap: 15px;
        }
      }
    `,
    desktop: `
      @media (min-width: 1025px) {
        .features-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        
        .courses-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .hero-container {
          gap: 60px;
        }
        
        .main-nav {
          padding: 20px 0;
        }
      }
    `,
    large: `
      @media (min-width: 1440px) {
        .hero-title {
          font-size: 72px;
        }
        
        .hero-subtitle {
          font-size: 22px;
        }
        
        .features-title,
        .courses-title,
        .cta-title {
          font-size: 56px;
        }
        
        .feature-card,
        .course-card {
          padding: 50px;
        }
        
        .hero-container,
        .features-container,
        .courses-container,
        .cta-container {
          max-width: 1400px;
        }
      }
    `
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