<template>
    <section class="hero is-fullheight page-section">
        <div class="columns images-container">
            <transition name="fade" mode="out-in">
                <div v-for="slide in featuredSlidesData" :key="slide.image"
                     v-if="featuredSlidesData[currentSlide].image === slide.image"
                     class="is-two-thirds column images-column"
                     :style="{backgroundImage: 'url(' +  slide.image +')'}">
                </div>
            </transition>
            <div class="column pseudo--description-column is-hidden-mobile"></div>
            <div class="mobile-info-opener is-hidden-tablet"
                 v-on:click="showMobileDescription = true">
                <lottie-player src="https://assets6.lottiefiles.com/temp/lf20_iYudTq.json" mode="bounce"
                               background="transparent" speed="0.5" style="width: 50px; height: 50px;" loop
                               autoplay></lottie-player>
            </div>
            <div class="mobile-info-box"
                 v-if="showMobileDescription">
                <div class="content-container">
                    <div class="close-mobile-info-box"
                         v-on:click="showMobileDescription = false">
                        <b-icon
                                icon="close-circle"
                                type="is-dark"></b-icon>
                    </div>
                    <h1 class="slide-title">{{featuredSlidesData[currentSlide].title}}</h1>
                    <p class="slide-description">{{featuredSlidesData[currentSlide].description | striphtml}}</p>
                    <b-button type="is-dark" outlined class="slide-button">View Gallery</b-button>
                </div>
            </div>
        </div>
        <div class="hero-head">
        </div>
        <div class="hero-body is-hidden-mobile">
            <div class="columns descriptions-container">
                <div class="is-two-thirds column pseudo--images-column"></div>
                <div class="column description-column">
                    <h1 class="slide-title">{{featuredSlidesData[currentSlide].title}}</h1>
                    <div v-for="edge in $static.posts.edges" :key="edge.node.id">
                    </div>
                    <p class="slide-description">{{featuredSlidesData[currentSlide].description}}</p>
                    <a :href="featuredSlidesData[currentSlide].url">
                        <b-button type="is-dark" outlined class="slide-button">View Gallery</b-button>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
<static-query>
    query {
    posts: allWordpressPost(filter: {categories: {id: {in: "7"}}}){
    edges{
    node{
    title
    slug
    acf{
    featuredImage
    description
    }
    }
    }
    }
    }
</static-query>
<script>
  export default {
    name: 'FeaturedImages',
    mounted () {
      let lottieScript = document.createElement('script')
      lottieScript.setAttribute('src', 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js')
      document.body.appendChild(lottieScript)
      this.slideFeaturedCarousel()
    },
    data () {
      return {
        currentSlide: 0,
        showMobileDescription: false,
        featuredSlidesData: [],
      }
    },
    created () {
      let mainContext = this
      this.$static.posts.edges.forEach(function (item, index) {
        mainContext.featuredSlidesData.push({
          image: item.node.acf.featuredImage,
          title: item.node.title,
          description: item.node.acf.description,
          url: item.node.slug,
        })
      })
    },
    methods: {
      slideFeaturedCarousel: function () {
        let numberOfFeaturedItems = this.featuredSlidesData.length
        let mainDom = this
        setInterval(() => {
          mainDom.currentSlide++
          if (mainDom.currentSlide >= numberOfFeaturedItems) {
            mainDom.currentSlide = 0
          }
        }, 5000)
      },
    },
  }
</script>
<style lang="scss" scoped>
    @import "src/assets/scss/responsive";

    .page-section {
        width: 100%;
        height: 100%;
        z-index: 1;

        .hero-head {
            height: 56px;
        }

        .images-container {
            position: absolute;
            width: 100%;
            margin: 0;
            left: 0;
            height: 100%;
            z-index: 1;

            @include breakpoint(sm) {
                z-index: -1;
            }

            .images-column {
                background-size: cover;
                background-position: center;
                height: 100%;
            }

            .pseudo--description-column {
                background-color: white;
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
                    background: #ffffffad;
                    backdrop-filter: blur(5px);
                    width: 90%;
                    height: fit-content;
                    padding: 5%;
                    border-radius: 5px;

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
                    }

                    .slide-button {
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
                    }

                    .slide-button {
                        margin-top: 5%;
                    }
                }
            }
        }

        .fade-enter-active,
        .fade-leave-active {
            transition: opacity .5s
        }

        .fade-enter,
        .fade-leave-to
            /* .fade-leave-active in <2.1.8 */

        {
            opacity: 0
        }
    }
</style>