<template>
  <div class="oswald-font">
    <div class="hero">
      <div class="angelo">
        ANGELO
        <div class="edz-vertical">
          <div>E</div>
          <div>D</div>
          <div>Z</div>
        </div>
      </div>

      <div class="find-out-more">
        <v-btn
          large
          class="text-uppercase"
          color="#7AF6D0"
          text
          @click="scrollDown"
          ><div class="find-out-more-btn oswald-font">
            Get to Know me <v-icon>mdi-chevron-down</v-icon>
          </div>
        </v-btn>
      </div>

    </div>

    <!-- <div class="edz-horizontal">EKSITH DE ZOYSA</div> -->

    <div class="bio">
      <h1>Bio</h1>
      <v-container>
        <v-row class="bio-table content-container">
          <v-col class="bio-table-col-1" col="2" lg="2" md="2" sm="6" cols="6">
            <v-card class="pa-2 dark_1" flat tile style="color: #7af6d0"
              >Full Name</v-card
            >
            <v-card class="pa-2 dark_1" flat tile style="color: #7af6d0"
              >Date of Birth</v-card
            >
            <v-card class="pa-2 dark_1" flat tile style="color: #7af6d0"
              >Nationality</v-card
            >
            <v-card class="pa-2 dark_1" flat tile style="color: #7af6d0"
              >Spoken Languages</v-card
            >
          </v-col>

          <v-col class="bio-table-col-2" col="3" lg="3" md="3" sm="6" cols="6">
            <v-card class="pa-2 dark_1" flat tile style="color: #7af6d0"
              >Angelo Eksith De Zoysa</v-card
            >
            <v-card class="pa-2 dark_1" flat tile style="color: #7af6d0"
              >20 JAN 1997</v-card
            >
            <v-card class="pa-2 dark_1" flat tile style="color: #7af6d0"
              >Sri Lankan</v-card
            >
            <v-card class="pa-2 dark_1" flat tile style="color: #7af6d0"
              >English, Sinhala</v-card
            >
          </v-col>

          <v-col col="7" lg="7" md="7" sm="12" cols="12">
            <v-card
              class="pa-2 dark_1"
              flat
              tile
              left
              style="color: #7af6d0; text-align: left"
              ><div v-html="bioContent">{{ bioContent }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <p></p>
    </div>

    <div class="cover content-container">
      <h1>Cover Letter</h1>
      <v-container class="cover-content" v-html="coverLetterContent">
        {{ coverLetterContent }}
      </v-container>
    </div>

    <div class="resume">
      <h1>Resumé</h1>
      <v-container class="resume-container">
        <iframe
          loading="lazy"
          class="resume-embed"
          src="https://www.canva.com/design/DAEuIgYVMao/view?embed"
        >
        </iframe>
      </v-container>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap");
.oswald-font {
  font-family: "Oswald", sans-serif;
}
.hero {
  min-height: 94vh;
  height: 94vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column
}
.angelo {
  font-size: 15vw;
  margin-top: -11%;
  /* padding-top: calc(27vh - 4%); */
  /* margin-bottom: 20vw; */
}
.edz-horizontal {
  font-size: 915%;
  align-items: center;
}
.edz-vertical {
  font-size: 21%;
  display: inline-block;
  margin-left: -3%;
}

.title {
  font-size: 300%;
}
.find-out-more {
  font-size: 150%;
  /* padding-bottom: calc(37vh - 4%); */
}
.find-out-more-btn {
  display: flex;
  flex-direction: column;
}

.bio {
  /* margin-top: 15%; */
}
.bio-table-col-1 {
  /* width: 20%; */
  /* margin-left: 18%; */
  text-align: right;
}
.bio-table-col-2 {
  /* width: 20%; */
  /* margin-left: 18%; */
  text-align: left;
}
.bio-table {
  /* margin-left: 3%;
  margin-right: 6%; */
}

.cover {
  margin-top: 10%;
}
.cover-content {
  /* margin-left: 18%; */
  /* margin-right: 18%; */
  text-align: left;
  margin-top: 1%;
}

.resume {
  margin-top: 10%;
}
.resume-container {
  position: relative;

  margin-top: 2%;
  width: 50%;
  display: flex;
  height: 57%;
  padding-top: 70%;
  padding-bottom: 4%;
  overflow: hidden;
  border-radius: 1%;
  /* margin-left: 25%; */
  /* margin-top: 1%; */
}
.resume-embed {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
  padding: 0;
  margin: 0;
}

.content-container {
  /* margin-left: 10%;
  margin-right: 10%; */
}

@media (max-width: 1920px) {
  .oswald-font {
    font-family: "Oswald", sans-serif;
    font-size: 140%;
  }
  .angelo {
    /* font-size: 1200%; */
    /* margin-top: 13%; */
    /* margin-bottom: -9%; */
  }
  .content-container {
    /* margin-left: 7%;
  margin-right: 7%; */
    /* width: 70%; */
  }
  .bio-table {
    margin-left: 11%;
    margin-right: 13%;
  }
  .bio {
    /* margin-top: 18%; */
  }
  .cover-content {
    width: 67%;
  }
  .resume-container {
    padding-top: 69%;
  }
}

@media (max-width: 1280px) {
  .oswald-font {
    font-family: "Oswald", sans-serif;
    font-size: 100%;
  }
  .edz-vertical {
    font-size: 21%;
    display: inline-block;
    margin-left: -2%;
  }
  .angelo {
    /* font-size: 1000%; */
    /* margin-top: 11%; */
    /* margin-bottom: -9%; */
  }
  .content-container {
    /* margin-left: 7%;
  margin-right: 7%; */
  }
  .bio-table {
    margin-left: 12%;
    margin-right: 12%;
  }
  .bio {
    /* margin-top: 18%; */
  }
  .resume-container {
    padding-top: 70%;
  }
  .resume-embed {
    /* height: 101%; */
  }
}

@media (max-width: 650px) {
}

@media (max-width: 959px) {
  .angelo {
    /* font-size: 940%; */

    /* margin-top: 9%; */
  }
  .content-container {
    /* margin-left: 7%;
  margin-right: 7%; */
  }
  .cover-content {
    width: 77%;
    /* margin-left: 18%; 
  margin-right: 18%; */
    text-align: left;
    margin-top: 1%;
  }
  .bio {
    /* margin-top: 13%; */
  }
}

@media (max-width: 599px) {
  .angelo {
    /* font-size: 640%; */
    /* margin-top: 68%; */
  }

  .bio-table-col-1 {
    /* padding: 0; */
    /* margin-left: -46%; */
  }
  .bio-table-col-2 {
    /* padding: 0; */
    /* margin-left: -6%; */
  }
  .resume-container {
    width: 90%;

    height: 90%;
    /* margin-left: 25%; */
    /* margin-top: 1%; */
  }
  .resume-embed {
    width: 81%;
    height: 153%;
  }
  .bio-table {
    margin-left: 9%;
    margin-right: 9%;
  }
  .bio {
    /* margin-top: 76%; */
  }
  .resume {
    margin-bottom: 40%;
  }

  .resume-container {
    overflow: inherit !important;
    margin-left: 13%;
  }
}

@media (max-width: 375px) {
  .angelo {
    /* font-size: 500%; */
  }
  .bio {
    /* margin-top: 87%; */
  }
}
</style>


<script>
export default {
  data: () => ({
    bioContent: `
      <p>
        Born and raised in Sri Lanka, I schooled at St. Josephs College,
        after which I switched to Asian International School where I
        completed my secondary and pre university qualifications.
      </p>
      <p>
        I actively participated in multiple sports such as basketball,
        football, karate and track &#38; field events. I would choose
        javelin throwing, followed by football and basketball, if I had
        to rank them in order of my favorite.
      </p>
      <p>
        While I was small, I had a keen interest in exploring, inventing
        and creating, which lead me to develop an interest in mutiple
        fields, including software development.
      </p>`,
    coverLetterContent: `
      <p>
        My name is Angelo, I have recently completed my degree and am awaiting
        graduation and I would like to help your company hit and exceed your
        development goals as a software engineer. As someone who is attentive to
        detail and goal driven, I thrive on completing my tasks and delivering
        results beyond expectations. With a bachelor's degree in software
        engineering and hands on experience in the industry, I am confident that
        I will be an asset to your company.
      </p>
      <p>
        I have worked with iTelaSoft for just over 1 year and one of my roles
        was a fullstack web developer for multiple projects. I was tasked mainly
        with creating the frontend according to the clients accepted design and
        was required to make immediate changes upon the client's request which
        enabled us to create and test our implementations against the client's
        requirements as soon as possible and reach our goal of completion
        faster.
      </p>
      <p>
        In addition to fullstack web development, I was also tasked with IoT
        development primarily in hardware development, and secondarily in
        programming the hardware, I was additionally tasked with writing the
        technical documentation for the IoT devices as well as the website
        associated with the said devices. Managing all the tasks and
        requirements in a timeline was also assigned to me for some projects, to
        make sure that all the requirements were completed and were viewable to
        the entire team as well as the client.
      </p>
      <p>
        I am proficient in a range of skills such as web development, native
        mobile application development, penetration testing, technical writing,
        and image editing, and I wish to apply for a full-time software
        engineering position and will be able to take on specialized tasks in
        the future as I gauge my performance with time.
      </p>
      <p>
        Thank you for your time and consideration. I am looking forward to
        learning more about the Software Engineering position at your company. I
        am excited about the opportunity to leverage my unique range of skills,
        and I am eager to demonstrate my commitment to developing world-class
        software solutions for your company.
      </p>`,
  }),
  mounted() {},

  methods: {
    scrollDown: function () {
      // var container = this.$el.querySelector(".bio");
      // container.scrollTop = container.scrollHeight;
      // console.log(container);

      var container = this.$el.querySelector(".bio");

      if (container) {
        // Use el.scrollIntoView() to instantly scroll to the element
        container.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>