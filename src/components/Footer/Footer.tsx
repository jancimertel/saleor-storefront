import * as React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ReactSVG from "react-svg";

import { SOCIAL_MEDIA } from "../../core/config";

import logoImg from "images/logo.svg";

import "./scss/index.scss";

const Footer: React.FC = () => (
  <Container>
    <footer className="pt-4 my-md-5 pt-md-5 border-top" id="footer">
      <Row>
        <Col md={4}>
          <ReactSVG path={logoImg} className="logo" />
          {SOCIAL_MEDIA.map(medium => (
            <Button
              key={medium.ariaLabel}
              href={medium.href}
              variant="link"
              size="lg"
            >
              <medium.icon />
            </Button>
          ))}
        </Col>
        <Col md={8} />
      </Row>
    </footer>
  </Container>
);

export default Footer;
