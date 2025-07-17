import React from "react";
import MainNav from "../Common/MainNav";
import TopBar from "../Common/Topbar";
import { Carousel } from "react-bootstrap";
import CountUp from "react-countup";
import bgImage from "../../assets/bg-image-17-1.png";
import mainSlider from "../../assets/main-slider.png";
import groupImage from "../../assets/Group-6-2.png";
import image from "../../assets/image-6.png";
import { FaDumbbell, FaDesktop } from "react-icons/fa";
import CoursePage from "./CoursePage";
import { Button } from "react-bootstrap";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import Footer from "../Common/Footer";
import {
  FaRocket,
  FaFlask,
  FaHandshake,
  FaUserGraduate,
  FaBriefcase,
  FaGlobe,
  FaLock,
  FaLightbulb,
  FaPlane,
} from "react-icons/fa";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  content: string;
  avatar: string; // image URL or local path
}

interface BlogItem {
  title: string;
  date: string;
  time: string;
  image: string;
}

const slides = [
  {
    image: bgImage,
    heading:
      "Graduate with Outstanding Industrial Experience in the Fashion Industry",
    subheading: "and start your career with a distinct advantage",
    buttonText: "Getting Started",
  },
  {
    image: mainSlider,
    heading: "Explore Cutting-Edge Courses and Career Guidance",
    subheading: "designed to launch your dream career path",
    buttonText: "Explore Now",
  },
  {
    image: groupImage,
    heading: "Join Industry Experts and Learn from the Best",
    subheading: "with hands-on projects and mentorship",
    buttonText: "Join Us Today",
  },
];

function Home() {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // 2000 ms = 2 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const stats = [
    {
      icon: "fas fa-user-graduate",
      value: 1497,
      label: "Students Enrolled",
      color: "#00b894",
    },
    {
      icon: "fas fa-bookmark",
      value: 12,
      label: "Courses",
      color: "#a29bfe",
    },
    {
      icon: "fas fa-chalkboard-teacher",
      value: 91,
      label: "Core topics",
      color: "#ff6b81",
    },
    {
      icon: "fas fa-bookmark",
      value: 29,
      label: "Industry Experts",
      color: "#a29bfe",
    },
  ];

  const events = [
    {
      date: "22nd February, 2025",
      title: "The Green Corridor 2025",
      type: "Webinar",
      time: "2 pm – 4 pm",
      location: "Tirupur, Coimbatore, and Karur",
    },
    {
      date: "3rd March 2025",
      title: "Injex Faculty Development Programme",
      type: "International fair",
      time: "10 am – 12 pm",
      location: "College seminar halls at our partner institutions.",
    },
  ];

  const features = [
    {
      icon: <FaRocket className="text-warning fs-1" />,
      title: "Accelerated Learning",
      description:
        "Students gain Industrial Orientation in a fraction of the time it would typically take. The programme distills the essential part of the Industrial knowledge into “Optimized Industrial Practices” cutting out the part that are flawed and unnecessary.",
    },
    {
      icon: <FaFlask className="text-warning fs-1" />,
      title: "Practice & Simulation intense",
      description:
        "30% of the time spent on learning the theoretical constructs of practices. 55% of the time spent on applying the theoretical constructs with the help of simulation tools & practice sessions, and the final 15% on internship",
    },
    {
      icon: <FaHandshake className="text-warning fs-1" />,
      title: "Industry-Institution Partnership",
      description:
        "The IN-PACT program by INJEX engages students in solving real-world industry challenges, working alongside top minds and global solution providers, while gaining hands-on experience, industry exposure, and job-ready skills.",
    },
    {
      icon: <FaUserGraduate className="text-warning fs-1" />,
      title: "Placement linked",
      description:
        "All students who successfully complete the INJEX certification will have the opportunity to secure job placements through the INJEX HR Exchange platform.",
    },
    {
      icon: <FaBriefcase className="text-warning fs-1" />,
      title: "Career Head start",
      description:
        "INJEX Certified students gain a competitive edge in both starting positions & salary, as they are recognized as graduates with deemed Industry experience. Injex students gain direct access to Industry network through INJEX HR exchange",
    },
    {
      icon: <FaGlobe className="text-warning fs-1" />,
      title: "Diverse career opportunity",
      description:
        "Injex courses offer students a wider career option to choose from, increasing their chances of finding the career that truly fits their interests and aspirations.",
    },
    {
      icon: <FaLock className="text-warning fs-1" />,
      title: "Lifelong Access",
      description:
        "With a lifelong membership, students enjoy continuous access to their INJEX account, allowing them to stay updated with the latest learning materials and resources. This membership also provides entry to the HR Exchange, ensuring ongoing career support and professional growth. It’s a commitment to lifelong learning and development.",
    },
    {
      icon: <FaLightbulb className="text-warning fs-1" />,
      title: "Entrepreneurship",
      description:
        "INJEX courses are tailored to nurture entrepreneurial skills, providing students with essential knowledge and practical support. From business registration to branding and strategic planning, students receive hands-on guidance to turn their innovative ideas into reality. Empower your journey from concept to launch with INJEX.",
    },
    {
      icon: <FaPlane className="text-warning fs-1" />,
      title: "Overseas Studies",
      description:
        "INJEX leverages its global network to assist students in navigating the complexities of studying abroad. Our insights and affiliations with international universities provide invaluable support, making the overseas study experience smoother and more accessible. Unlock global opportunities and broaden your horizons with INJEX.",
    },
  ];
  const testimonials = [
    {
      name: "Martin",
      location: "Bangalore",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=12",
      content:
        "The learning materials were simply riveting—highly visual and illustrative, which made understanding even the most complex concepts surprisingly easy. A great resource for both beginners and professionals.",
    },
    {
      name: "Suryaprakash",
      location: "Chennai",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=5",
      content:
        "Injex has been a game changer for my career. The courses are thoughtfully designed with real-world examples that helped me transition smoothly into a new domain. Highly recommended for career growth.",
    },
    {
      name: "Janaki",
      location: "Trichy",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=47",
      content:
        "Injex's training methods are unlike anything I’ve experienced before. The pace, the clarity, and the practical approach helped me gain a decade’s worth of industrial insights in just a few weeks.",
    },
    {
      name: "Arun",
      location: "Coimbatore",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=32",
      content:
        "I absolutely loved the interactive learning modules! The instructors made even complex topics feel approachable, and I now feel more confident in my skills than ever before.",
    },
    {
      name: "Divya",
      location: "Madurai",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=58",
      content:
        "From day one, Injex made learning feel exciting and empowering. The real-time examples and easy-to-understand lessons made even advanced topics feel simple. Truly a transformative experience!",
    },
    {
      name: "Vikram",
      location: "Salem",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=56",
      content:
        "The content was very practical and easy to follow. From beginner to pro, I could track my progress and actually apply the lessons in real-world scenarios. Great structure and delivery!",
    },
  ];

  const groupTestimonials = (data: typeof testimonials, size: number) => {
    const grouped = [];
    for (let i = 0; i < data.length; i += size) {
      grouped.push(data.slice(i, i + size));
    }
    return grouped;
  };

  const groupedTestimonials = groupTestimonials(testimonials, 3);

  const newsItems = [
    {
      image: "https://injex.org/wp-content/uploads/2024/12/dem-300x212.jpeg",
      category: "News",
      title: "Investments and Expansions",
    },
    {
      image:
        "https://injex.org/wp-content/uploads/2025/01/pexels-rachel-claire-4993235-300x200.jpg",
      category: "News",
      title: "Skill Development",
    },
    {
      image:
        "https://injex.org/wp-content/uploads/2024/12/factory-workshop-interior-machines-glass-production-background_645730-396-300x200.avif",
      category: "News",
      title: "Financial Developments",
    },
  ];

  const blogs: BlogItem[] = [
    {
      title: "The Knowledge Bloodline",
      date: "January 3, 2025",
      time: "2:18 pm",
      image:
        "https://injex.org/wp-content/uploads/2024/12/learning-banner-300x198.png",
    },
    {
      title: "The Knowledge Bleed",
      date: "January 3, 2025",
      time: "12:44 pm",
      image:
        "https://injex.org/wp-content/uploads/2025/01/9513747e-f636-4a76-abc7-bdf7ead69aeb-1.jpeg",
    },
    {
      title: "Knowledge Aggregation",
      date: "January 3, 2025",
      time: "12:25 pm",
      image: "https://injex.org/wp-content/uploads/2024/12/WPS-Photos1.jpeg",
    },
    {
      title: "Knowledge Fusion",
      date: "January 3, 2025",
      time: "1:00 pm",
      image:
        "https://injex.org/wp-content/uploads/2025/01/9513747e-f636-4a76-abc7-bdf7ead69aeb-1-1-e1738218652475.jpeg",
    },
    {
      title: "Knowledge Chain",
      date: "January 3, 2025",
      time: "1:30 pm",
      image:
        "https://injex.org/wp-content/uploads/2024/12/become-an-author.png",
    },
    {
      title: "Global Knowledge Nexus",
      date: "January 3, 2025",
      time: "3:00 pm",
      image:
        "https://injex.org/wp-content/uploads/2024/12/7a8a5124-75b8-4b46-bebf-e70e8ad411b6.jpg",
    },
  ];

  // Utility to chunk array into groups of 3
  const chunkArray = (arr: BlogItem[], size: number): BlogItem[][] => {
    const chunked: BlogItem[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  const chunkedBlogs = chunkArray(blogs, 3);

  return (
    <div>
      <TopBar />
      <MainNav />

      {/* Hero Slider */}
      <Carousel activeIndex={index} onSelect={handleSelect} fade indicators>
        {slides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <div
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "475px",
                position: "relative",
              }}
            >
              <div
                className="container h-100 d-flex flex-column justify-content-center align-items-start"
                style={{ color: "white", paddingLeft: "10px" }}
              >
                <h1 className="fw-bold" style={{ maxWidth: "700px" }}>
                  {slide.heading}
                </h1>
                <p className="fs-5">{slide.subheading}</p>
                <button className="btn btn-warning fw-bold mt-3">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Stats Section */}
      <div
        style={{
          position: "relative",
          marginTop: "-50px",
          zIndex: 10,
          padding: "0 15px",
        }}
      >
        <div className="d-flex justify-content-center py-3">
          <div
            className="row justify-content-center bg-white w-100 align-items-center"
            style={{
              maxWidth: "1220px",
              borderRadius: "16px",
              minHeight: "120px",
              padding: "10px 0",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="col-6 col-md-3 d-flex flex-column align-items-center"
                style={{ gap: "2px" }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: "2px" }}
                >
                  <i
                    className={stat.icon}
                    style={{
                      color: stat.color,
                      fontSize: "36px",
                      marginRight: "8px",
                    }}
                  ></i>
                  <h3 className="mb-0 fw-bold" style={{ fontSize: "32px" }}>
                    <CountUp end={stat.value} duration={2} separator="," />+
                  </h3>
                </div>
                <p className="text-center mb-0" style={{ fontSize: "16px" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Injex Experience Section Inline */}
      <div className="container py-5 d-flex flex-column flex-lg-row align-items-center justify-content-between">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h6 className="text-muted">The Injex system</h6>
          <h2 className="fw-bold">
            Turns Experience Into Learnable Constructs
          </h2>
          <p className="text-secondary mt-3">
            to provide students with a fantastic opportunity to gain “Optimized”
            industrial experience in a much lesser time than it takes otherwise
            in a real world. The experiential constructs are taught through
            immersive, hands-on learning experiences tailored for various roles
            in the Textile, Apparel and Home furnishing Industries.
          </p>
          <div className="row mt-4">
            <div className="col-6 d-flex align-items-start gap-3">
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  width: "56px",
                  height: "46px",
                  backgroundColor: "#ffe9d6",
                }}
              >
                <FaDumbbell className="text-warning fs-5" />
              </div>
              <div>
                <h6 className="fw-bold">Industry supported</h6>
                <p className="small text-muted mb-0">
                  Wider support from all sections of the industry
                </p>
              </div>
            </div>
            <div className="col-6 d-flex align-items-start gap-3">
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  width: "52px",
                  height: "48px",
                  backgroundColor: "#dffaf2",
                }}
              >
                <FaDesktop className="text-success fs-5" />
              </div>
              <div>
                <h6 className="fw-bold">Industry direct</h6>
                <p className="small text-muted mb-0">
                  Continuous update and contributions
                </p>
              </div>
            </div>
          </div>
          <button className="btn btn-warning mt-4 fw-bold">
            Getting Started
          </button>
        </div>
        <div className="col-lg-6 position-relative">
          <img src={image} alt="Main student" className="img-fluid " />
        </div>
      </div>

      <div className="text-center">
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto", // center the video
            padding: "0 20px", // space on left and right
          }}
        >
          <video
            width="100%"
            controls
            preload="metadata"
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
              height: "auto",
            }}
          >
            <source
              src="https://videos.files.wordpress.com/pxzcyXJq/injexdr07_110924.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <CoursePage />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold">Events</h2>
            <p className="text-muted mb-0">
              Watch out for some of the exciting programmes by Injex
            </p>
          </div>
          <Button variant="dark">View All</Button>
        </div>

        {events.map((event, index) => (
          <div key={index} className="border-top pt-4 pb-3 mb-4">
            <div className="row align-items-center">
              <div className="col-md-3 text-md-start text-center mb-2 mb-md-0">
                <h5 className={`fw-bold ${index === 1 ? "fst-italic" : ""}`}>
                  {event.date}
                </h5>
              </div>
              <div className="col-md-6">
                <h5 className="fw-semibold mb-2">{event.title}</h5>
                <p className="mb-1">
                  <FaClock className="me-2 text-warning" /> {event.time}
                </p>
                <p>
                  <FaMapMarkerAlt className="me-2 text-warning" />{" "}
                  {event.location}
                </p>
              </div>
              <div className="col-md-3 text-md-end text-center">
                <Button variant="warning" className="fw-bold px-4">
                  More Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-0" style={{ borderTop: "2px solid #ddd" }} />

      <div className="text-center my-5 px-3 px-md-5">
        <h6 className="text-uppercase text-muted fw-bold">Why Choose Injex</h6>
        <h2 className="fw-bold mb-4">
          Gain Industrial Experience in hours, NOT Years
        </h2>

        <div className="d-flex flex-wrap justify-content-center gap-4 px-2 px-md-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card shadow-sm text-center p-4"
              style={{
                width: "340px", // Reduced fixed width per card
                borderRadius: "0.5rem",
                backgroundColor: "#fff",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <div className="fs-1 mb-2 text-warning">{feature.icon}</div>
              <h6 className="fw-bold mb-2">{feature.title}</h6>
              <p
                className="text-muted small mb-0"
                style={{ fontSize: "14px", lineHeight: "1.9" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-5" style={{ backgroundColor: "#fff7e6" }}>
        <div className="text-center mb-4">
          <h6 className="text-uppercase text-muted">Studies Feedback</h6>
          <h2 className="fw-bold">What Our Students Say About Us</h2>
        </div>

        <Carousel
          indicators={true}
          controls={true}
          interval={4000}
          slide={true}
          pause={false}
        >
          {groupedTestimonials.map((group, idx) => (
            <Carousel.Item key={idx}>
              <div className="d-flex justify-content-center gap-4 flex-wrap px-3">
                {group.map((t, index) => (
                  <Card
                    key={index}
                    style={{ width: "350px", height: "320px" }}
                    className="text-start shadow-sm"
                  >
                    <Card.Header className="d-flex justify-content-between align-items-center bg-white border-bottom-0">
                      <div className="d-flex align-items-center">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="rounded-circle me-2"
                          width={40}
                          height={40}
                        />
                        <div>
                          <strong>{t.name}</strong>
                          <div className="text-muted small">{t.location}</div>
                          <div className="text-warning small">
                            {"★".repeat(t.rating)}
                            {"☆".repeat(5 - t.rating)}
                          </div>
                        </div>
                      </div>
                      <i className="bi bi-quote fs-3 text-muted"></i>
                    </Card.Header>

                    {/* Line Separator */}
                    <hr
                      className="my-0"
                      style={{ borderTop: "1px solid #ddd" }}
                    />

                    <Card.Body>
                      <Card.Text
                        style={{
                          fontSize: "1.0 rem",
                          lineHeight: "1.6",
                          color: "#949494",
                          fontFamily: "poppins",
                        }}
                      >
                        {t.content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      <section
        className="position-relative text-white py-5"
        style={{ overflow: "hidden" }}
      >
        {/* Background Image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage:
              "url('https://injex.org/wp-content/uploads/2024/12/learning-banner-300x198.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        ></div>

        {/* Dark Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 2,
          }}
        ></div>

        {/* Foreground Content */}
        <Container style={{ position: "relative", zIndex: 3 }}>
          <h2 className="fw-bold text-white">News Bulletins !!!</h2>
          <div
            className="d-inline-block mt-2 px-3 py-1"
            style={{ backgroundColor: "#ffc107", fontWeight: 600 }}
          >
            Global Textile Industry and Education
          </div>

          <hr
            style={{
              width: "100px",
              height: "3px",
              backgroundColor: "#ccc",
              marginTop: "10px",
            }}
          />

          <Row className="mt-5">
            {newsItems.map((item, idx) => (
              <Col
                md={4}
                key={idx}
                className="d-flex flex-column align-items-center mb-4"
              >
                <div className="position-relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "330px",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Yellow "News" Button */}
                  <div
                    className="position-absolute top-100 start-50 translate-middle"
                    style={{ marginTop: "-5px" }}
                  >
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: "#ffc107",
                        border: "none",
                        color: "black",
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        width: "105px",
                        height: "35px",
                      }}
                    >
                      {item.category}
                    </Button>
                  </div>
                </div>

                {/* Title in black box */}
                <div
                  className="px-4 py-2 mt-3"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: "3px",
                    textAlign: "center",
                    width: "80%",
                  }}
                >
                  {item.title}
                </div>

                {/* More Details Button */}
                <Button
                  className="mt-3"
                  style={{
                    backgroundColor: "#fde28a",
                    border: "none",
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  More Details
                </Button>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <div className="container my-5">
        <h6 className="text-center text-muted">Blog</h6>
        <h2 className="text-center fw-bold mb-4">
          Insightful articles from global experts
        </h2>

        <Carousel
          controls
          indicators={false}
          interval={3000}
          pause={false}
          slide={true}
        >
          {chunkedBlogs.map((group, idx) => (
            <Carousel.Item key={idx}>
              <div className="row">
                {group.map((blog, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card shadow-sm mb-3">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{blog.title}</h5>
                        <p className="card-text">
                          <i className="bi bi-calendar3 text-warning"></i>{" "}
                          {blog.date} &nbsp;|&nbsp;{" "}
                          <i className="bi bi-clock text-warning"></i>{" "}
                          {blog.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <Container className="text-center my-5">
        <img
          src="https://injex.org/wp-content/uploads/2024/12/become-an-author.png" // Replace with actual path
          alt="Instructor Session"
          style={{
            width: "100%",
            maxWidth: "750px",
            height: "auto",
            borderRadius: "8px",
          }}
          className="mb-4"
        />

        <h3 className="fw-bold">
          Become an Author, Instructor, Mentor or a Trainer
        </h3>
        <p className="text-muted">
          Monetize your experiences by translating them into powerful
          experiential knowledge
        </p>

        <Button
          variant="warning"
          className="fw-bold text-black mt-2"
          style={{ border: "none", padding: "10px 20px" }}
        >
          Register or Join
        </Button>
      </Container>

      <Footer />
    </div>
  );
}

export default Home;
