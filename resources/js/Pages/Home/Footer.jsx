import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../../css/foot.css';
function Footer() {
    return (
        <>
            <div className="footer position-absolute bottom-0 w-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-4 col-xs-12">
                            <div className="single_footer">
                                <h4>Services</h4>
                                <ul>
                                    <li><a href="#">Lorem Ipsum</a></li>
                                    <li><a href="#">Simply dummy text</a></li>
                                    <li><a href="#">The printing and typesetting </a></li>
                                    <li><a href="#">Standard dummy text</a></li>
                                    <li><a href="#">Type specimen book</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                            <div className="single_footer single_footer_address">
                                <h4>Page Link</h4>
                                <ul>
                                    <li><a href="#">Lorem Ipsum</a></li>
                                    <li><a href="#">Simply dummy text</a></li>
                                    <li><a href="#">The printing and typesetting </a></li>
                                    <li><a href="#">Standard dummy text</a></li>
                                    <li><a href="#">Type specimen book</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                            <div className="single_footer single_footer_address">
                                <h4>Subscribe today</h4>
                                <div className="signup_form">
                                    <form action="#" className="subscribe">
                                        <input type="text" className="subscribe__input" placeholder="Enter Email Address" />
                                        <button type="button" className="subscribe__btn"><i className="fas fa-paper-plane"></i></button>
                                    </form>
                                </div>
                            </div>
                            <div className="social_profile">
                                <ul>
                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                            <p className="copyright">Copyright © 2019 <a href="#">Akdesign</a>.</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Footer