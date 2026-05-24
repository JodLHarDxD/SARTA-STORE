import { Link } from "react-router-dom";
import "./AboutPage.css";

export function AboutPage() {
  return (
    <div className="about page page-enter">
      <section className="about-hero">
        <div className="container">
          <p className="eyebrow">About SARTA</p>
          <h1 className="display about-hero__title">
            Clothing for the in-between moments.
          </h1>
        </div>
        <img
          src="https://outfit.hellohello.is/preloader/image-05.jpg"
          alt="SARTA editorial"
          className="about-hero__img"
        />
      </section>

      <section className="container about-copy">
        <div className="about-copy__grid">
          <div>
            <h2 className="display">Why we exist</h2>
            <p>
              SARTA blends editorial fashion with everyday wearability. We took
              cues from campaign-first brands like Fourmula and tactile catalogs
              like Palmer — then built a shop that feels as fast and clear as H&M,
              with the restraint of a design studio store like OUTFIT®.
            </p>
          </div>
          <div>
            <h2 className="display">What you get</h2>
            <ul>
              <li>Full product catalog with filters and search</li>
              <li>Product detail pages with gallery and variants</li>
              <li>Bag drawer, cart page, and demo checkout</li>
              <li>Placeholder media you can swap for your own shoots</li>
            </ul>
          </div>
        </div>
        <Link to="/shop" className="btn btn--primary">
          Shop the collection
        </Link>
      </section>
    </div>
  );
}
