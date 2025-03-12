import React from "react";
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1>404 - Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className={css.link}>
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
