<template>
    <section class="hero is-fullheight page-section">
        <div class="columns images-container">
            <div class="is-two-thirds column images-column"
                 :style="{backgroundImage: 'url(' + $static.wordpressPage.acf.aboutSection.aboutMeImage  +')'}"></div>
            <div class="column pseudo--description-column is-hidden-mobile"></div>
            <div class="mobile-info-box is-hidden-tablet">
                <div class="content-container">
                    <h1 class="slide-title">{{$static.wordpressPage.acf.aboutSection.aboutMeTitle}}</h1>
                    <div class="slide-description"
                         v-html="$static.wordpressPage.acf.aboutSection.aboutMeDescription"></div>
                    <div class="read-more" @click="isAboutModalActive = true">
                        <p>Read More</p>
                    </div>
                    <b-taglist class="major-things-i-do-tags">
                        <b-tag :style="{backgroundColor: thing.color}" type="is-dark" size="is-large"
                               v-for="thing in majorThingsIDo" :key="thing.name">{{thing.name}}
                        </b-tag>
                    </b-taglist>
                </div>
            </div>
        </div>
        <div class="hero-head">
        </div>
        <div class="hero-body is-hidden-mobile">
            <div class="columns descriptions-container">
                <div class="is-two-thirds column pseudo--images-column"></div>
                <div class="column description-column">
                    <h1 class="slide-title">{{$static.wordpressPage.acf.aboutSection.aboutMeTitle}}</h1>
                    <div class="slide-description" v-html="$static.wordpressPage.acf.aboutSection.aboutMeDescription">
                    </div>
                    <div class="read-more" @click="isAboutModalActive = true">
                        <p>Read More</p>
                    </div>
                    <b-taglist class="major-things-i-do-tags">
                        <b-tag :style="{backgroundColor: thing.color}" type="is-dark" size="is-large"
                               v-for="thing in majorThingsIDo" :key="thing.name">{{thing.name}}
                        </b-tag>
                    </b-taglist>
                </div>
            </div>
        </div>
        <b-modal v-model="isAboutModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">

                    <div class="content">
                        <div class="slide-description"
                             v-html="$static.wordpressPage.acf.aboutSection.aboutMeDescription"></div>
                    </div>
                </div>
            </div>
        </b-modal>
    </section>
</template>
<static-query>
    query {
    wordpressPage(id: "19") {
    acf {
    aboutSection {
    aboutMeImage
    aboutMeTitle
    aboutMeDescription
    featuredCategories {
    name
    color
    }
    }
    }
    }
    }
</static-query>
<script>
  export default {
    name: 'AboutMe',
    mounted () {
      let lottieScript = document.createElement('script')
      lottieScript.setAttribute('src', 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js')
      document.body.appendChild(lottieScript)
    },
    data () {
      return {
        currentSlide: 0,
        majorThingsIDo: [],
        isAboutModalActive: false,
      }
    },
    created () {
      this.majorThingsIDo = this.$static.wordpressPage.acf.aboutSection.featuredCategories
    },
    watch: {
      isAboutModalActive () {
        this.$emit('aboutModalState', this.isAboutModalActive)
      },
    },
  }
</script>
<style lang="scss" scoped>
    @import "src/assets/scss/responsive";

    .page-section {
        width: 100%;
        height: 100%;

        .hero-head {
            height: 56px;
        }

        .images-container {
            position: absolute;
            width: 100%;
            margin: 0;
            left: 0;
            height: 100%;
            z-index: -1;

            .images-column {
                background-size: cover;
                background-position: center;
                height: 100%;
            }

            .pseudo--description-column {
                background-color: #272727;
            }

            .mobile-info-opener {
                position: absolute;
                top: 60px;
                right: 5px;
            }

            .mobile-info-box {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                background: #00000047;
                backdrop-filter: blur(5px);
                justify-content: center;
                align-items: center;

                .content-container {
                    background: #000000ad;
                    backdrop-filter: blur(5px);
                    width: 90%;
                    height: fit-content;
                    padding: 5%;
                    border-radius: 5px;
                    color: white;

                    .close-mobile-info-box {
                        width: fit-content;
                        margin-left: auto;
                    }

                    .slide-title {
                        font-size: 2em;
                        font-weight: 700;
                        line-height: 1.2em;
                    }

                    .slide-description {
                        margin-top: 5%;
                        max-height: 40vh;
                        overflow: hidden;
                    }

                    .read-more {
                        background: #dd5858c2;
                        padding: 2%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: -15px;
                        position: relative;
                        cursor: pointer;
                    }

                    .major-things-i-do-tags {
                        margin-top: 5%;
                    }
                }
            }
        }

        .hero-body {
            padding: 0;

            .descriptions-container {
                width: 100%;
                margin: 0;

                .description-column {
                    padding: 0 5%;
                    color: white;

                    .slide-title {
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

                    .slide-description {
                        margin-top: 5%;
                        max-height: 40vh;
                        overflow: hidden;
                    }

                    .read-more {
                        background: #dd5858c2;
                        padding: 2%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: -15px;
                        position: relative;
                        cursor: pointer;
                    }

                    .major-things-i-do-tags {
                        margin-top: 5%;
                    }
                }
            }
        }
    }
</style>