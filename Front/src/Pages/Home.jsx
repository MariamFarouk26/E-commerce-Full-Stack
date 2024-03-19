import React, { lazy, Suspense } from "react";
import ImgBanner3 from "../Components/Home/imgBanner3";
import Recent from "../Components/Home/recent";

const Navbar = lazy(() => import("../Components/Home/Navbar"));
const Landing = lazy(() => import("../Components/Home/Landing"));
const Featured = lazy(() => import("../Components/Home/Featured"));
const NewArrival = lazy(() => import("../Components/Home/NewArrival"));
const Footer = lazy(() => import("../Components/Home/footer"));
const Newsletter = lazy(() => import("../Components/Home/newLetters"));
const ImgBanner2 = lazy(() => import("../Components/Home/imgBanner2"));
const ImgBanner = lazy(() => import("../Components/Home/imgBanner"));
const Statistics = lazy(() => import("../Components/Home/statistics"));

const SuspenseFallback = () => (
  <div
    className="spinner-border container-fluid d-flex justify-content-center"
    role="status"
  >
    <span className="visually-hidden">Loading...</span>
  </div>
);

const Home = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Navbar />
      <section>
        <Landing />
      </section>
      <main>
        <section>
          <Featured />
        </section>
        <section>
          <ImgBanner3 />
        </section>
        <section>
          <NewArrival />
        </section>
        <section>
          <Statistics />
        </section>
        <section>
          <ImgBanner />
          <ImgBanner2 />
        </section>
        <section>
          <Recent />
        </section>
        <section>
          <Newsletter />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </Suspense>
  );
};

export default Home;
