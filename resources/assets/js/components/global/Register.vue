<style lang="scss">
    @import '~@/abstracts/_variables.scss';

    div#register-modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .6);
        z-index: 99999;
        div.register-box {
            width: 100%;
            max-width: 530px;
            min-width: 320px;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ddd;
            -webkit-box-shadow: 0 1px 3px rgba(50, 50, 50, 0.08);
            box-shadow: 0 1px 3px rgba(50, 50, 50, 0.08);
            -webkit-border-radius: 4px;
            border-radius: 4px;
            font-size: 16px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            a.social-link {
                display: block;
                margin: auto;
                width: 230px;
                margin-top: 10px;
                margin-bottom: 10px;
            }
            div.register-label {
                color: black;
                font-family: "Lato", sans-serif;
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
                margin-top: 40px;
                margin-bottom: 20px;
            }
            p.learn-more-description {
                color: #666666;
                text-align: center;
            }
            a.learn-more-button {
                border: 2px solid $secondary-color;
                border-radius: 3px;
                text-transform: uppercase;
                font-family: "Lato", sans-serif;
                color: $secondary-color;
                width: 360px;
                font-size: 16px;
                text-align: center;
                padding: 10px;
                margin-top: 20px;
                display: block;
                margin: auto;
                &:hover {
                    color: white;
                    background-color: $secondary-color;
                }
            }
        }
    }

    /* Small only */
    @media screen and (max-width: 39.9375em) {
        div#register-modal {
            div.register-box {
                width: 95%;
                a.learn-more-button {
                    width: 300px;
                }
            }
        }
    }

    /* Medium only */
    @media screen and (min-width: 40em) and (max-width: 63.9375em) {
    }

    /* Large only */
    @media screen and (min-width: 64em) and (max-width: 74.9375em) {
    }
</style>

<template>
    <div id="register-modal" v-show="show" v-on:click="show = false">
        <div class="register-box" v-on:click.stop="">
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
                    <div class="large-8 medium-9 small-12 cell centered">
                        <div class="validation" v-show="!bgRegisterValidations.is_valid">{{ bgRegisterValidations.text }}
                        </div>
                    </div>
                </div>

                <div class="grid-x grid-padding-x">
                    <div class="large-8 medium-9 small-12 cell centered">
                        <label class="form-label">昵称</label>
                        <input type="text" class="form-input" v-model="name" />
                        <div class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}
                        </div>
                    </div>
                </div>

                <div class="grid-x grid-padding-x">
                    <div class="large-8 medium-9 small-12 cell centered">
                        <label class="form-label">邮箱</label>
                        <input type="text" class="form-input" v-model="email" />
                        <div class="validation" v-show="!validations.email.is_valid">{{ validations.email.text }}
                        </div>
                    </div>
                </div>

                <div class="grid-x grid-padding-x">
                    <div class="large-8 medium-9 small-12 cell centered">
                        <label class="form-label">密码</label>
                        <input type="password" class="form-input" v-model="password" />
                        <div class="validation" v-show="!validations.password.is_valid">{{ validations.password.text }}
                        </div>
                    </div>
                </div>

                <div class="grid-x grid-padding-x">
                    <div class="large-8 medium-9 small-12 cell centered">
                        <label class="form-label">确认密码</label>
                        <input type="password" class="form-input" v-model="password_confirmation" />
                        <div class="validation" v-show="!validations.password_confirmation.is_valid">{{ validations.password_confirmation.text }}
                        </div>
                    </div>
                </div>

                <div class="grid-x grid-padding-x">
                    <div class="large-8 medium-9 small-12 cell centered">
                        <a class="add-location-button" v-on:click="submitRegister()">注册</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {EventBus} from '../../event-bus.js';

    export default {
        data() {
            return {
                email: '',
                password: '',
                password_confirmation: '',
                name:'',
                validations: {
                    email: {
                        is_valid: true,
                        text: ''
                    },
                    password: {
                        is_valid: true,
                        text: ''
                    },
                    password_confirmation: {
                        is_valid:true,
                        text: ''
                    },
                    name: {
                        is_valid:true,
                        text: ''
                    }
                },
                show:''
            }
        },
        methods :{
            submitRegister() {
                if(this.validateRegister()) {
                    this.$store.dispatch('register',{
                        email:this.email,
                        password:this.password,
                        password_confirmation:this.password_confirmation,
                        name:this.name
                    })

                }
            },
            validateRegister() {
                let validRegisterForm = true;

                if(this.name.trim() == '' ){
                    validRegisterForm = false;
                    this.validations.name.is_valid = false;
                    this.validations.name.text = '昵称不能为空';
                }

                if(this.email.trim() == '' ){
                    validRegisterForm = false;
                    this.validations.email.is_valid = false;
                    this.validations.email.text = '请输入邮箱地址';
                }

                if(this.password.trim() == '') {
                    validRegisterForm = false;
                    this.validations.password.is_valid = false;
                    this.validations.password.text = '请输入密码';
                }

                if(this.password_confirmation.trim() == '') {
                    validRegisterForm = false;
                    this.validations.password_confirmation.is_valid = false;
                    this.validations.password_confirmation.text = '请输入确认密码';
                }

                if(this.password_confirmation.trim() != this.password.trim()) {
                    this.validations.password_confirmation.is_valid = false;
                    this.validations.password_confirmation.text = '确认密码与密码不一致';
                }

                return validRegisterForm;
            }
        },

        mounted() {
            EventBus.$on('prompt-register', function () {
                this.show = true;
            }.bind(this));

            EventBus.$on('hidden-register', function () {
                this.show = false;
            }.bind(this));
        },

        computed: {
            bgRegisterValidations() {
                return this.$store.getters.getBgRegisterValidations;
            }
        }
    }
</script>