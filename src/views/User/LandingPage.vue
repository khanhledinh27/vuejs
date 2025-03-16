<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
      <div class="d-flex flex-grow-1 justify-content-center align-items-center">
        <a class="navbar-brand mx-auto" href="#">
          <img src="/src/assets/logo_plt.png" alt="PLT Solutions Logo" class="logo">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#features">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#about">About Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section text-center">
      <div class="container">
        <h1 class="display-4">Welcome to PLT Solutions</h1>
        <p class="lead">We are a company dedicated to providing the best solutions for our clients. Our team of experts is here to help you achieve your goals.</p>
        <router-link class="btn btn-outline-primary btn-lg learn-more-btn" to="/" role="button">Learn more</router-link>
      </div>
    </section>

    <!-- About Us Section -->
    <section id="about" class="about-section py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h2>About Us</h2>
            <p class="lead"></p>
          </div>
        </div>
        <div class="row align-items-center my-4">
          <div class="col-md-6">
            <img src="/src/assets/about1.jpg" alt="About Image 1" class="img-fluid">
          </div>
          <div class="col-md-6">
            <p class="about-description">Our lectures are designed to provide in-depth knowledge on a variety of topics. We bring industry experts to share their insights and experiences, ensuring that our clients receive the most relevant and up-to-date information. Our lectures are interactive and engaging, allowing participants to ask questions and participate in discussions.</p>
          </div>
        </div>
        <div class="row align-items-center my-4">
          <div class="col-md-6 order-md-2">
            <img src="/src/assets/about2.jpg" alt="About Image 2" class="img-fluid">
          </div>
          <div class="col-md-6 order-md-1">
            <p class="about-description">We offer a wide range of courses that cater to different skill levels and interests. Our courses are designed to be practical and hands-on, providing participants with the skills they need to succeed in their careers. Whether you are looking to learn a new skill or advance your career, our courses are the perfect solution.</p>
          </div>
        </div>
        <div class="row align-items-center my-4">
          <div class="col-md-6">
            <img src="/src/assets/about3.jpg" alt="About Image 3" class="img-fluid">
          </div>
          <div class="col-md-6">
            <p class="about-description">In addition to our educational offerings, we also sell a variety of technology items. From the latest gadgets to essential tools, we have everything you need to stay ahead in the tech world. Our products are carefully selected to ensure quality and reliability, and our team is always available to provide support and assistance.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h2>Features</h2>
          </div>
          <div class="col-lg-4 col-md-6 d-flex mb-4">
            <div class="card flex-fill">
              <div class="card-body text-center">
                <div class="feature-number">1</div>
                <h5 class="card-title">Lectures</h5>
                <p class="card-text">Our lectures provide in-depth knowledge and insights from industry leaders, ensuring you stay informed and ahead of the curve.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex mb-4">
            <div class="card flex-fill">
              <div class="card-body text-center">
                <div class="feature-number">2</div>
                <h5 class="card-title">Courses</h5>
                <p class="card-text">Our courses are designed to be practical and hands-on, providing you with the skills you need to succeed in your career.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 d-flex mb-4">
            <div class="card flex-fill">
              <div class="card-body text-center">
                <div class="feature-number">3</div>
                <h5 class="card-title">Technology Products</h5>
                <p class="card-text">We offer a wide range of technology products, from the latest gadgets to essential tools, ensuring you have everything you need to stay ahead in the tech world.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h2>Contact Us</h2>
            <p class="lead">Have any questions? We'd love to hear from you. Reach out to us through any of the following methods:</p>
            <ul class="list-unstyled">
              <li>Email: pltsolutions3010@gmail.com</li>
              <li>Phone: 0974660075</li>
              <li>Address: Vĩnh Phú 41, Quốc Lộ 13, Thuận An, Bình Dương</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer bg-light py-3">
      <div class="container text-center">
        <span class="text-muted">© 2025 PLT Solutions. All rights reserved.</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
/* Navbar */
.navbar {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 1rem 2rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-brand .logo {
  height: 80px; /* Adjust the height as needed */
  width: 200px;
}

.navbar-nav .nav-item .nav-link {
  font-size: 1rem;
  color: #333;
  padding: 0.5rem 1rem;
  transition: color 0.3s;
}

.navbar-nav .nav-item .nav-link:hover {
  color: #007bff;
}

.navbar-toggler {
  border: none;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

/* Hero Section */
.hero-section {
  padding: 100px 0;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
}

.hero-section h1 {
  font-size: 3.5rem;
  font-weight: 700;
}

.hero-section p {
  font-size: 1.25rem;
  margin-bottom: 30px;
}

.hero-section .learn-more-btn {
  padding: 10px 20px;
  font-size: 1.25rem;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  transition: background-color 0.3s, color 0.3s;
}

.hero-section .learn-more-btn:hover {
  background-color: #0056b3;
  color: #fff;
}

/* Features Section */
.features-section {
  background-color: #e9ecef;
  padding: 60px 0;
}

.features-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.features-section .card {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.features-section .card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.features-section .card-body {
  padding: 2rem;
}

.features-section .card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1rem;
}

.features-section .card-text {
  font-size: 1rem;
  color: #6c757d;
}

.features-section .feature-number {
  font-size: 3rem;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

/* About Us Section */
.about-section {
  padding: 60px 0;
}

.about-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.about-section p {
  font-size: 1.25rem;
  color: #6c757d;
}

.about-section .img-fluid {
  max-width: 100%;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  border-radius: 15px;
}

.about-section .row {
  margin-bottom: 30px;
}

.about-section .lead {
  text-align: justify;
  margin: 0 15px;
}

.about-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  padding: 10px 15px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Contact Section */
.contact-section {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.contact-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.contact-section p {
  font-size: 1.25rem;
  color: #6c757d;
}

.contact-section ul {
  list-style: none;
  padding: 0;
}

.contact-section ul li {
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 10px;
}

.contact-section ul li i {
  margin-right: 10px;
  color: #007bff;
}

/* Footer */
.footer {
  background-color: #f8f9fa;
  padding: 20px 0;
  border-top: 1px solid #e9ecef;
}

.footer .text-muted {
  font-size: 0.875rem;
}
</style>

