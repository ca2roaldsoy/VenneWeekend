import React from "react";
import FacebookIcon from "../../images/face_v1.png";
import { Col, Row, Image, Container } from "react-bootstrap";
import FooterMenu from "./FooterMenu";

function Footer() {
  return (
    <Row as="footer" role="contentinfo" className="footer">
      <Col sm={12} md={3} lg={3} as="section" className="footer__title">
        <h1 className="footer__title--text">Holidaze</h1>
      </Col>
      <Col sm={12} md={3} lg={3} as="section" className="footer__contact">
        <FooterMenu />
      </Col>
      <Col sm={12} md={3} lg={3} as="section" className="footer__social">
        <a
          href="https://www.facebook.com/groups/449296311930329"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image src={FacebookIcon} alt="facebook" fluid role="link" />
        </a>
      </Col>
      <Col sm={12} md={3} lg={3} as="section" className="footer__copy">
        <p>2023 VenneWeekend</p>
        <p>Lunden Lunden leir- og fritidssenter</p>
      </Col>
    </Row>
  );
}

export default Footer;
