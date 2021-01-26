<template>
    <Layout>
        <section class="hero is-fullheight page-section" style="background: #272727">
            <div class="columns main-columns">
                <div class="column is-two-thirds-desktop images-grid">
                    <div class="columns is-flex-wrap-wrap">
                        <div class="column is-one-third-desktop image-tile"
                             v-for="album in imageAlbums" :key="album.id"
                             v-show="checkIfBelongsToTag(album.tags) || showAll">
                            <a :href="album.slug">
                                <div class="hover-box-wrap">
                                    <div class="hover-box-content">
                                        <p>{{album.id}}</p>
                                        <h3>{{album.title}}</h3>
                                    </div>
                                </div>
                                <b-image
                                        :src="album.thumbnailImage"
                                        ratio="16by9"
                                        :lazy="true"
                                ></b-image>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="column is-one-third-desktop information-column is-hidden-mobile">
                    <div class="breaker"></div>
                    <h1 class="section-title has-text-light">Photography Portfolio</h1>
                    <div class="categories-wrap mt-5">
                        <p class="gallery-categories subtitle is-4" v-on:click="switchCategory('all', 'All')"
                           :class="{'is-active': showAll, 'has-text-light': !showAll}">All</p>
                        <p class="gallery-categories subtitle is-4"
                           v-for="edge in $page.tags.edges" :key="edge.node.id"
                           v-on:click="switchCategory(edge.node.id, edge.node.title)"
                           :class="{'is-active': selectedCategory === edge.node.id, 'has-text-light': selectedCategory !== edge.node.id}">
                            {{edge.node.title}}</p>
                    </div>
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
                                {{selectedCategoryTitle}}
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                        :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </a>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <b-button type="is-dark" :outlined="outlined" expanded size="is-medium" class="mt-3"
                                          v-for="edge in $page.tags.edges" :key="edge.node.id"
                                          v-on:click="switchCategory(edge.node.id, edge.node.title)">
                                    {{edge.node.title}}
                                </b-button>
                            </div>
                        </div>
                    </b-collapse>
                </div>
            </div>
        </section>
    </Layout>
</template>
<page-query>
    query {
    posts: allWordpressPost(filter: {categories: {id: {in: "2"}}}){
    edges{
    node{
    title
    slug
    tags{
    title
    id
    }
    acf{
    featuredImage
    }
    }
    }
    }
    tags: allWordpressPostTag{
    edges{
    node{
    title
    id
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
        outlined: true,
        showAll: true,
        imageAlbums: [],
        selectedCategory: '',
        selectedCategoryTitle: 'All',
      }
    },
    methods: {
      switchCategory: function (selectedCategory, title) {
        if (selectedCategory === 'all') {
          this.showAll = true
          this.selectedCategory = ''
        } else {
          this.showAll = false
          this.selectedCategory = selectedCategory
        }
        this.selectedCategoryTitle = title
      },
      checkIfBelongsToTag (tags) {
        const mainContext = this
        let inCategory = false
        tags.forEach(function (item) {

          if (item.id === mainContext.selectedCategory) {
            inCategory = true
          }
        })
        return inCategory
      },
      formatUrl (url, maxHeight) {
        return url.replace('f_auto', 'h_' + maxHeight + ',f_auto')
      },
    },
    created () {
      const mainContext = this
      let indexCounter = 0
      this.$page.posts.edges.forEach(function (item) {
        console.log(item)
        mainContext.imageAlbums.push({
          Id: item.node.id,
          thumbnailImage: mainContext.formatUrl(item.node.acf.featuredImage, 300),
          tags: item.node.tags,
          title: item.node.title,
          slug: item.node.slug,
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

                        .hover-box-wrap {
                            padding: 12px;
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 100%;
                            width: 100%;
                            z-index: 1;
                            visibility: hidden;
                            opacity: 0;
                            transition: visibility 0s, opacity 0.5s linear;

                            .hover-box-content {
                                background: #ffffffcc;
                                height: 100%;
                                width: 100%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                padding: 5%;

                                h3 {
                                    font-size: 2em;
                                    font-weight: 700;
                                    text-align: center;
                                }
                            }
                        }

                        figure {
                            height: 100%;

                            img {
                                height: 100%;
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

                .categories-wrap {
                    width: 100%;

                    .gallery-categories {
                        border-top-right-radius: 20px;
                        border-bottom-right-radius: 20px;
                        padding: 2%;
                        cursor: pointer;
                    }

                    .is-active {
                        background-color: white;
                    }
                }
            }

            .mobile-categories-selector {
                position: fixed;
                bottom: 0;
                width: 100%;
            }
        }
    }
</style>