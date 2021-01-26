<template>
    <div>
        <!--        Dark Navbar-->
        <transition name="fade" mode="out-in">
            <b-navbar transparent fixed-top
                      class="site-navbar" v-if="navBarToShow === 'dark'">
                <template slot="brand">
                    <b-navbar-item tag="router-link" :to="{ path: '/' }">
                        <img
                                src="https://storage.googleapis.com/stateless-35-203-149-155/2020/11/396886ac-abhiman-logo.png"
                                alt="Lightweight UI components for Vue.js based on Bulma"
                        >
                    </b-navbar-item>
                </template>
                <template slot="start">
                </template>

                <template slot="end">
                    <b-navbar-item href="/photography">
                        Photography
                    </b-navbar-item>
                    <b-navbar-item href="/#">
                        Videography
                    </b-navbar-item>
                    <b-navbar-item tag="router-link" :to="{ path: '/#about' }">
                        About Me
                    </b-navbar-item>
                    <b-navbar-item tag="router-link" :to="{ path: '/#contact' }">
                        Contact Me
                    </b-navbar-item>
                </template>
            </b-navbar>
        </transition>
        <transition name="fade" mode="out-in">
            <!--        Light Navbar-->
            <b-navbar transparent fixed-top
                      class="site-navbar light-navbar" v-if="navBarToShow === 'light'">
                <template slot="brand">
                    <b-navbar-item tag="router-link" :to="{ path: '/' }">
                        <img
                                src="https://storage.googleapis.com/stateless-35-203-149-155/2020/11/396886ac-abhiman-logo.png"
                                alt="Lightweight UI components for Vue.js based on Bulma"
                        >
                    </b-navbar-item>
                </template>
                <template slot="start">
                </template>

                <template slot="end">
                    <b-navbar-item href="/photography">
                        Photography
                    </b-navbar-item>
                    <b-navbar-item href="/videography">
                        Videography
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        About Me
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Contact Me
                    </b-navbar-item>
                </template>
            </b-navbar>
        </transition>
    </div>
</template>
<script>
  export default {
    name: 'NavBar',
    data () {
      return {
        activeSection: 0,
        navBarToShow: 'dark',
      }
    },
    // props:['currentSectionId'],
    // methods: {
    //   calculateSectionOffsets () {
    //     let sections = document.getElementsByTagName('section')
    //     let length = sections.length
    //
    //     for (let i = 0; i < length; i++) {
    //       let sectionOffset = sections[i].offsetTop
    //       this.offsets.push(sectionOffset)
    //     }
    //   },
    //   handleMouseWheel: function (e) {
    //
    //     if (e.wheelDelta < 30 && !this.inMove) {
    //       this.moveUp()
    //     } else if (e.wheelDelta > 30 && !this.inMove) {
    //       this.moveDown()
    //     }
    //
    //     e.preventDefault()
    //     return false
    //   },
    //   handleMouseWheelDOM: function (e) {
    //
    //     if (e.detail > 0 && !this.inMove) {
    //       this.moveUp()
    //     } else if (e.detail < 0 && !this.inMove) {
    //       this.moveDown()
    //     }
    //
    //     return false
    //   },
    //   moveDown () {
    //     this.inMove = true
    //     this.activeSection--
    //
    //     if (this.activeSection < 0) this.activeSection = (document.querySelectorAll('.fullpage').length * 2) - 1
    //
    //     this.scrollToSection(this.activeSection, true)
    //   },
    //   moveUp () {
    //     this.inMove = true
    //     this.activeSection++
    //
    //     if (this.activeSection > (document.querySelectorAll('.fullpage').length * 2) - 1) this.activeSection = 0
    //
    //     this.scrollToSection(this.activeSection, true)
    //   },
    //   scrollToSection (id, force = false) {
    //
    //     console.log(id)
    //
    //     if (id > 1 && id < 4) {
    //       this.navBarToShow = 'light'
    //     } else {
    //       this.navBarToShow = 'dark'
    //     }
    //
    //     setTimeout(() => {
    //       this.inMove = false
    //     }, 400)
    //
    //   },
    //   touchStart (e) {
    //     e.preventDefault()
    //
    //     this.touchStartY = e.touches[0].clientY
    //   },
    //   touchMove (e) {
    //     if (this.inMove) return false
    //     e.preventDefault()
    //
    //     const currentY = e.touches[0].clientY
    //
    //     if (this.touchStartY < currentY) {
    //       this.moveDown()
    //     } else {
    //       this.moveUp()
    //     }
    //
    //     this.touchStartY = 0
    //     return false
    //   },
    // },
    // created () {
    //   this.calculateSectionOffsets()
    //
    //   window.addEventListener('DOMMouseScroll', this.handleMouseWheelDOM)  // Mozilla Firefox
    //   window.addEventListener('mousewheel', this.handleMouseWheel, { passive: false }) // Other browsers
    //
    //   window.addEventListener('touchstart', this.touchStart, { passive: false }) // mobile devices
    //   window.addEventListener('touchmove', this.touchMove, { passive: false }) // mobile devices
    // },
    // destroyed () {
    //   window.removeEventListener('mousewheel', this.handleMouseWheel, { passive: false })  // Other browsers
    //   window.removeEventListener('DOMMouseScroll', this.handleMouseWheelDOM) // Mozilla Firefox
    //
    //   window.removeEventListener('touchstart', this.touchStart) // mobile devices
    //   window.removeEventListener('touchmove', this.touchMove) // mobile devices
    // },
  }
</script>
<style lang="scss">
    @import "src/assets/scss/responsive";

    .site-navbar {
        background: transparent;

        .navbar-brand {
            a {
                /*background-color: #272727;*/
                /*box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);*/

                img {
                    max-height: 50px;

                    @include breakpoint(md) {
                        max-height: 4.75rem;
                    }
                }
            }
        }

        .navbar-menu {
            padding: 2%;

            .navbar-end {
                background-color: #272727;
                box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);

                a {
                    color: white;
                }
            }
        }
    }

    .light-navbar {
        .navbar-menu {
            .navbar-end {
                background-color: #ffffff;

                a {
                    color: #272727;
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
</style>