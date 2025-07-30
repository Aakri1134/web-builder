import sanetizer, { type DSL } from "./sanetizer";

const tempDSL : DSL = {
  components: [
    {
      type: "Body",
      id: "main-body",
      children: [
        // Navigation Header
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
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#c41e3a"
                  },
                  mediaQueries: {
                    mobile: { fontSize: "20px" }
                  },
                  props: {
                    text: "日本語マスター",
                    className: "logo-hover"
                  }
                },
                {
                  type: "List",
                  id: "nav-menu",
                  children: [
                    {
                      type: "ListItems",
                      id: "nav-home",
                      children: [
                        {
                          type: "Link",
                          id: "home-link",
                          children: [],
                          style: { color: "#333", textDecoration: "none" },
                          props: {
                            text: "Home",
                            href: "#home",
                            className: "nav-link-hover"
                          }
                        }
                      ],
                      style: {},
                      props: { className: "" }
                    },
                    {
                      type: "ListItems",
                      id: "nav-courses",
                      children: [
                        {
                          type: "Link",
                          id: "courses-link",
                          children: [],
                          style: { color: "#333", textDecoration: "none" },
                          props: {
                            text: "Courses",
                            href: "#courses",
                            className: "nav-link-hover"
                          }
                        }
                      ],
                      style: {},
                      props: { className: "" }
                    },
                    {
                      type: "ListItems",
                      id: "nav-about",
                      children: [
                        {
                          type: "Link",
                          id: "about-link",
                          children: [],
                          style: { color: "#333", textDecoration: "none" },
                          props: {
                            text: "About",
                            href: "#about",
                            className: "nav-link-hover"
                          }
                        }
                      ],
                      style: {},
                      props: { className: "" }
                    },
                    {
                      type: "ListItems",
                      id: "nav-contact",
                      children: [
                        {
                          type: "Button",
                          id: "contact-btn",
                          children: [],
                          style: {
                            backgroundColor: "#c41e3a",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px"
                          },
                          props: {
                            text: "Contact",
                            className: "btn-hover"
                          }
                        }
                      ],
                      style: {},
                      props: { className: "" }
                    }
                  ],
                  style: {
                    display: "flex",
                    gap: "30px",
                    listStyle: "none",
                    alignItems: "center"
                  },
                  mediaQueries: {
                    mobile: { flexDirection: "column", gap: "15px" }
                  },
                  props: { className: "" }
                }
              ],
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 50px",
                maxWidth: "1200px",
                margin: "0 auto"
              },
              mediaQueries: {
                mobile: { padding: "0 20px", flexDirection: "column", gap: "20px" }
              },
              props: { className: "" }
            }
          ],
          style: {
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            position: "sticky",
            top: "0",
            zIndex: "100",
            padding: "15px 0"
          },
          props: { className: "" }
        },

        // Main Content
        {
          type: "Main",
          id: "main-content",
          children: [
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
                            fontSize: "48px",
                            fontWeight: "bold",
                            marginBottom: "20px",
                            color: "#2c3e50"
                          },
                          mediaQueries: {
                            mobile: { fontSize: "32px" },
                            tablet: { fontSize: "40px" }
                          },
                          props: {
                            text: "Master Japanese Language",
                            className: "fade-in-up"
                          }
                        },
                        {
                          type: "Text",
                          id: "hero-subtitle",
                          children: [],
                          style: {
                            fontSize: "20px",
                            color: "#7f8c8d",
                            marginBottom: "30px",
                            lineHeight: "1.6"
                          },
                          mediaQueries: {
                            mobile: { fontSize: "16px" }
                          },
                          props: {
                            text: "Learn Japanese from beginner to advanced with our interactive courses, expert instructors, and immersive cultural experiences.",
                            className: "fade-in-up-delay"
                          }
                        },
                        {
                          type: "Div",
                          id: "hero-buttons",
                          children: [
                            {
                              type: "Button",
                              id: "start-learning-btn",
                              children: [],
                              style: {
                                backgroundColor: "#c41e3a",
                                color: "white",
                                padding: "15px 30px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "18px",
                                marginRight: "20px"
                              },
                              mediaQueries: {
                                mobile: { marginRight: "0", marginBottom: "15px", width: "100%" }
                              },
                              props: {
                                text: "Start Learning",
                                className: "btn-hover btn-scale"
                              }
                            },
                            {
                              type: "Button",
                              id: "watch-demo-btn",
                              children: [],
                              style: {
                                backgroundColor: "transparent",
                                color: "#c41e3a",
                                padding: "15px 30px",
                                border: "2px solid #c41e3a",
                                borderRadius: "8px",
                                fontSize: "18px"
                              },
                              mediaQueries: {
                                mobile: { width: "100%" }
                              },
                              props: {
                                text: "Watch Demo",
                                className: "btn-outline-hover"
                              }
                            }
                          ],
                          style: {
                            display: "flex",
                            gap: "20px"
                          },
                          mediaQueries: {
                            mobile: { flexDirection: "column", gap: "0" }
                          },
                          props: { className: "" }
                        }
                      ],
                      style: {
                        flex: "1",
                        paddingRight: "50px"
                      },
                      mediaQueries: {
                        mobile: { paddingRight: "0", textAlign: "center" },
                        tablet: { paddingRight: "30px" }
                      },
                      props: { className: "" }
                    },
                    
                  ],
                  style: {
                    display: "flex",
                    alignItems: "center",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 50px"
                  },
                  mediaQueries: {
                    mobile: { flexDirection: "column", padding: "0 20px" },
                    tablet: { padding: "0 30px" }
                  },
                  props: { className: "" }
                }
              ],
              style: {
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)"
              },
              props: { className: "" }
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
                        fontSize: "36px",
                        textAlign: "center",
                        marginBottom: "50px",
                        color: "#2c3e50"
                      },
                      mediaQueries: {
                        mobile: { fontSize: "28px", marginBottom: "30px" }
                      },
                      props: {
                        text: "Why Choose Our Japanese Courses?",
                        className: "section-title"
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
                              type: "Heading",
                              id: "feature-1-title",
                              children: [],
                              style: {
                                fontSize: "24px",
                                marginBottom: "15px",
                                color: "#c41e3a"
                              },
                              props: {
                                text: "Interactive Learning",
                                className: ""
                              }
                            },
                            {
                              type: "Text",
                              id: "feature-1-desc",
                              children: [],
                              style: {
                                color: "#7f8c8d",
                                lineHeight: "1.6"
                              },
                              props: {
                                text: "Engage with interactive exercises, games, and real-time feedback to accelerate your learning process.",
                                className: ""
                              }
                            }
                          ],
                          style: {
                            backgroundColor: "white",
                            padding: "30px",
                            borderRadius: "15px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                            textAlign: "center"
                          },
                          props: { className: "feature-card-hover" }
                        },
                        {
                          type: "Div",
                          id: "feature-2",
                          children: [
                            {
                              type: "Heading",
                              id: "feature-2-title",
                              children: [],
                              style: {
                                fontSize: "24px",
                                marginBottom: "15px",
                                color: "#c41e3a"
                              },
                              props: {
                                text: "Native Instructors",
                                className: ""
                              }
                            },
                            {
                              type: "Text",
                              id: "feature-2-desc",
                              children: [],
                              style: {
                                color: "#7f8c8d",
                                lineHeight: "1.6"
                              },
                              props: {
                                text: "Learn from certified native Japanese speakers who understand the nuances of the language and culture.",
                                className: ""
                              }
                            }
                          ],
                          style: {
                            backgroundColor: "white",
                            padding: "30px",
                            borderRadius: "15px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                            textAlign: "center"
                          },
                          props: { className: "feature-card-hover" }
                        },
                        {
                          type: "Div",
                          id: "feature-3",
                          children: [
                            {
                              type: "Heading",
                              id: "feature-3-title",
                              children: [],
                              style: {
                                fontSize: "24px",
                                marginBottom: "15px",
                                color: "#c41e3a"
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
                                color: "#7f8c8d",
                                lineHeight: "1.6"
                              },
                              props: {
                                text: "Dive deep into Japanese culture, traditions, and customs while learning the language for a complete experience.",
                                className: ""
                              }
                            }
                          ],
                          style: {
                            backgroundColor: "white",
                            padding: "30px",
                            borderRadius: "15px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                            textAlign: "center"
                          },
                          props: { className: "feature-card-hover" }
                        }
                      ],
                      style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "30px"
                      },
                      mediaQueries: {
                        mobile: { gridTemplateColumns: "1fr", gap: "20px" }
                      },
                      props: { className: "" }
                    }
                  ],
                  style: {
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 50px"
                  },
                  mediaQueries: {
                    mobile: { padding: "0 20px" }
                  },
                  props: { className: "" }
                }
              ],
              style: {
                padding: "80px 0",
                backgroundColor: "#f8f9fa"
              },
              mediaQueries: {
                mobile: { padding: "50px 0" }
              },
              props: { className: "" }
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
                        fontSize: "42px",
                        textAlign: "center",
                        marginBottom: "20px",
                        color: "white"
                      },
                      mediaQueries: {
                        mobile: { fontSize: "28px" }
                      },
                      props: {
                        text: "Ready to Start Your Journey?",
                        className: ""
                      }
                    },
                    {
                      type: "Text",
                      id: "cta-subtitle",
                      children: [],
                      style: {
                        fontSize: "20px",
                        textAlign: "center",
                        marginBottom: "40px",
                        color: "rgba(255,255,255,0.9)"
                      },
                      mediaQueries: {
                        mobile: { fontSize: "16px", marginBottom: "30px" }
                      },
                      props: {
                        text: "Join thousands of students who have mastered Japanese with our proven teaching methods.",
                        className: ""
                      }
                    },
                    {
                      type: "Div",
                      id: "cta-buttons",
                      children: [
                        {
                          type: "Button",
                          id: "get-started-btn",
                          children: [],
                          style: {
                            backgroundColor: "white",
                            color: "#c41e3a",
                            padding: "18px 40px",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "18px",
                            fontWeight: "bold"
                          },
                          props: {
                            text: "Get Started Today",
                            className: "btn-hover btn-pulse"
                          }
                        }
                      ],
                      style: {
                        textAlign: "center"
                      },
                      props: { className: "" }
                    }
                  ],
                  style: {
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "0 50px",
                    textAlign: "center"
                  },
                  mediaQueries: {
                    mobile: { padding: "0 20px" }
                  },
                  props: { className: "" }
                }
              ],
              style: {
                padding: "80px 0",
                background: "linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)"
              },
              mediaQueries: {
                mobile: { padding: "50px 0" }
              },
              props: { className: "" }
            }
          ],
          style: {},
          props: { className: "" }
        },

        // Footer
        {
          type: "Section",
          id: "footer",
          children: [
            {
              type: "Div",
              id: "footer-container",
              children: [
                {
                  type: "Div",
                  id: "footer-content",
                  children: [
                    // Company Info Column
                    {
                      type: "Div",
                      id: "footer-company",
                      children: [
                        {
                          type: "Heading",
                          id: "footer-logo",
                          children: [],
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#c41e3a",
                            marginBottom: "15px"
                          },
                          props: {
                            text: "日本語マスター",
                            className: ""
                          }
                        },
                        {
                          type: "Text",
                          id: "footer-description",
                          children: [],
                          style: {
                            color: "#7f8c8d",
                            marginBottom: "20px",
                            lineHeight: "1.6"
                          },
                          props: {
                            text: "Your trusted partner in mastering the Japanese language and culture. Join thousands of successful students worldwide.",
                            className: ""
                          }
                        },
                        {
                          type: "Div",
                          id: "social-links",
                          children: [
                            {
                              type: "Link",
                              id: "facebook-link",
                              children: [],
                              style: {
                                color: "#7f8c8d",
                                textDecoration: "none",
                                marginRight: "15px",
                                fontSize: "18px"
                              },
                              props: {
                                text: "Facebook",
                                href: "#facebook",
                                className: "social-hover"
                              }
                            },
                            {
                              type: "Link",
                              id: "twitter-link",
                              children: [],
                              style: {
                                color: "#7f8c8d",
                                textDecoration: "none",
                                marginRight: "15px",
                                fontSize: "18px"
                              },
                              props: {
                                text: "Twitter",
                                href: "#twitter",
                                className: "social-hover"
                              }
                            },
                            {
                              type: "Link",
                              id: "instagram-link",
                              children: [],
                              style: {
                                color: "#7f8c8d",
                                textDecoration: "none",
                                fontSize: "18px"
                              },
                              props: {
                                text: "Instagram",
                                href: "#instagram",
                                className: "social-hover"
                              }
                            }
                          ],
                          style: {
                            display: "flex",
                            gap: "15px"
                          },
                          mediaQueries: {
                            mobile: { justifyContent: "center" }
                          },
                          props: { className: "" }
                        }
                      ],
                      style: {
                        flex: "1",
                        minWidth: "250px"
                      },
                      mediaQueries: {
                        mobile: { 
                          textAlign: "center", 
                          marginBottom: "25px",
                          minWidth: "100%"
                        }
                      },
                      props: { className: "" }
                    },

                    // Quick Links Column
                    {
                      type: "Div",
                      id: "footer-links",
                      children: [
                        {
                          type: "Heading",
                          id: "footer-links-title",
                          children: [],
                          style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#2c3e50",
                            marginBottom: "15px"
                          },
                          props: {
                            text: "Quick Links",
                            className: ""
                          }
                        },
                        {
                          type: "List",
                          id: "footer-nav-list",
                          children: [
                            {
                              type: "ListItems",
                              id: "footer-courses",
                              children: [
                                {
                                  type: "Link",
                                  id: "footer-courses-link",
                                  children: [],
                                  style: {
                                    color: "#7f8c8d",
                                    textDecoration: "none",
                                    lineHeight: "2"
                                  },
                                  props: {
                                    text: "All Courses",
                                    href: "#courses",
                                    className: "footer-link-hover"
                                  }
                                }
                              ],
                              style: { marginBottom: "8px" },
                              props: { className: "" }
                            },
                            {
                              type: "ListItems",
                              id: "footer-beginner",
                              children: [
                                {
                                  type: "Link",
                                  id: "footer-beginner-link",
                                  children: [],
                                  style: {
                                    color: "#7f8c8d",
                                    textDecoration: "none",
                                    lineHeight: "2"
                                  },
                                  props: {
                                    text: "Beginner Course",
                                    href: "#beginner",
                                    className: "footer-link-hover"
                                  }
                                }
                              ],
                              style: { marginBottom: "8px" },
                              props: { className: "" }
                            },
                            {
                              type: "ListItems",
                              id: "footer-advanced",
                              children: [
                                {
                                  type: "Link",
                                  id: "footer-advanced-link",
                                  children: [],
                                  style: {
                                    color: "#7f8c8d",
                                    textDecoration: "none",
                                    lineHeight: "2"
                                  },
                                  props: {
                                    text: "Advanced Course",
                                    href: "#advanced",
                                    className: "footer-link-hover"
                                  }
                                }
                              ],
                              style: { marginBottom: "8px" },
                              props: { className: "" }
                            },
                            {
                              type: "ListItems",
                              id: "footer-pricing",
                              children: [
                                {
                                  type: "Link",
                                  id: "footer-pricing-link",
                                  children: [],
                                  style: {
                                    color: "#7f8c8d",
                                    textDecoration: "none",
                                    lineHeight: "2"
                                  },
                                  props: {
                                    text: "Pricing",
                                    href: "#pricing",
                                    className: "footer-link-hover"
                                  }
                                }
                              ],
                              style: {},
                              props: { className: "" }
                            }
                          ],
                          style: {
                            listStyle: "none",
                            padding: "0"
                          },
                          props: { className: "" }
                        }
                      ],
                      style: {
                        flex: "1",
                        minWidth: "200px"
                      },
                      mediaQueries: {
                        mobile: { 
                          textAlign: "center", 
                          marginBottom: "25px",
                          minWidth: "100%"
                        }
                      },
                      props: { className: "" }
                    },

                    // Support Column
                    {
                      type: "Div",
                      id: "footer-support",
                      children: [
                        {
                          type: "Heading",
                          id: "footer-support-title",
                          children: [],
                          style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#2c3e50",
                            marginBottom: "15px"
                          },
                          props: {
                            text: "Support",
                            className: ""
                          }
                        },
                        {
                          type: "List",
                          id: "footer-support-list",
                          children: [
                            {
                              type: "ListItems",
                              id: "footer-help",
                              children: [
                                {
                                  type: "Link",
                                  id: "footer-help-link",
                                  children: [],
                                  style: {
                                    color: "#7f8c8d",
                                    textDecoration: "none",
                                    lineHeight: "2"
                                  },
                                  props: {
                                    text: "Help Center",
                                    href: "#help",
                                    className: "footer-link-hover"
                                  }
                                }
                              ],
                              style: { marginBottom: "8px" },
                              props: { className: "" }
                            },
                            {
                              type: "ListItems",
                              id: "footer-contact",
                              children: [
                                {
                                  type: "Link",
                                  id: "footer-contact-link",
                                  children: [],
                                  style: {
                                    color: "#7f8c8d",
                                    textDecoration: "none",
                                    lineHeight: "2"
                                  },
                                  props: {
                                    text: "Contact Us",
                                    href: "#contact",
                                    className: "footer-link-hover"
                                  }
                                }
                              ],
                              style: { marginBottom: "8px" },
                              props: { className: "" }
                            },
                            {
                              type: "ListItems",
                              id: "footer-faq",
                              children: [
                                {
                                  type: "Link",
                                  id: "footer-faq-link",
                                  children: [],
                                  style: {
                                    color: "#7f8c8d",
                                    textDecoration: "none",
                                    lineHeight: "2"
                                  },
                                  props: {
                                    text: "FAQ",
                                    href: "#faq",
                                    className: "footer-link-hover"
                                  }
                                }
                              ],
                              style: { marginBottom: "8px" },
                              props: { className: "" }
                            },
                            {
                              type: "ListItems",
                              id: "footer-privacy",
                              children: [
                                {
                                  type: "Link",
                                  id: "footer-privacy-link",
                                  children: [],
                                  style: {
                                    color: "#7f8c8d",
                                    textDecoration: "none",
                                    lineHeight: "2"
                                  },
                                  props: {
                                    text: "Privacy Policy",
                                    href: "#privacy",
                                    className: "footer-link-hover"
                                  }
                                }
                              ],
                              style: {},
                              props: { className: "" }
                            }
                          ],
                          style: {
                            listStyle: "none",
                            padding: "0"
                          },
                          props: { className: "" }
                        }
                      ],
                      style: {
                        flex: "1",
                        minWidth: "200px"
                      },
                      mediaQueries: {
                        mobile: { 
                          textAlign: "center", 
                          marginBottom: "25px",
                          minWidth: "100%"
                        }
                      },
                      props: { className: "" }
                    },

                    // Contact Info Column
                    {
                      type: "Div",
                      id: "footer-contact-info",
                      children: [
                        {
                          type: "Heading",
                          id: "footer-contact-title",
                          children: [],
                          style: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#2c3e50",
                            marginBottom: "15px"
                          },
                          props: {
                            text: "Contact Info",
                            className: ""
                          }
                        },
                        {
                          type: "Div",
                          id: "contact-details",
                          children: [
                            {
                              type: "Text",
                              id: "footer-email",
                              children: [],
                              style: {
                                color: "#7f8c8d",
                                marginBottom: "10px",
                                lineHeight: "1.8"
                              },
                              props: {
                                text: "hello@japanesemaster.com",
                                className: ""
                              }
                            },
                            {
                              type: "Text",
                              id: "footer-phone",
                              children: [],
                              style: {
                                color: "#7f8c8d",
                                marginBottom: "10px",
                                lineHeight: "1.8"
                              },
                              props: {
                                text: "+1 (555) 123-4567",
                                className: ""
                              }
                            },
                            {
                              type: "Text",
                              id: "footer-address",
                              children: [],
                              style: {
                                color: "#7f8c8d",
                                lineHeight: "1.8"
                              },
                              props: {
                                text: "123 Learning Street, Education City, EC 12345",
                                className: ""
                              }
                            }
                          ],
                          style: {},
                          props: { className: "" }
                        }
                      ],
                      style: {
                        flex: "1",
                        minWidth: "250px"
                      },
                      mediaQueries: {
                        mobile: { 
                          textAlign: "center",
                          minWidth: "100%"
                        }
                      },
                      props: { className: "" }
                    }
                  ],
                  style: {
                    display: "flex",
                    gap: "40px",
                    marginBottom: "40px",
                    flexWrap: "wrap"
                  },
                  mediaQueries: {
                    mobile: { 
                      flexDirection: "column", 
                      gap: "30px",
                      marginBottom: "30px"
                    },
                    tablet: { gap: "25px", flexWrap: "wrap" }
                  },
                  props: { className: "" }
                },

                // Footer Bottom
                {
                  type: "Div",
                  id: "footer-bottom",
                  children: [
                    {
                      type: "Text",
                      id: "copyright",
                      children: [],
                      style: {
                        color: "#7f8c8d",
                        textAlign: "center",
                        paddingTop: "20px",
                        borderTop: "1px solid #e0e0e0"
                      },
                      props: {
                        text: "© 2025 Japanese Master. All rights reserved. Made with ❤️ for Japanese learners worldwide.",
                        className: ""
                      }
                    }
                  ],
                  style: {},
                  props: { className: "" }
                }
              ],
              style: {
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 50px"
              },
              mediaQueries: {
                mobile: { padding: "0 20px" },
                tablet: { padding: "0 30px" }
              },
              props: { className: "" }
            }
          ],
          style: {
            backgroundColor: "#f8f9fa",
            padding: "60px 0 20px 0"
          },
          mediaQueries: {
            mobile: { padding: "40px 0 20px 0" }
          },
          props: { className: "" }
        }
      ],
      style: {
        fontFamily: "'Inter', sans-serif",
        margin: "0",
        padding: "0",
        lineHeight: "1.6"
      },
      props: { className: "" }
    }
  ],
  functions: [],
  hover: `
    .logo-hover:hover { color: #8b0000; transition: color 0.3s ease; }
    .nav-link-hover:hover { color: #c41e3a; transition: color 0.3s ease; }
    .btn-hover:hover { transform: translateY(-2px); transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
    .btn-outline-hover:hover { background-color: #c41e3a; color: white; transition: all 0.3s ease; }
    .feature-card-hover:hover { transform: translateY(-5px); transition: all 0.3s ease; box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
    .btn-scale:hover { transform: scale(1.05); }
    .btn-pulse:hover { animation: pulse 0.6s; }
    .social-hover:hover { color: #c41e3a; transition: color 0.3s ease; }
    .footer-link-hover:hover { color: #c41e3a; transition: color 0.3s ease; }
  `,
  animations: `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    .fade-in-up { animation: fadeInUp 0.8s ease-out; }
    .fade-in-up-delay { animation: fadeInUp 0.8s ease-out 0.2s both; }
    .float-animation { animation: float 3s ease-in-out infinite; }
  `,
  theme: {
    light: `
      :root {
        --primary-color: #c41e3a;
        --secondary-color: #ffeaa7;
        --text-dark: #2c3e50;
        --text-light: #7f8c8d;
        --background-light: #f8f9fa;
        --white: #ffffff;
        --shadow: rgba(0,0,0,0.1);
      }
    `,
    dark: `
      .dark {
        --primary-color: #ff6b6b;
        --secondary-color: #4ecdc4;
        --text-dark: #ffffff;
        --text-light: #a0a0a0;
        --background-light: #2c3e50;
        --white: #34495e;
        --shadow: rgba(0,0,0,0.3);
      }
    `
  },
  responsiveUtilities: {
    mobile: `
      @media (max-width: 768px) {
        .section-title { font-size: 24px !important; }
        .hero-container { padding: 30px 20px !important; }
        .features-grid { gap: 15px !important; }
        .hero-image-responsive { 
          width: 100% !important;
          height: 280px !important;
          object-fit: cover !important;
          border-radius: 10px !important;
        }
        .footer-column {
          margin-bottom: 25px !important;
          text-align: center !important;
        }
        .footer-content {
          flex-direction: column !important;
          gap: 30px !important;
        }
        .social-links {
          justify-content: center !important;
        }
      }
    `,
    tablet: `
      @media (min-width: 769px) and (max-width: 1024px) {
        .hero-container { padding: 40px 30px !important; }
        .section-title { font-size: 32px !important; }
      }
    `,
    desktop: `
      @media (min-width: 1025px) {
        .hero-container { padding: 60px 50px !important; }
        .features-grid { gap: 40px !important; }
      }
    `,
    large: `
      @media (min-width: 1440px) {
        .hero-container { padding: 80px 100px !important; }
        .section-title { font-size: 40px !important; }
      }
    `
  }
};
  
  
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