<template>
    <Layout>
        <section class="fullpage" id="featured">
            <FeaturedImages/>
        </section>
        <section class="fullpage" id="about">
            <AboutMe v-on:aboutModalState="sectionScroll($event)"/>
        </section>
        <section class="fullpage" id="contact">
            <Contact/>
        </section>
    </Layout>
</template>

<script>
  import FeaturedImages from '../components/home/FeaturedImages'
  import AboutMe from '../components/home/AboutMe'
  import Contact from '../components/home/Contact'

  export default {
    metaInfo: {
      title: 'Welcome',
    },
    data () {
      return {
        inMove: false,
        activeSection: 0,
        offsets: [],
        touchStartY: 0,
        sectionScrollState: true
      }
    },
    components: {
      FeaturedImages,
      AboutMe,
      Contact,
    },
    methods: {
      sectionScroll(theEvent){
        this.sectionScrollState = !theEvent
      },
      calculateSectionOffsets () {
        let sections = document.getElementsByTagName('section')
        let length = sections.length

        for (let i = 0; i < length; i++) {
          let sectionOffset = sections[i].offsetTop
          this.offsets.push(sectionOffset)
        }
      },
      handleMouseWheel: function (e) {
        if (this.sectionScrollState){
          if (e.wheelDelta < 30 && !this.inMove) {
            this.moveUp()
          } else if (e.wheelDelta > 30 && !this.inMove) {
            this.moveDown()
          }

          e.preventDefault()
        }
        return false
      },
      handleMouseWheelDOM: function (e) {

        if (e.detail > 0 && !this.inMove) {
          this.moveUp()
        } else if (e.detail < 0 && !this.inMove) {
          this.moveDown()
        }

        return false
      },
      moveDown () {
        this.inMove = true
        this.activeSection--

        if (this.activeSection < 0) this.activeSection = (document.querySelectorAll('.fullpage').length * 2) - 1

        this.scrollToSection(this.activeSection, true)
      },
      moveUp () {
        this.inMove = true
        this.activeSection++

        if (this.activeSection > (document.querySelectorAll('.fullpage').length * 2) - 1) this.activeSection = 0

        this.scrollToSection(this.activeSection, true)
      },
      scrollToSection (id, force = false) {
        if (this.inMove && !force) return false

        this.activeSection = id
        this.inMove = true

        document.getElementsByTagName('section')[id].scrollIntoView({ behavior: 'smooth' })

        setTimeout(() => {
          this.inMove = false
        }, 400)

      },
      touchStart (e) {
        e.preventDefault()

        this.touchStartY = e.touches[0].clientY
      },
      touchMove (e) {
        if (this.inMove) return false
        e.preventDefault()

        const currentY = e.touches[0].clientY

        if (this.touchStartY < currentY) {
          this.moveDown()
        } else {
          this.moveUp()
        }

        this.touchStartY = 0
        return false
      },
    },
    created () {
      this.calculateSectionOffsets()

      window.addEventListener('DOMMouseScroll', this.handleMouseWheelDOM)  // Mozilla Firefox
      window.addEventListener('mousewheel', this.handleMouseWheel, { passive: false }) // Other browsers

      window.addEventListener('touchstart', this.touchStart, { passive: false }) // mobile devices
      window.addEventListener('touchmove', this.touchMove, { passive: false }) // mobile devices
    },
    destroyed () {
      window.removeEventListener('mousewheel', this.handleMouseWheel, { passive: false })  // Other browsers
      window.removeEventListener('DOMMouseScroll', this.handleMouseWheelDOM) // Mozilla Firefox

      window.removeEventListener('touchstart', this.touchStart) // mobile devices
      window.removeEventListener('touchmove', this.touchMove) // mobile devices
    },
  }
</script>

<style lang="scss">
    .fullpage {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

</style>
