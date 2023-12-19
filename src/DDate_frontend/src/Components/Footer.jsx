import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faYoutube,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer
      className="text-white py-4"
      style={{
        background:
          "radial-gradient(84.33% 84.32% at 51.71% 43.22%, #E28110 0%, #26011C 100%)",
      }}
    >
      <div className="container mx-auto flex justify-between items-center mt-10">
        <div className="flex justify-around w-full">
          <div className="mr-8">
            <h4 className="text-lg font-bold mb-2">Legal</h4>
            <ul className="list-none p-0 m-0">
              <li className="mb-2  hover:text-black">
                <a href="#">Privacy</a>
              </li>
              <li className="mb-2  hover:text-black">
                <a href="#">Terms</a>
              </li>
              <li className="mb-2  hover:text-black">
                <a href="#">Cookie Policy</a>
              </li>
              <li className="mb-2  hover:text-black">
                <a href="#">Intellectual Property</a>
              </li>
            </ul>
          </div>
          <div className="mr-8">
            <h4 className="text-lg font-bold mb-2">Careers</h4>
            <ul className="list-none p-0 m-0">
              <li className="mb-2  hover:text-black">
                <a href="#">Careers Portal</a>
              </li>
              <li className="mb-2  hover:text-black">
                <a href="#">Tech Blog</a>
              </li>
            </ul>
          </div>
          <div className="mr-8">
            <h4 className="text-lg font-bold mb-2">Social</h4>
            <ul className="list-none p-0 m-0 flex items-center">
              <li className="mr-4  hover:text-red-700">
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li className="mr-4 hover:text-black">
                <a href="#">
                  <FontAwesomeIcon icon={faTiktok} />
                </a>
              </li>
              <li className="mr-4 hover:text-red-800">
                <a href="#">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
              <li className="mr-4 hover:text-sky-700">
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="mr-4 hover:text-sky-500">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
            </ul>
          </div>
          <div>
          <div className="mr-8">
            <h4 className="text-lg font-bold mb-2">FAQ</h4>
            <ul className="list-none p-0 m-0">
              <li className="mb-2  hover:text-black">
                <a href="#">Destinations</a>
              </li>
              <li className="mb-2  hover:text-black">
                <a href="#">Press Room</a>
              </li>
              <li className="mb-2  hover:text-black">
                <a href="#">Contact</a>
              </li>
              <li className="mb-2  hover:text-black">
                <a href="#">Promo Code</a>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
