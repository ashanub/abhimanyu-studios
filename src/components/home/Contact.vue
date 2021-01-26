<template>
    <section class="hero is-fullheight page-section">
        <div class="columns main-columns">
            <div class="column is-two-thirds form-column">
                <div class="contact-form-wrap">
                    <div class="columns is-flex is-flex-wrap-wrap">
                        <div class="column is-half">
                            <b-field>
                                <b-input placeholder="Your Name"
                                         size="is-medium"
                                         icon="account">
                                </b-input>
                            </b-field>
                        </div>
                        <div class="column is-half">
                            <b-field>
                                <b-input placeholder="Your Email"
                                         size="is-medium"
                                         icon="email">
                                </b-input>
                            </b-field>
                        </div>
                        <div class="column is-full">
                            <b-field>
                                <b-input type="textarea"
                                         minlength="10"
                                         maxlength="100"
                                         size="is-medium"
                                         placeholder="Message">
                                </b-input>
                            </b-field>
                        </div>
                        <div class="column is-full">
                            <b-button type="is-dark" inverted outlined size="is-medium">Send Message</b-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-one-third socials-column">
                <h1 class="section-title">Let's Get in Touch!</h1>
                <div class="columns is-flex is-flex-wrap-wrap social-icons">
                    <div class="column is-half">
                        <a href="#">
                            <b-image
                                    src="https://storage.googleapis.com/stateless-35-203-149-155/2020/11/2f7643cc-facebook.png"
                                    ratio="1by1"></b-image>
                        </a>
                    </div>
                    <div class="column is-half">
                        <a href="#">
                            <b-image
                                    src="https://storage.googleapis.com/stateless-35-203-149-155/2020/11/877aa530-instagram.png"
                                    ratio="1by1"></b-image>
                        </a>
                    </div>
                    <div class="column is-half">
                        <a href="#">
                            <b-image
                                    src="https://storage.googleapis.com/stateless-35-203-149-155/2020/11/ba4a6ae6-youtube.png"
                                    ratio="1by1"></b-image>
                        </a>
                    </div>
                    <div class="column is-half">
                        <a href="#">
                            <b-image
                                    src="https://storage.googleapis.com/stateless-35-203-149-155/2020/11/b48f86ec-email.png"
                                    ratio="1by1"></b-image>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
  export default {
    name: 'Contact',
  }
</script>
<style lang="scss" scoped>
    @import "src/assets/scss/responsive";

    .page-section {
        width: 100%;
        height: 100%;

        .main-columns {
            height: 100vh;
            margin: 0;

            .form-column {
                background-color: #272727;

                .contact-form-wrap {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 5%;
                }
            }

            .socials-column {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 56px 5% 5%;

                .section-title {
                    font-size: 2em;
                    font-weight: 700;
                    line-height: 1.2em;

                    @include breakpoint(md) {
                        font-size: 40px;
                        line-height: 50px;
                    }

                    @include breakpoint(lg) {
                        font-size: 50px;
                        line-height: 60px;
                    }
                }

                .social-icons {
                    width: 100%;
                    margin-top: 5%;
                }
            }
        }
    }
</style>