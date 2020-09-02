<template>
<div>
    <v-alert
      dense
      type="error" class="alert-danger d-none" id="danger"
    >
      <v-row align="center">
        <v-col class="grow">{{errorMessage}}</v-col>
        <v-col class="shrink">
          <v-btn @click="close('danger')"> Close</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <v-alert
      dense
      type="success" class="alert-danger d-none" id="success"
    >
      <v-row align="center">
        <v-col class="grow">{{successMessage}}</v-col>
        <v-col class="shrink">
          <v-btn @click="close('success')"> Close</v-btn>
        </v-col>
      </v-row>
    </v-alert>

 <v-overlay value=true class="overlay-background"></v-overlay>
 <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
            <div>
                <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
                    <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                    <v-card color="basil" flat>
                        <v-card-text>Wishlist</v-card-text>
                    </v-card>
                    <v-tab v-for="i in tabs" :key="i">
                        <v-icon large>{{ i.icon }}</v-icon>
                        <div class="caption py-1">{{ i.name }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn id="registerButton" x-large block :disabled="!valid" color="success" @click="signin"> Login </v-btn>
                                            <v-progress-circular id="registerLoader" class="d-none" :size="50" color="primary" indeterminate ></v-progress-circular>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                                <v-progress-circular id="registerLoader" class="d-none" :size="50" color="primary" indeterminate ></v-progress-circular>
                                            <v-btn x-large id="registerButton" block :disabled="!valid" color="success" @click="validate">Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>
</div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: 'Login',
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  created: async function(){
    await Auth.signOut()
  },
  methods: {
      signin(){    
        
        document.getElementById('registerButton').classList.add('d-none');
        document.getElementById('registerLoader').classList.remove('d-none');  
              Auth.signIn(this.loginEmail,this.loginPassword).then(()=>{
                document.getElementById('registerButton').classList.remove('d-none');
                document.getElementById('registerLoader').classList.add('d-none');
                let path = this.$route.query['redirect'];
                if(path === undefined){
                  path = "/"
                }
                this.$router.push({
                    path: path
                });
              }).catch(err=>{
                this.errorMessage = err.message;
                console.error(err);
                document.getElementById('danger').classList.remove('d-none');
                document.getElementById('registerButton').classList.remove('d-none');
                document.getElementById('registerLoader').classList.add('d-none');
              })
              
          
      },
      close(id){
          document.getElementById(id).classList.add('d-none');
      },
    validate() {
        document.getElementById('registerButton').classList.add('d-none');
        document.getElementById('registerLoader').classList.remove('d-none');
       Auth.signUp({
            username:this.email,
            password:this.password,
            attributes:{
                email:this.email,
                name: this.firstName+' '+this.lastName,
            }
        }).then(data=>{
            console.log(JSON.stringify(data));
            document.getElementById('success').classList.remove('d-none');
            // Auth.confirmSignUp(this.email).then(()=>{
                
            // })
            this.successMessage = "Welcome. You are successfully regstered with us."
            document.getElementById('registerButton').classList.remove('d-none');
            document.getElementById('registerLoader').classList.add('d-none');
        }).catch(err=>{
            this.errorMessage = err.message;
            console.error(err);
            document.getElementById('danger').classList.remove('d-none');
            document.getElementById('registerButton').classList.remove('d-none');
            document.getElementById('registerLoader').classList.add('d-none');
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-outline"}
    ],
    valid: true,
    
    firstName: "",
    lastName: "",
    successMessage:"",
    email: "",
    errorMessage:"",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    }
  }),
}
</script>

<style >
.overlay-background{
     background: url("./../assets/eventImage.png");
    background-repeat: no-repeat;
    background-size: 100% auto;

}
.alert-danger{
    position: absolute !important;
    z-index: 999;
    right: 50vw;
    bottom: 0 !important;
    right: 0;
}

.d-none{
    display: none;
}
</style>
