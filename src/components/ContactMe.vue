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
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="organization"
            :rules="organizationRules"
            label="Organization"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Submit
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Clear </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    valid: true,
    name: "",
    organization: "",
    nameRules: [(v) => !!v || "Name is required"],
    organizationRules: [(v) => !!v || "Name is required"],
    email: "",
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