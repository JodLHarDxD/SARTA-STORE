import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="site-footer__brand">SARTA</p>
          <p className="site-footer__copy">
            Contemporary clothing for everyday ritual. London · Est. 2026
          </p>
        </div>
        <div>
          <p className="eyebrow">Shop</p>
          <ul>
            <li>
              <Link to="/shop">All products</Link>
            </li>
            <li>
              <Link to="/shop?category=new">New in</Link>
            </li>
            <li>
              <Link to="/shop?category=women">Women</Link>
            </li>
            <li>
              <Link to="/shop?category=men">Men</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Help</p>
          <ul>
            <li>
              <a href="#shipping">Shipping & returns</a>
            </li>
            <li>
              <a href="#size">Size guide</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Social</p>
          <ul>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© 2026 SARTA Ltd. All rights reserved.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  );
}
