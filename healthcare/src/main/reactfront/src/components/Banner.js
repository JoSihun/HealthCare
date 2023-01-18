import React from "react";
import {Carousel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import bg_black from '../img/bg_black.jpg';

function Banner() {
    return(
        <div className="Banner">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={bg_black}
                        width="800"
                        height="400"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={bg_black}
                        width="800"
                        height="400"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={bg_black}
                        width="800"
                        height="400"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Banner;