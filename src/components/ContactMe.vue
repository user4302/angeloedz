<template>
  <div class="text-center">
    <v-btn @click="dialog = !dialog" v-if="!dialog" text color="#7AF6D0"
      >Contact Me<v-icon right>mdi-email</v-icon>
    </v-btn>

    <v-dialog v-if="dialog" v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text color="#7AF6D0"
          >Contact Me<v-icon right>mdi-email</v-icon>
        </v-btn>
      </template>

      <v-card>
        <form
          ref="form"
          name="contact-me"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          @submit.prevent="handleSubmit"
          lazy-validation
        >
          <input type="hidden" name="form-name" value="contact-me" />
          <TwoDialogButtons
            title="You can contact me using this form! 😄"
            @cancel="$emit('cancel')"
          >
            <v-text-field
              v-model="form.name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.organization"
              :rules="organizationRules"
              label="Organization"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.message"
              :rules="messageRules"
              label="Message"
              required
            ></v-text-field>
          </TwoDialogButtons>

          <!-- <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Submit
          </v-btn> -->

          <!-- <v-btn color="error" class="mr-4" @click="reset"> Clear </v-btn> -->

          <!-- <TwoDialogButtons title="Send a message" @cancel="$emit('cancel')" /> -->
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TwoDialogButtons from "@/components/TwoDialogButtons";
import axios from "axios";
export default {
  components: { TwoDialogButtons },
  data: () => ({
    dialog: false,
    valid: true,
    form: {
      name: "",
      organization: "",
      email: "",
      message: "",
    },
    nameRules: [(v) => !!v || "Name is required"],
    organizationRules: [(v) => !!v || "Organization is required"],
    messageRules: [(v) => !!v || "Message is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    resetForm() {
      this.$set(this.form, "name", "");
      this.$set(this.form, "organization", "");
      this.$set(this.form, "email", "");
      this.$set(this.form, "message", "");
    },
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit() {
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      axios.post(
        "/",
        this.encode({
          "form-name": "contact-me",
          ...this.form,
        }),
        axiosConfig
      );
      this.resetForm();
    },
  },
  watch: {
    dialog: function () {
      if (this.$refs.form) {
        this.resetValidation();
        this.reset();
      }
    },
  },
};
</script>