import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SchoolSearch from "./components/SchoolSearch";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Modules from "./components/Modules";
import Profiles from "./components/Profiles";
import Impact from "./components/Impact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <SchoolSearch />
      <HowItWorks />
      <Features />
      <Modules />
      <Profiles />
      <Impact />
      <Footer />
    </main>
  );
}