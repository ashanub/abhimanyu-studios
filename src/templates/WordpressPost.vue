<template>
    <Layout>
        <section class="hero is-fullheight page-section" style="background: #272727">
            <div class="columns main-columns">
                <div class="column is-two-thirds-desktop images-grid">
                    <div class="columns is-flex-wrap-wrap">
                        <div class="column is-one-third-desktop image-tile"
                             v-for="image in imageGallery" :key="image.id"
                             @click="isImageModalActive = true, setImageModal(image.indexNumber)">
                            <b-image
                                    :src="image.thumbnailImage"
                                    :lazy="true"
                                    responsive
                            ></b-image>
                        </div>
                    </div>
                </div>
                <div class="column is-one-third-desktop information-column is-hidden-mobile">
                    <div class="breaker"></div>
                    <h1 class="section-title has-text-light">{{$page.wordpressPost.title}}</h1>
                    <p class="has-text-light gallery-description">{{$page.wordpressPost.acf.description}}</p>
                </div>
                <div class="is-hidden-desktop mobile-categories-selector">
                    <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" position="is-bottom"
                                :open="false">
                        <div
                                slot="trigger"
                                slot-scope="props"
                                class="card-header"
                                role="button"
                                aria-controls="contentIdForA11y3">
                            <p class="card-header-title">
                                {{$page.wordpressPost.title}}
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                        :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </a>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <!--                                <b-button type="is-dark" :outlined="outlined" expanded size="is-medium" class="mt-3"-->
                                <!--                                          v-for="edge in $page.tags.edges" :key="edge.node.id"-->
                                <!--                                          v-on:click="switchCategory(edge.node.id, edge.node.title)">-->
                                <!--                                    {{edge.node.title}}-->
                                <!--                                </b-button>-->
                            </div>
                        </div>
                    </b-collapse>
                </div>
            </div>
            <!--            Image Modal-->
            <b-modal v-model="isImageModalActive" class="image-modal">
                <p class="image">
                    <img :src="imageGallery[currentSlideIndex].modalImage" class="modal-image">
                </p>
                <div class="navigation-buttons">
                    <div class="back" @click="goBack()">
                        <b-icon
                                icon="arrow-left"
                                size="is-medium"
                                type="is-light">
                        </b-icon>
                    </div>
                    <div class="fullscreen">
                        <a :href="imageGallery[currentSlideIndex].fullImage" target="_blank">
                            <b-icon
                                    icon="fullscreen"
                                    size="is-medium"
                                    type="is-light">
                            </b-icon>
                        </a>
                    </div>
                    <div class="next" @click="goForward()">
                        <b-icon
                                icon="arrow-right"
                                size="is-medium"
                                type="is-light">
                        </b-icon>
                    </div>
                </div>
            </b-modal>
        </section>
    </Layout>
</template>
<page-query>
    query Post ($path: String!) {
    wordpressPost (path: $path) {
    title
    tags{
    title
    id
    }
    acf{
    description
    imageGallery{
    id
    sourceUrl
    }
    }
    }
    }
</page-query>

<script>
  export default {
    metaInfo: {
      title: 'Photography Portfolio',
    },
    data: () => {
      return {
        isImageModalActive: false,
        counter: 0,
        currentSlideIndex: 0,
        imageGallery: [],
      }
    },
    methods: {
      setImageModal (currentIndex) {
        this.currentSlideIndex = currentIndex
      },
      formatUrl (url, maxHeight) {
        return url.replace('f_auto', 'h_' + maxHeight + ',f_auto')
      },
      goForward () {
        if (this.currentSlideIndex === this.imageGallery.length - 1) {
          this.currentSlideIndex = 0
        } else {
          this.currentSlideIndex++
        }
      },
      goBack () {
        if (this.currentSlideIndex === 0) {
          this.currentSlideIndex = this.imageGallery.length - 1
        } else {
          this.currentSlideIndex--
        }
      },
    },
    created () {
      const mainContext = this
      let indexCounter = 0
      this.$page.wordpressPost.acf.imageGallery.forEach(function (item) {
        mainContext.imageGallery.push({
          indexNumber: indexCounter,
          imageId: item.id,
          fullImage: item.sourceUrl,
          thumbnailImage: mainContext.formatUrl(item.sourceUrl, 300),
          modalImage: mainContext.formatUrl(item.sourceUrl, 600),
        })
        indexCounter++
      })
    },
  }
</script>
<style lang="scss">
    @import "src/assets/scss/responsive";

    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
    }

    .page-section {
        width: 100%;
        height: 100%;

        .main-columns {
            margin: 0;
            background-color: #272727;

            @include breakpoint(md) {
                height: 100vh;
            }

            .images-grid {
                overflow-y: auto;
                overflow-x: hidden;
                padding-top: 100px;

                .columns {
                    .image-tile {
                        height: 300px;
                        position: relative;
                        cursor: pointer;

                        figure {
                            height: 100%;

                            img {
                                height: 100%;
                                object-position: top;
                            }
                        }

                        &:hover {
                            .hover-box-wrap {
                                visibility: visible;
                                opacity: 1;
                            }
                        }
                    }
                }
            }

            .information-column {
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 5%;
                background-color: #272727;
                margin-top: 95px;
                overflow-y: auto;

                .breaker {
                    height: 60px;
                }

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

                .gallery-description {
                    margin-top: 30px;
                    font-size: 1.2em;
                }
            }

            .mobile-categories-selector {
                position: fixed;
                bottom: 0;
                width: 100%;
            }
        }

        .image-modal {
            .modal-image {
                max-height: 100vh;
                width: auto;
                margin: 0 auto;
            }

            .navigation-buttons {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 20px;

                span {
                    margin: 0 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>